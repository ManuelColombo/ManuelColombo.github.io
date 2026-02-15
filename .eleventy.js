// .eleventy.js
const dateFilter = require('nunjucks-date-filter');
const lightningCSS = require("@11tyrocks/eleventy-plugin-lightningcss")

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(lightningCSS);
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


