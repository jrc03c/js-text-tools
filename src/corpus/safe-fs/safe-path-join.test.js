const {
  multiplyString,
  punctuation,
  randomString,
  replaceAll,
} = require("../../helpers")

const { shuffle } = require("@jrc03c/js-math-tools")
const path = require("path")
const safePathJoin = require("./safe-path-join")

const punctuationWithoutSlash = replaceAll(punctuation, "/", "")

const allCharacters = "abcdef1234567890"
  .split("")
  .concat(punctuationWithoutSlash)

test("tests that the `safePathJoin` function works as expected", () => {
  const here = path.resolve(".")
  expect(safePathJoin(here)).toBe(here)
  expect(safePathJoin(...here.split("/"))).toBe(here)
  expect(safePathJoin("")).toBe("")
  expect(safePathJoin("foo/////bar")).toBe("foo/bar")
  expect(safePathJoin("/////foo/bar")).toBe("/foo/bar")
  expect(safePathJoin("foo/bar/////")).toBe("foo/bar")
  expect(safePathJoin("./foo/bar")).toBe("./foo/bar")
  expect(safePathJoin("../foo/bar")).toBe("../foo/bar")
  expect(safePathJoin("~/foo/bar")).toBe("~/foo/bar")
  expect(safePathJoin("../../..")).toBe("../../..")
  expect(safePathJoin("foo/bar/~")).toBe("foo/bar/~")

  const trueParts = []
  const allParts = []

  for (let i = 0; i < 100; i++) {
    const part = randomString(Math.floor(Math.random() * 8) + 1, allCharacters)
    trueParts.push(part)
    allParts.push(part)
    allParts.push(multiplyString("/", Math.floor(Math.random() * 5) + 1))
  }

  expect(safePathJoin(...allParts)).toBe(trueParts.join("/"))

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

  for (let i = 0; i < 100; i++) {
    expect(() =>
      safePathJoin(
        ...shuffle(wrongs).slice(0, Math.floor(Math.random() * 10 + 1))
      )
    ).toThrow()
  }
})
