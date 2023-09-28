const { isBrowser } = require("@jrc03c/js-math-tools")
const parse = require("../../parse")

const fs = (() => {
  try {
    return require("node:fs")
  } catch (e) {
    // ...
  }
})()

function safeRead(key) {
  const out = isBrowser()
    ? localStorage.getItem(key)
    : fs.readFileSync(key, "utf8")

  try {
    return parse(out)
  } catch (e) {
    return out
  }
}

module.exports = safeRead
