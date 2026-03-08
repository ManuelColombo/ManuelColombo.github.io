// .eleventy.js
const path = require('path');
const dateFilter = require('nunjucks-date-filter');
const lightningCSS = require("@11tyrocks/eleventy-plugin-lightningcss")

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(lightningCSS);

  // Custom markdown syntax: ::testo:: → <span class="occhiello">testo</span>
  eleventyConfig.addTransform("occhiello", function(content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return content.replace(/::([^:]+)::/g, '<span class="occhiello">$1</span>');
    }
    return content;
  });

  // Image sizing: ![cover|alt](url) → <figure class="img-cover"><img alt="alt"></figure>
  // Sizes: cover, wide, half  (standalone images, on their own line)
  // inline: ![inline|alt](url) within text → adds class img-inline directly on <img>
  eleventyConfig.addTransform("imgSize", function(content) {
    if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) return content;
    // Step 1: wrap size-tagged <img> in <figure> regardless of context
    content = content.replace(
      /<img src="([^"]*)" alt="(cover|wide|half)(?:\|([^"]*))?"([^>]*?)>/g,
      (_, src, size, alt, rest) =>
        `<figure class="img-${size}"><img src="${src}" alt="${alt || ''}"${rest}></figure>`
    );
    // Step 2: remove <p> wrappers that now contain only figures (and whitespace)
    content = content.replace(
      /<p>(\s*<figure\b[\s\S]*?<\/figure>\s*)+<\/p>/g,
      match => match.replace(/^<p>|<\/p>$/g, '')
    );
    // Step 3: inline images → add class directly on <img>
    content = content.replace(
      /<img src="([^"]*)" alt="(inline|inline-right)(?:\|([^"]*))?"([^>]*?)>/g,
      (_, src, size, alt, rest) =>
        `<img src="${src}" alt="${alt || ''}" class="img-${size}"${rest}>`
    );
    return content;
  });
  // Files prefixed with "_" are only rendered in local dev (DEV=true)
  if (!process.env.DEV) {
    eleventyConfig.ignores.add("**/_*.md");
  }

  // Ignore markdown files without a layout in front matter
  eleventyConfig.addPreprocessor("require-layout", "md", (data) => {
    if (!data.layout) return false;
  });

  // ── i18n collections ──────────────────────────────────────────
  // Italian blog posts (excludes .en.md and _-prefixed drafts)
  eleventyConfig.addCollection("blog", col =>
    col.getFilteredByGlob("./blog/*.md")
      .filter(item =>
        !path.basename(item.inputPath).includes('.en.') &&
        !path.basename(item.inputPath).startsWith('_')
      )
      .reverse()
  );

  // English blog posts
  eleventyConfig.addCollection("blogEn", col =>
    col.getFilteredByGlob("./blog/*.en.md").reverse()
  );

  // Italian approach pages (excludes lang:en)
  eleventyConfig.addCollection("approach", col =>
    col.getFilteredByTag("approach")
      .filter(item => item.data.lang !== "en")
      .reverse()
  );

  // English approach pages
  eleventyConfig.addCollection("approachEn", col =>
    col.getFilteredByTag("approach")
      .filter(item => item.data.lang === "en")
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
          // Skip external resources and already prefixed paths
          if (path.startsWith('http') || path.startsWith(pathPrefix)) {
            return match;
          }
          return `src="${pathPrefix}${path}"`;
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


