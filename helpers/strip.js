const replaceAll = require("./replace-all.js")
const alpha = "abcdefghijklmnopqrstuvwxyz1234567890"
const doubleSpace = "  "
const singleSpace = " "

function strip(text) {
  if (typeof text !== "string") {
    throw new Error("`text` must be a string!")
  }

  let out = ""

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase()

    if (alpha.includes(char)) {
      out += char
    } else {
      out += singleSpace
    }
  }

  while (out.includes(doubleSpace)) {
    out = replaceAll(out, doubleSpace, singleSpace)
  }

  return out.trim()
}

module.exports = strip
