function camelify(text) {
  if (typeof text !== "string") {
    throw new Error("`text` must be a string!")
  }

  text = text.trim()
  let out = ""
  let shouldCapitalizeNextCharacter = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    if (char.match(/[A-Za-z0-9]/g)) {
      if (out.length === 0) {
        out += char.toLowerCase()
      } else if (shouldCapitalizeNextCharacter) {
        out += char.toUpperCase()
      } else {
        out += char
      }

      shouldCapitalizeNextCharacter = false
    } else if (
      !char.includes("'") &&
      !char.includes("’") &&
      !char.includes("❜")
    ) {
      shouldCapitalizeNextCharacter = true
    }
  }

  return out
}

module.exports = camelify
