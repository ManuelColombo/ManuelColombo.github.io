// .eleventy.js
const dateFilter = require('nunjucks-date-filter');
const lightningCSS = require("@11tyrocks/eleventy-plugin-lightningcss")

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(lightningCSS);
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addNunjucksFilter('date', dateFilter);
  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};


