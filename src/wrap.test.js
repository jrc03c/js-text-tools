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

test("tests that wrapping preserves indentation", () => {
  const text =
    "\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis tellus eu mi condimentum, a congue ipsum luctus. Donec vel suscipit dolor, vitae faucibus massa. Curabitur rhoncus semper tortor et mattis. Nullam laoreet lobortis nibh eget viverra. Nam molestie risus vitae ante placerat convallis. Pellentesque quis tristique dui. Vivamus efficitur mi erat, nec gravida felis posuere at. Donec sapien ipsum, viverra et aliquam quis, posuere ac ligula. Aenean egestas tincidunt mauris, in hendrerit tortor malesuada id. Proin viverra sodales ex eu fermentum. Aenean nisl ipsum, tristique venenatis massa eget, tempor facilisis felis. Praesent aliquam sem vitae arcu porta commodo. Aliquam tempor sollicitudin dapibus. Nulla ullamcorper orci eu ultricies cursus."

  const wrapped1 = wrap(text, 40)
  const lines1 = wrapped1.split("\n")

  lines1.forEach(line => {
    expect(line.startsWith("\t\t")).toBe(true)
    expect(line.length).toBeLessThanOrEqual(40)
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
