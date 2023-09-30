const makeKey = require("@jrc03c/make-key")
const safeRead = require("./safe-read")

test("tests that the `safeRead` function works as expected", () => {
  expect(safeRead(makeKey(100))).toBe(undefined)
})
