const { decycle } = require("@jrc03c/js-math-tools")

function stringify(x, replacer, space) {
  return JSON.stringify(decycle(x), replacer, space)
}

module.exports = stringify
