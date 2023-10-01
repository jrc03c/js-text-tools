const {
  isEqual,
  isFunction,
  isUndefined,
  range,
} = require("@jrc03c/js-math-tools")

const makeKey = require("@jrc03c/make-key")
const safeRead = require("./safe-read")
const safeWrite = require("./safe-write")

const files = []

test("tests that the `safeWrite` function works as expected", () => {
  const variables = [
    0,
    1,
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
    null,
    undefined,
    Symbol.for("Hello, world!"),
    [2, 3, 4],
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new Date(),
  ]

  for (const value of variables) {
    if (typeof value !== "string") {
      expect(() => safeWrite(value, Math.random())).toThrow()
    }
  }

  for (const value of variables) {
    if (!isUndefined(value) && !isFunction(value)) {
      const file = range(0, 5)
        .map(() => makeKey(3))
        .join("/")

      files.push(file)
      safeWrite(file, value)
      const valuePred = safeRead(file)
      expect(isEqual(valuePred, value)).toBe(true)
    }
  }
})

afterAll(() => {
  for (const file of files) {
    const root = file.split("/")[0]
    safeWrite(root, null)
  }
})
