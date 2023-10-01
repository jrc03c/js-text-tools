const {
  assert,
  floor,
  isNumber,
  isString,
  range,
} = require("@jrc03c/js-math-tools")

function multiplyString(s, n) {
  assert(
    isString(s),
    "The first argument passed into the `multiplyString` function must be a string!"
  )

  assert(
    isNumber(n) && n >= 0 && floor(n) === n,
    "The second argument passed into the `multiplyString` function must be a non-negative integer representing the number of times the first argument (a string) will be multiplied!"
  )

  return range(0, n)
    .map(() => s)
    .join("")
}

module.exports = multiplyString
