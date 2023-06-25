const { abs, isEqual, normal, round } = require("@jrc03c/js-math-tools")
const convertObjectToTypedArray = require("./convert-object-to-typed-array")
const convertTypedArrayToObject = require("./convert-typed-array-to-object")

test("tests that the `convertTypedArrayToObject` works correctly", () => {
  const types = {
    Array,
    BigInt64Array,
    BigUint64Array,
    Float32Array,
    Float64Array,
    Int16Array,
    Int32Array,
    Int8Array,
    Uint16Array,
    Uint32Array,
    Uint8Array,
    Uint8ClampedArray,
  }

  Object.keys(types).forEach(type => {
    const lowerType = type.toLowerCase()

    const values = normal(100).map(v => {
      if (lowerType.includes("int")) {
        v = round(v)
      }

      if (lowerType.includes("uint")) {
        v = abs(v)
      }

      if (lowerType.includes("bigint") || lowerType.includes("biguint")) {
        v = BigInt(v)
      }

      return v
    })

    const x = type === "Array" ? values : new types[type](values)

    const yTrue =
      type === "Array"
        ? Array.from(x)
        : {
            [Symbol.for("@TypedArrayConstructor")]: type,
            values: Array.from(x),
          }

    const yPred = convertTypedArrayToObject(x)

    if (!isEqual(yTrue, yPred)) {
      console.log(type.name)
      console.log(yTrue)
      console.log(yPred)
    }

    expect(isEqual(yTrue, yPred)).toBe(true)
  })
})

test("tests that the `convertObjectToTypedArray` works correctly", () => {
  const types = {
    Array,
    BigInt64Array,
    BigUint64Array,
    Float32Array,
    Float64Array,
    Int16Array,
    Int32Array,
    Int8Array,
    Uint16Array,
    Uint32Array,
    Uint8Array,
    Uint8ClampedArray,
  }

  Object.keys(types).forEach(type => {
    const lowerType = type.toLowerCase()

    const x = {
      [Symbol.for("@TypedArrayConstructor")]: type,
      values: normal(100).map(v => {
        if (lowerType.includes("int")) {
          v = round(v)
        }

        if (lowerType.includes("uint")) {
          v = abs(v)
        }

        if (lowerType.includes("bigint") || lowerType.includes("biguint")) {
          v = BigInt(v)
        }

        return v
      }),
    }

    const yTrue = new types[type](x.values)
    const yPred = convertObjectToTypedArray(x)
    expect(isEqual(yTrue, yPred)).toBe(true)
    expect(yTrue[Symbol.for("@TypedArrayConstructor")]).toBe(type.name)
    expect(yPred[Symbol.for("@TypedArrayConstructor")]).toBe(type.name)
  })

  const a = {
    [Symbol.for("@TypedArrayConstructor")]: "ArrayBuffer",
    values: [2, 3, 4],
  }

  const bTrue = new Uint8Array([2, 3, 4]).buffer
  const bPred = convertObjectToTypedArray(a)
  expect(isEqual(bTrue, bPred)).toBe(true)

  expect(bPred[Symbol.for("@TypedArrayConstructor")]).toBe(
    bTrue[Symbol.for("@TypedArrayConstructor")]
  )

  const c = { values: a.values }

  const d = {
    [Symbol.for("@TypedArrayConstructor")]:
      a[Symbol.for("@TypedArrayConstructor")],
  }

  const wrongs = [c, d]

  wrongs.forEach(wrong => {
    expect(() => convertObjectToTypedArray(wrong)).toThrow()
  })
})

test("tests that typed arrays can be converted to objects and back", () => {
  const types = {
    Array,
    BigInt64Array,
    BigUint64Array,
    Float32Array,
    Float64Array,
    Int16Array,
    Int32Array,
    Int8Array,
    Uint16Array,
    Uint32Array,
    Uint8Array,
    Uint8ClampedArray,
  }

  Object.keys(types).forEach(type => {
    const lowerType = type.toLowerCase()

    const values = normal(100).map(v => {
      if (lowerType.includes("int")) {
        v = round(v)
      }

      if (lowerType.includes("uint")) {
        v = abs(v)
      }

      if (lowerType.includes("bigint") || lowerType.includes("biguint")) {
        v = BigInt(v)
      }

      return v
    })

    const xTrue = new types[type](values)
    const xPred = convertObjectToTypedArray(convertTypedArrayToObject(xTrue))
    expect(isEqual(xTrue, xPred)).toBe(true)
    expect(xTrue[Symbol.for("@TypedArrayConstructor")]).toBe(type.name)
    expect(xPred[Symbol.for("@TypedArrayConstructor")]).toBe(type.name)
  })
})
