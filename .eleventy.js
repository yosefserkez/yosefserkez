const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const htmlmin = require("html-minifier");
const date = require("./filters/dayjs-filter");
const truncate = require("./filters/truncate");

const now = String(Date.now());

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addWatchTarget("./styles/tailwind.config.js");
  eleventyConfig.addWatchTarget("./styles/tailwind.css");
  eleventyConfig.addPassthroughCopy({
    "./node_modules/alpinejs/dist/cdn.js": "./js/alpine.js",
  });
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addShortcode("version", function () {
    return now;
  });

  eleventyConfig.addFilter("date", date);
  eleventyConfig.addFilter("truncate", truncate);

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });
};
