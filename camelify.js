const strip = require("./helpers/strip.js")

function capitalize(text) {
  return text[0].toUpperCase() + text.substring(1, text.length).toLowerCase()
}

function camelify(text) {
  if (typeof text !== "string") {
    throw new Error("`text` must be a string!")
  }

  const words = strip(text).split(" ")

  if (words.length === 0) return ""
  if (words.length === 1) return words[0]

  return (
    words[0].toLowerCase() +
    words
      .slice(1)
      .map(w => capitalize(w))
      .join("")
  )
}

module.exports = camelify
