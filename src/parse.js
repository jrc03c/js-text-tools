// NOTE: The `parse` function intentionally avoids parsing functions. Functions
// can be stringified relatively easily, but parsing their string forms back
// into functions is a huge security risk. According to MDN, using `new
// Function("...")` is basically just as insecure as using `eval`.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function

const convertObjectToTypedArray = require("./helpers/convert-object-to-typed-array")

const specials = {
  "@Infinity": Infinity,
  "@NegativeInfinity": -Infinity,
  "@NaN": NaN,
  "@undefined": undefined,
}

function parse(x) {
  function helper(x) {
    if (typeof x === "string") {
      if (x.match(/^'?"?Symbol\(.*?\)"?'?$/g)) {
        x = x.replace(/^.*?Symbol\(/g, "").replace(/\).*?$/g, "")

        if (x in specials) {
          return specials[x]
        }

        return Symbol.for(x)
      }

      try {
        const f = parseFloat(x)

        if (!isNaN(f) && f.toString() === x) {
          return f
        }
      } catch (e) {
        // ...
      }

      try {
        const d = new Date(Date.parse(x))

        if (d.toString() !== "Invalid Date") {
          return d
        }
      } catch (e) {
        // ...
      }

      try {
        return JSON.parse(x, function (key, value) {
          try {
            return parse(value)
          } catch (e) {
            return value
          }
        })
      } catch (e) {
        return x
      }
    }

    if (typeof x === "object") {
      if (x === null) {
        return null
      }

      try {
        return convertObjectToTypedArray(x)
      } catch (e) {
        Object.keys(x)
          .concat(Object.getOwnPropertySymbols(x))
          .forEach(key => {
            try {
              try {
                key = parse(key)
              } catch (e) {
                // ...
              }

              x[key] = parse(x[key])
            } catch (e) {
              // ...
            }
          })

        return x
      }
    }

    return x
  }

  return helper(x)
}

module.exports = parse
