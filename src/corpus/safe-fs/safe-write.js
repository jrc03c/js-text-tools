// NOTE: This function is intentionally *not* wrapped in a try / catch block
// (unlike the adjacent `safeRead` function). That's because it's important to
// know if a write fails, but it's probably relatively unimportant to know if a
// read fails because the latter can always just return an undefined value.

const { isBrowser } = require("@jrc03c/js-math-tools")
const stringify = require("../../stringify")

const fs = (() => {
  try {
    return require("node:fs")
  } catch (e) {
    // ...
  }
})()

function safeWrite(key, value) {
  if (isBrowser()) {
    localStorage.setItem(key, stringify(value))
  } else {
    const dir = key.split("/").slice(0, -1).join("/")

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(key, stringify(value), "utf8")
  }
}

module.exports = safeWrite
