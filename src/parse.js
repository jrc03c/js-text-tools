// NOTE: The `parse` function intentionally avoids parsing functions. Functions
// can be stringified relatively easily, but parsing their string forms back
// into functions is a huge security risk. According to MDN, using `new
// Function("...")` is basically just as insecure as using `eval`.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function

const convertObjectToTypedArray = require("./helpers/convert-object-to-typed-array")

function parse(x) {
  try {
    if (typeof x === "string") {
      if (x === "Infinity") {
        return Infinity
      }

      if (x === "-Infinity") {
        return -Infinity
      }

      if (x === "NaN") {
        return NaN
      }

      if (x === "undefined") {
        return undefined
      }

      if (x.match(/^Symbol\(.*?\)$/g)) {
        x = x.replace("Symbol(", "")
        x = x.substring(0, x.length - 1)
        return Symbol.for(x)
      }
    }

    return JSON.parse(x, function (key, value) {
      try {
        return convertObjectToTypedArray(value)
      } catch (e) {
        return value
      }
    })
  } catch (e) {
    return x
  }
}

module.exports = parse
