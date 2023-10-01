const {
  assert,
  flatten,
  floor,
  isArray,
  isNumber,
  isString,
  isUndefined,
  random,
  range,
} = require("@jrc03c/js-math-tools")

function randomString(n, chars) {
  chars = isUndefined(chars) ? "abcdef1234567890" : chars

  assert(
    isNumber(n) && n > 0 && floor(n) === n,
    "The first argument passed into the `randomString` function must be a positive integer representing the length of the random string to be generated!"
  )

  if (isArray(chars)) {
    chars = flatten(chars).filter(v => isString(v) && v.length > 0)

    assert(
      chars.length > 0,
      "The second argument passed into the `randomString` function must be (1) undefined or (2) a string or an array of strings representing the characters of which the random string should be composed!"
    )
  } else if (!isString(chars) || chars.length === 0) {
    throw new Error(
      "The second argument passed into the `randomString` function must be (1) undefined or (2) a string or an array of strings representing the characters of which the random string should be composed!"
    )
  }

  return range(0, n)
    .map(() => chars[floor(random() * chars.length)])
    .join("")
}

module.exports = randomString
