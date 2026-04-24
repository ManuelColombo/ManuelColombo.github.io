// .eleventy.js
const path = require('path');
const fs = require('fs');
const dateFilter = require('nunjucks-date-filter');
const lightningCSS = require("@11tyrocks/eleventy-plugin-lightningcss");
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(lightningCSS);

  // Blockquote attribution: > -- Author → <cite>— Author</cite>
  // Usage: separate paragraph inside blockquote starting with -- or —
  eleventyConfig.addTransform("blockquoteAttribution", function(content) {
    if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) return content;
    return content.replace(
      /<blockquote>([\s\S]*?)<\/blockquote>/g,
      (_, inner) => {
        const transformed = inner.replace(
          /<p>(?:--|–|—)\s*(.+?)<\/p>/g,
          '<cite>$1</cite>'
        );
        return `<blockquote>${transformed}</blockquote>`;
      }
    );
  });

  // Custom markdown syntax: ::testo:: → <b>testo</b>  (kicker/occhiello label)
  // Uses <b> (bring-attention-to) since **bold** in markdown renders as <strong>, not <b>
  eleventyConfig.addTransform("occhiello", function(content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return content.replace(/::([^:]+)::/g, '<b>$1</b>');
    }
    return content;
  });

  // Image sizing: ![cover|alt](url) → <figure data-layout="cover"><img alt="alt"></figure>
  // Sizes: cover, wide, half  (standalone images, on their own line)
  // inline: ![inline|alt](url) within text → adds data-layout directly on <img>
  eleventyConfig.addTransform("imgSize", function(content) {
    if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) return content;
    // Step 1: wrap size-tagged <img> in <figure> regardless of context
    content = content.replace(
      /<img src="([^"]*)" alt="(masthead|cover|wide|half)(?:\|([^"]*))?"([^>]*?)>/g,
      (_, src, size, alt, rest) =>
        `<figure data-layout="${size}"><img src="${src}" alt="${alt || ''}" data-layout="${size}"${rest}></figure>`
    );
    // Step 2: remove <p> wrappers that now contain only figures (and whitespace)
    content = content.replace(
      /<p>(\s*<figure\b[\s\S]*?<\/figure>\s*)+<\/p>/g,
      match => match.replace(/^<p>|<\/p>$/g, '')
    );
    // Step 3: inline images → add data-layout directly on <img>
    content = content.replace(
      /<img src="([^"]*)" alt="(inline|inline-right)(?:\|([^"]*))?"([^>]*?)>/g,
      (_, src, size, alt, rest) =>
        `<img src="${src}" alt="${alt || ''}" data-layout="${size}"${rest}>`
    );
    return content;
  });
  // Image optimization: converts local <img> to <picture> with WebP + srcset.
  // Widths and sizes are tuned per data-layout. Results cached on disk in .cache/.
  // Art direction for mobile: use object-position via CSS var --focal on the figure.
  //   <figure data-layout="masthead" style="--focal: 40% 60%">
  eleventyConfig.addTransform("imgOptimize", async function(content) {
    if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) return content;

    const imgRegex = /<img([^>]*)src="(\/assets\/[^"]*?)"([^>]*?)>/g;
    const matches = [...content.matchAll(imgRegex)];
    if (!matches.length) return content;

    // Per-layout config
    const layoutConfig = {
      masthead:       { widths: [600, 1200, 1440, 1920], sizes: "100vw" },
      cover:          { widths: [600, 1200, 1440, 1920], sizes: "100vw" },
      wide:           { widths: [400, 800, 1100, 1440],  sizes: "(max-width: 720px) 100vw, calc(100% + 6rem)" },
      half:           { widths: [200, 400, 500, 960],    sizes: "(max-width: 480px) 100vw, 50vw" },
      inline:         { widths: [150, 300, 600],          sizes: "(max-width: 480px) 30vw, 200px" },
      "inline-right": { widths: [150, 300, 600],          sizes: "(max-width: 480px) 30vw, 200px" },
    };
    const defaultConfig = { widths: [400, 800, 960, 1440], sizes: "(max-width: 960px) 100vw, 960px" };

    const replacements = await Promise.all(matches.map(async ([fullMatch, before, src, after]) => {
      const localPath = "." + src;
      if (!fs.existsSync(localPath)) return [fullMatch, fullMatch];

      const allAttrs = before + after;
      const layoutMatch = allAttrs.match(/data-layout="([^"]*)"/);
      const layout = layoutMatch ? layoutMatch[1] : "";
      const { widths, sizes } = layoutConfig[layout] || defaultConfig;

      try {
        const metadata = await Image(localPath, {
          widths,
          formats: ["webp", "jpeg"],
          outputDir: "./_site/assets/img/",
          urlPath: "/assets/img/",
          cacheOptions: { duration: "1d", directory: ".cache" },
          filenameFormat: (id, src, width, format) =>
            `${path.basename(src, path.extname(src))}-${width}w.${format}`
        });

        const alt = (allAttrs.match(/alt="([^"]*)"/) || [])[1] || "";
        const dataLayout = layout ? ` data-layout="${layout}"` : "";
        const loading = layout === "masthead" ? "" : ' loading="lazy"';
        const fallback = metadata.jpeg.find(e => e.width >= 800) ?? metadata.jpeg.at(-1);
        const webpSrcset = metadata.webp.map(e => `${e.url} ${e.width}w`).join(", ");
        const jpegSrcset = metadata.jpeg.map(e => `${e.url} ${e.width}w`).join(", ");

        const picture = [
          `<picture>`,
          `<source type="image/webp" srcset="${webpSrcset}" sizes="${sizes}">`,
          `<source type="image/jpeg" srcset="${jpegSrcset}" sizes="${sizes}">`,
          `<img src="${fallback.url}" alt="${alt}"${dataLayout}${loading} decoding="async">`,
          `</picture>`
        ].join("");

        return [fullMatch, picture];
      } catch(e) {
        console.warn(`[imgOptimize] skipped ${src}: ${e.message}`);
        return [fullMatch, fullMatch];
      }
    }));

    for (const [original, replacement] of replacements) {
      content = content.replace(original, replacement);
    }
    return content;
  });

  // Gallery grouping: consecutive images in a <p> → <div class="gallery">
  // Runs after imgOptimize so it sees <picture> elements.
  // Alt text syntax:
  //   ![N|caption](url)       → numeric weight (fr unit), e.g. 2|, 1|
  //   ![layout|caption](url)  → named layout on first image: pair, feature, triptych, mosaic, full
  //   ![caption](url)         → default weight 1
  // Named layouts: full=1col, pair=50/50, feature=60/40, triptych=3equal, mosaic=big-left+2-right
  eleventyConfig.addTransform("galleryGroup", function(content) {
    if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) return content;

    const namedLayouts = ["full", "pair", "feature", "triptych", "mosaic"];

    return content.replace(/<p>([\s\S]*?)<\/p>/g, (match, inner) => {
      // Paragraph must contain ONLY pictures and/or imgs (no text nodes)
      const textOnly = inner
        .replace(/<picture>[\s\S]*?<\/picture>/g, "")
        .replace(/<img\b[^>]*>/g, "")
        .trim();
      if (textOnly.length > 0) return match;

      // Collect items preserving order
      const items = [];
      const itemRe = /(<picture>[\s\S]*?<\/picture>|<img\b[^>]*>)/g;
      let m;
      while ((m = itemRe.exec(inner)) !== null) items.push(m[1]);
      if (items.length < 2) return match; // single image: leave as-is

      // Layout hint from first alt value
      const firstAlt = (inner.match(/alt="([^"]*)"/) || [])[1] || "";
      const pipeIdx  = firstAlt.indexOf("|");
      const prefix   = pipeIdx >= 0 ? firstAlt.slice(0, pipeIdx) : "";

      let layout   = "";
      let gridCols = "";

      if (namedLayouts.includes(prefix)) {
        layout = prefix;
      } else {
        // Numeric weights or plain alts → derive fr columns per item
        const weights = items.map(item => {
          const alt = (item.match(/alt="([^"]*)"/) || [])[1] || "";
          const p   = alt.indexOf("|");
          const w   = p >= 0 ? parseInt(alt.slice(0, p)) : NaN;
          return isNaN(w) ? 1 : w;
        });
        gridCols = weights.map(w => `${w}fr`).join(" ");
      }

      // Strip layout/weight prefix from all alt texts  (anything before first |)
      const processed = inner.replace(/alt="([^|"]*)\|([^"]*)"/g, 'alt="$2"');

      const dataLayout = layout   ? ` data-layout="${layout}"`          : "";
      const style      = gridCols ? ` style="--gallery-cols:${gridCols}"` : "";

      return `<div class="gallery"${dataLayout}${style}>${processed.trim()}</div>`;
    });
  });

  const isDev = !!process.env.DEV;
  const isStaging = process.env.PATH_PREFIX === "/preview";

  // Draft file filtering based on filename prefix:
  //   _filename.md  → visible only in local dev
  //   __filename.md → visible in local dev and staging, hidden in production
  // Also rejects markdown files without a layout (no orphan pages published).
  eleventyConfig.addPreprocessor("draft-and-layout-filter", "md", (data) => {
    const basename = path.basename(data.page.inputPath);
    if (basename.startsWith('__')) {
      if (!isDev && !isStaging) return false;
    } else if (basename.startsWith('_')) {
      if (!isDev) return false;
    }
    if (!data.layout) return false;
  });

  // ── i18n collections ──────────────────────────────────────────
  // Helper: draft visibility check for collection filters
  const isDraftVisible = (basename) => {
    if (basename.startsWith('__')) return isDev || isStaging;
    if (basename.startsWith('_')) return isDev;
    return true;
  };

  // Italian blog posts
  eleventyConfig.addCollection("blog", col =>
    col.getFilteredByGlob("./blog/*.md")
      .filter(item => {
        const basename = path.basename(item.inputPath);
        return !basename.includes('.en.') && isDraftVisible(basename);
      })
      .reverse()
  );

  // English blog posts
  eleventyConfig.addCollection("blogEn", col =>
    col.getFilteredByGlob("./blog/*.en.md")
      .filter(item => isDraftVisible(path.basename(item.inputPath)))
      .reverse()
  );

  // Italian approach pages (excludes lang:en)
  eleventyConfig.addCollection("approach", col =>
    col.getFilteredByTag("approach")
      .filter(item =>
        item.data.lang !== "en" && isDraftVisible(path.basename(item.inputPath))
      )
      .reverse()
  );

  // English approach pages
  eleventyConfig.addCollection("approachEn", col =>
    col.getFilteredByTag("approach")
      .filter(item =>
        item.data.lang === "en" && isDraftVisible(path.basename(item.inputPath))
      )
      .reverse()
  );

  // ── i18n filters ──────────────────────────────────────────────
  // Find an item in a collection by URL
  eleventyConfig.addFilter("findByUrl", (collection, url) =>
    (collection || []).find(item => item.url === url) || null
  );

  // String.startsWith helper for templates
  eleventyConfig.addFilter("startsWith", (str, prefix) =>
    String(str || '').startsWith(prefix)
  );

  // ── Global data ───────────────────────────────────────────────
  eleventyConfig.addGlobalData("siteUrl", "https://manuelcolombo.github.io");

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addNunjucksFilter('date', dateFilter);

  // Global data: detect if we're in staging
  eleventyConfig.addGlobalData("isStaging", process.env.PATH_PREFIX === "/preview");
  eleventyConfig.addGlobalData("pathPrefix", process.env.PATH_PREFIX || "/");

  // Transform: fix internal links in markdown content to work with pathPrefix
  const pathPrefix = process.env.PATH_PREFIX || "/";
  if (pathPrefix !== "/") {
    eleventyConfig.addTransform("fixInternalLinks", function(content) {
      if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
        // Fix href="/..." links (but not href="http...", href="#...", etc)
        content = content.replace(/href="(\/[^"]*?)"/g, (match, path) => {
          // Skip external links, anchors, and already prefixed paths
          if (path.startsWith('http') || path.startsWith('#') || path.startsWith(pathPrefix)) {
            return match;
          }
          return `href="${pathPrefix}${path}"`;
        });

        // Fix src="/..." for images and scripts
        content = content.replace(/src="(\/[^"]*?)"/g, (match, path) => {
          if (path.startsWith('http') || path.startsWith(pathPrefix)) return match;
          return `src="${pathPrefix}${path}"`;
        });

        // Fix srcset="/..." for <source> and <img srcset> (picture elements)
        content = content.replace(/srcset="([^"]*)"/g, (match, srcset) => {
          const fixed = srcset.replace(/((?:^|,)\s*)(\/[^\s,]+)/g, (m, sep, path) => {
            if (path.startsWith('http') || path.startsWith(pathPrefix)) return m;
            return `${sep}${pathPrefix}${path}`;
          });
          return `srcset="${fixed}"`;
        });
      }
      return content;
    });
  }

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    },
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};


