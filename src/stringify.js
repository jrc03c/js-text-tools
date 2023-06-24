const {
  assert,
  decycle,
  isArray,
  isDate,
  isString,
  isUndefined,
  range,
} = require("@jrc03c/js-math-tools")

const convertTypedArrayToObject = require("./helpers/convert-typed-array-to-object")

function prefix(s, n) {
  if (!s || n <= 0) return ""

  return range(0, n)
    .map(() => s)
    .join("")
}

function stringify(x, indent) {
  assert(
    isString(indent) || isUndefined(indent),
    "The second parameter to the `stringify` function must be undefined or a string!"
  )

  const newline = indent ? "\n" : ""

  function helper(x, indent, depth) {
    depth = depth || 0

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

      if (isDate(x)) {
        return x.toJSON()
      }

      if (isArray(x)) {
        if (x.length === 0) {
          return prefix(indent, depth - 1) + "[]"
        }

        if (!(x instanceof Array)) {
          return JSON.stringify(convertTypedArrayToObject(x), null, indent)
        }

        return (
          prefix(indent, depth - 1) +
          "[" +
          newline +
          x
            .map(v => {
              let child = (() => {
                try {
                  return helper(convertTypedArrayToObject(v), indent, depth + 1)
                } catch (e) {
                  return helper(v, indent, depth + 1)
                }
              })()

              if (isString(child)) child = child.trim()
              return prefix(indent, depth + 1) + child
            })
            .join("," + newline) +
          newline +
          prefix(indent, depth) +
          "]"
        )
      }

      if (Object.keys(x).length === 0) {
        return prefix(indent, depth - 1) + "{}"
      }

      return (
        prefix(indent, depth - 1) +
        "{" +
        newline +
        Object.keys(x)
          .map(key => {
            let child = (() => {
              try {
                return helper(
                  convertTypedArrayToObject(x[key]),
                  indent,
                  depth + 1
                )
              } catch (e) {
                return helper(x[key], indent, depth + 1)
              }
            })()

            if (isString(child)) child = child.trim()

            return (
              prefix(indent, depth + 1) +
              JSON.stringify(key) +
              ":" +
              (indent ? " " : "") +
              child
            )
          })
          .join("," + newline) +
        newline +
        prefix(indent, depth) +
        "}"
      )
    }

    return "undefined"
  }

  return helper(decycle(x), indent)
}

module.exports = stringify
