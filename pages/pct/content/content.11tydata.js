module.exports = {
  eleventyComputed: {
    title: "{{date | date: 'dddd, MMMM D, YYYY'}}",
    eleventyNavigation: {
      key: (data) => data.title,
      parent: (data) => data.tags[0],
    },
  },
};
