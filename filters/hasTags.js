function hasTags(data, tags) {
  return data.filter((d) => d.data.tags.includes(tags));
}

module.exports = hasTags;
