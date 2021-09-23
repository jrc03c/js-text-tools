const strip = require("./helpers/strip.js")

function capitalize(text) {
  return text[0].toUpperCase() + text.substring(1, text.length).toLowerCase()
}

function camel(text) {
  const words = strip(text).split(" ")
  return (
    words[0].toLowerCase() +
    words
      .slice(1)
      .map(w => capitalize(w))
      .join("")
  )
}

if (typeof module !== "undefined") {
  module.exports = camel
}
