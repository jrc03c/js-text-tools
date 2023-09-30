const { range } = require("@jrc03c/js-math-tools")
const makeKey = require("@jrc03c/make-key")
const safeRead = require("./safe-read")
const safeWrite = require("./safe-write")

const dirs = []

test("tests that the `safeRead` function works as expected", () => {
  expect(safeRead(makeKey(100))).toBe(undefined)

  const key = range(0, 5)
    .map(() => makeKey(5))
    .join("/")

  const value = Math.random()
  expect(safeRead(key)).toBe(undefined)
  safeWrite(key, value)
  expect(safeRead(key)).toBe(value)
  dirs.push(key)

  const wrongs = [
    0,
    1,
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
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

  for (const value of wrongs) {
    expect(() => safeRead(value)).toThrow()
  }
})

afterAll(() => {
  for (const dir of dirs) {
    const root = dir.split("/")[0]
    safeWrite(root, null)
  }
})
