const { copy } = require("@jrc03c/js-math-tools")

function stringify(x, replacer, space) {
  return JSON.stringify(copy(x), replacer, space)
}

module.exports = stringify
