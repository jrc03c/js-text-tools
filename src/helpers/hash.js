// NOTE: This function was adapted from:
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

const { isString, isUndefined } = require("@jrc03c/js-math-tools")
const stringify = require("../stringify")

async function hash(x, salt) {
  if (isUndefined(salt)) {
    salt = ""
  } else {
    if (!isString(salt)) {
      throw new Error(
        "The second value passed into the `hash` function must be undefined or a string representing a salt to be added to the first value before hashing!"
      )
    }
  }

  if (!isString(x)) {
    x = stringify(x)
  }

  try {
    return Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-512",
          new TextEncoder().encode(x + salt)
        )
      )
    )
      .map(b => b.toString(16).padStart(2, "0"))
      .join("")
  } catch (e) {
    throw new Error(e.toString())
  }
}

module.exports = hash
