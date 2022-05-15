const wrap = require("./wrap.js")
const makeKey = require("@jrc03c/make-key")
const { range } = require("@jrc03c/js-math-tools")

test("tests that line lengths are correctly constrained", () => {
  const text = range(0, 1000)
    .map(() => makeKey(8))
    .join(" ")

  const maxLineLengths = [40, 80, 120]

  maxLineLengths.forEach(maxLineLength => {
    const wrapped = wrap(text, maxLineLength)

    wrapped.split("\n").forEach(line => {
      expect(line.length).toBeLessThanOrEqual(maxLineLength)
    })
  })
})

test("tests that errors are thrown at appropriate times", () => {
  const rights = [
    ["Hello, world!", null],
    ["Hello, world!", undefined],
  ]

  rights.forEach(pair => {
    expect(() => {
      wrap(pair[0], pair[1])
    }).not.toThrow()
  })

  expect(() => {
    wrap("Hello, world!")
  }).not.toThrow()

  const wrongs = [
    [234, 80],
    [true, 80],
    [false, 80],
    [null, 80],
    [undefined, 80],
    [{}, 80],
    [[], 80],
    [() => {}, 80],
    ["Hello, world!", "foobar"],
    ["Hello, world!", true],
    ["Hello, world!", false],
    ["Hello, world!", {}],
    ["Hello, world!", []],
    ["Hello, world!", () => {}],
  ]

  wrongs.forEach(pair => {
    expect(() => {
      wrap(pair[0], pair[1])
    }).toThrow()
  })
})
