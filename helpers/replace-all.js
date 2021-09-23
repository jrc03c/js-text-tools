function replaceAll(text, a, b) {
  return text.split(a).join(b)
}

if (typeof module !== "undefined") {
  module.exports = replaceAll
}
