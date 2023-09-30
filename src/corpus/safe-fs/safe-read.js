// NOTE: See the note in `./safe-read.js` about why the innards of this function
// are wrapped in a try / catch block.

const { assert, isBrowser, isString } = require("@jrc03c/js-math-tools")
const parse = require("../../parse")

const fs = (() => {
  try {
    return require("node:fs")
  } catch (e) {
    // ...
  }
})()

function safeRead(key) {
  assert(
    isString(key),
    "The value passed into the `safeRead` function must be a string representing a filesystem path (in Node) or a `localStorage` key (in the browser)!"
  )

  try {
    const out = isBrowser()
      ? localStorage.getItem(key)
      : fs.readFileSync(key, "utf8")

    try {
      return parse(out)
    } catch (e) {
      return out
    }
  } catch (e) {
    return undefined
  }
}

module.exports = safeRead
