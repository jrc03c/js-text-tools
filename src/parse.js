// NOTE: The `parse` function intentionally avoids parsing functions. Functions
// can be stringified relatively easily, but parsing their string forms back
// into functions is a huge security risk. According to MDN, using `new
// Function("...")` is basically just as insecure as using `eval`.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function

const { isArray } = require("@jrc03c/js-math-tools")
const { convertObjectToTypedArray, isANumberString } = require("./helpers")

const specials = {
  "@Infinity": Infinity,
  "@NegativeInfinity": -Infinity,
  "@NaN": NaN,
  "@undefined": undefined,
}

function parseAsNumber(x) {
  if (typeof x !== "string") {
    if (typeof x === "number") {
      return x
    } else {
      return
    }
  }

  if (isANumberString(x)) {
    return parseFloat(x)
  }
}

function parseAsString(x) {
  if (typeof x !== "string") {
    return
  }

  if (x.trim().match(/^("|')?Symbol\(@String\):.*?("|')?$/g)) {
    let out = x.replace("Symbol(@String):", "")

    if (out.match(/^".*?"$/g)) {
      out = out.substring(1, out.length - 1)
    }

    return out
  }
}

function parseAsSymbol(x) {
  if (typeof x !== "string") {
    if (typeof x === "symbol") {
      return { out: x, isASymbol: true }
    } else {
      return
    }
  }

  if (x.trim().match(/^'?"?Symbol\(.*?\)"?'?$/g)) {
    const xTemp = x.replace(/^.*?Symbol\(/g, "").replace(/\).*?$/g, "")

    if (xTemp in specials) {
      return { out: specials[xTemp], isASymbol: true }
    }

    return { out: Symbol.for(xTemp), isASymbol: true }
  }
}

function parseAsRegex(x) {
  if (typeof x !== "string") {
    if (x instanceof RegExp) {
      return x
    } else {
      return
    }
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
}

function parseWithJSONParse(x) {
  if (typeof x !== "string") {
    if (typeof x === "object") {
      return x
    } else {
      return
    }
  }

  try {
    let out = JSON.parse(x, (key, value) => {
      try {
        return parse(value)
      } catch (e) {
        return value
      }
    })

    const fixUndefineds = x => {
      if (isArray(x)) {
        for (let i = 0; i < x.length; i++) {
          x[i] = fixUndefineds(x[i])
        }

        return x
      } else {
        if (typeof x === "undefined") {
          return undefined
        }

        return x
      }
    }

    if (isArray(out)) {
      out = fixUndefineds(out)
    }

    return out
  } catch (e) {
    // ...
  }
}

function parseAsDate(x) {
  if (typeof x !== "string") {
    if (x instanceof Date && x.toString() !== "Invalid Date") {
      return x
    } else {
      return
    }
  }

  try {
    const d = new Date(Date.parse(x))

    if (d.toString() !== "Invalid Date") {
      return d
    }
  } catch (e) {
    // ...
  }
}

function parseObjectKeysAndValues(x) {
  if (typeof x === "object") {
    return
  }

  Object.keys(x)
    .concat(Object.getOwnPropertySymbols(x))
    .forEach(key => {
      try {
        let origKey = key

        try {
          key = parse(key)
        } catch (e) {
          // ...
        }

        x[key] = parse(x[origKey])

        if (key !== origKey) {
          delete x[origKey]
        }
      } catch (e) {
        // ...
      }
    })

  return x
}

function parse(x) {
  function helper(x) {
    if (typeof x === "string") {
      let out = parseAsString(x)
      if (typeof out === "string") return out

      const results = parseAsSymbol(x)
      out = results ? results.out : undefined
      if (results && results.isASymbol) return out

      out = parseAsRegex(x)
      if (out instanceof RegExp) return out

      out = parseAsNumber(x)
      if (typeof out === "number") return out

      out = parseAsDate(x)
      if (out instanceof Date) return out

      out = parseWithJSONParse(x)
      if (typeof out !== "undefined") return out

      return x
    }

    if (typeof x === "object") {
      if (x === null) {
        return null
      }

      let out

      try {
        out = convertObjectToTypedArray(x)
        if (isArray(out)) return out
      } catch (e) {
        // ...
      }

      out = parseObjectKeysAndValues(x)

      if (out) {
        try {
          return convertObjectToTypedArray(out)
        } catch (e) {
          return out
        }
      }

      return x
    }

    return x
  }

  return helper(x)
}

module.exports = parse
