const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const htmlmin = require("html-minifier");
const date = require("./filters/dayjs-filter");
const truncate = require("./filters/truncate");

const now = String(Date.now());

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(pluginRss);

    eleventyConfig.addWatchTarget("./styles/tailwind.config.js");
    eleventyConfig.addWatchTarget("./styles/tailwind.css");

    eleventyConfig.addPassthroughCopy({
        "./node_modules/alpinejs/dist/cdn.js": "./js/alpine.js",
    });
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("CNAME");

    eleventyConfig.addShortcode("version", function () {
        return now;
    });

    eleventyConfig.addShortcode('post-img', (src, author, alt = "") => `<div class="mx-auto grid gap-1 my-4" >
        <img src="${src}" class="w-full overflow-hidden" alt="${alt}">
        <p class="text-center text-sm text-gray-500 ${author ? '' : 'hidden'}">Photo by ${author}</p>
    </div>`
    );

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
