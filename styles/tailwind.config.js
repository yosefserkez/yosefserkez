module.exports = {
  content: ["_site/**/*.html", "_includes/**/*.njk"],
  safelist: [],
  theme: {
    extend: {
      saturate: {
        80: ".80",
      },
      colors: {
        change: "black",
      },
    },
  },
  plugins: [],
};
