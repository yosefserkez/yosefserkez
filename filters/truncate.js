function truncate(str, num = 100) {
  let s = str.slice(0, num);
  if (s.length < str.length) s += "...";
  return s;
}

module.exports = truncate;
