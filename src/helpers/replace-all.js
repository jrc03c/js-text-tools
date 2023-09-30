function replaceAll(text, a, b) {
  if (typeof text !== "string") {
    throw new Error("`text` must be a string!")
  }

  if (typeof a !== "string" && !(a instanceof RegExp)) {
    throw new Error("`a` must be a string!")
  }

  if (typeof b !== "string") {
    throw new Error("`b` must be a string!")
  }

  return text.split(a).join(b)
}

module.exports = replaceAll
