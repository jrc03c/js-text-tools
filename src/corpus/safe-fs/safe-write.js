// NOTE: This function is intentionally *not* wrapped in a try / catch block
// (unlike the adjacent `safeRead` function). That's because it's important to
// know if a write fails, but it's probably relatively unimportant to know if a
// read fails because the latter can always just return an undefined value.

const {
  assert,
  isBrowser,
  isString,
  isUndefined,
} = require("@jrc03c/js-math-tools")

const safePathJoin = require("./safe-path-join")
const stringify = require("../../stringify")

const fs = (() => {
  try {
    return require("node:fs")
  } catch (e) {
    // ...
  }
})()

function safeWrite(key, value) {
  assert(
    isString(key),
    "The first argument passed into the `safeWrite` function must be a string representing a filesystem path (in Node) or a `localStorage` key (in the browser)!"
  )

  if (isBrowser()) {
    if (isUndefined(value)) {
      localStorage.removeItem("key")
    } else {
      localStorage.setItem(key, stringify(value))
    }
  } else {
    const dir = safePathJoin(...key.split("/").slice(0, -1))

    if (isUndefined(value)) {
      fs.rmSync(key, { recursive: true, force: true })
    } else {
      if (!!dir && !fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      fs.writeFileSync(key, stringify(value), "utf8")
    }
  }
}

module.exports = safeWrite
