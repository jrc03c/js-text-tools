const { decycle } = require("@jrc03c/js-math-tools")

// 0,
// 1,
// 2.3,
// -2.3,
// Infinity,
// -Infinity,
// NaN,
// "foo",
// true,
// false,
// null,
// undefined,
// Symbol.for("Hello, world!"),
// [2, 3, 4],
// [
//   [2, 3, 4],
//   [5, 6, 7],
// ],
// x => x,
// function (x) {
//   return x
// },
// { hello: "world" },
// selfReferencer,

function stringify(x, prefix) {
  function helper(x, prefix) {
    if (typeof x === "number" || typeof x === "bigint") {
      if (x === Infinity) {
        return "Infinity"
      }

      if (x === -Infinity) {
        return "-Infinity"
      }

      if (isNaN(x)) {
        return "NaN"
      }

      return x.toString()
    }

    if (typeof x === "string") {
      return JSON.stringify(x)
    }

    if (typeof x === "boolean") {
      return x.toString()
    }

    if (typeof x === "undefined") {
      return "undefined"
    }

    if (typeof x === "symbol") {
      return x.toString()
    }

    if (typeof x === "function") {
      return x.toString()
    }

    if (typeof x === "object") {
      if (x === null) {
        return "null"
      }

      if (x.map) {
        return "[" + x.map(v => helper(v, prefix)).join(", ") + "]"
      }

      return (
        "{" +
        Object.keys(x)
          .map(key => {
            return JSON.stringify(key) + ": " + helper(x[key], prefix)
          })
          .join(", ") +
        "}"
      )
    }

    return "undefined"
  }

  return helper(decycle(x), prefix)
}

module.exports = stringify
