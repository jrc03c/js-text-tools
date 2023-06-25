const { isArray } = require("@jrc03c/js-math-tools")

const context =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : typeof self !== "undefined"
    ? self
    : undefined

function convertObjectToTypedArray(x) {
  const typedArrayConstructorSymbol = Symbol.for("@TypedArrayConstructor")
  const typedArrayConstructorString = "Symbol(@TypedArrayConstructor)"

  const typedArrayConstructorKey =
    typedArrayConstructorSymbol in x
      ? typedArrayConstructorSymbol
      : typedArrayConstructorString in x
      ? typedArrayConstructorString
      : undefined

  if (typedArrayConstructorKey) {
    if (!("values" in x)) {
      throw new Error(
        "The value passed into the `convertObjectToTypedArray` must have a 'values' property!"
      )
    }

    if (x.constructor === "ArrayBuffer") {
      return new Uint8Array(x.values).buffer
    }

    return new context[x[typedArrayConstructorKey]](x.values)
  }

  if (isArray(x) && x.constructor.name === "Array") {
    return x
  }

  throw new Error(
    "The value passed into the `convertObjectToTypedArray` must be an object that can be converted into a typed array!"
  )
}

module.exports = convertObjectToTypedArray
