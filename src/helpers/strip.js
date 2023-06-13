const punctuation = require("./punctuation")
const replaceAll = require("./replace-all")

const doubleSpace = "  "
const singleSpace = " "

function strip(text) {
  if (typeof text !== "string") {
    throw new Error("`text` must be a string!")
  }

  let out = ""

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase()

    if (punctuation.includes(char)) {
      out += singleSpace
    } else {
      out += char
    }
  }

  while (out.includes(doubleSpace)) {
    out = replaceAll(out, doubleSpace, singleSpace)
  }

  return out.trim()
}

module.exports = strip
