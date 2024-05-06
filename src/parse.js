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
    // console.log("parsing:", x, typeof x)
    // console.log("------------------------")
    if (typeof x === "string") {
      if (x.trim().match(/^("|')?Symbol\(@String\).*?("|')?$/g)) {
        return x
          .trim()
          .replace(/^("|')?Symbol\(@String\):/g, "")
          .replace(/("|')?$/g, "")
      }

      if (x.match(/^'?"?Symbol\(.*?\)"?'?$/g)) {
        const xTemp = x.replace(/^.*?Symbol\(/g, "").replace(/\).*?$/g, "")

        if (xTemp in specials) {
          return specials[xTemp]
        }

        return Symbol.for(xTemp)
      }

      const xTrimmed = x.trim()

      if (xTrimmed.match(/^\/.*?\/(d|g|i|m|s|u|v|y)*?$/g)) {
        try {
          const pattern = xTrimmed
            .replace(/^\//g, "")
            .replace(/\/(d|g|i|m|s|u|v|y)*?$/g, "")

          const flags = xTrimmed
            .match(/\/(d|g|i|m|s|u|v|y)*?$/g)
            .at(-1)
            .split("/")
            .at(-1)

          return new RegExp(pattern, flags)
        } catch (e) {
          // ...
        }
      }

      if (x.trim().match(/^".*?"$/g)) {
        try {
          return JSON.parse(x)
        } catch (e) {
          // ...
        }
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
            const out = helper(value)

            if (typeof out === "string") {
              if (typeof helper(out) !== "string") {
                return JSON.stringify(out)
              } else {
                return out
              }
            }

            return out
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
              let origKey = key

              try {
                key = helper(key)
              } catch (e) {
                // ...
              }

              x[key] = helper(x[origKey])

              if (key !== origKey) {
                delete x[origKey]
              }
            } catch (e) {
              // ...
            }
          })

        try {
          return convertObjectToTypedArray(x)
        } catch (e) {
          return x
        }
      }
    }

    return x
  }

  return helper(x)
}

module.exports = parse
