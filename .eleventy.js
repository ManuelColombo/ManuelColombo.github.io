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


