const indent = require("./indent.js")

test("tests that unindentation works as expected", () => {
  const a = "Hello, world!"
  const bTrue = "    Hello, world!"
  const bPred = indent(a, 4)
  expect(bPred).toBe(bTrue)

  const c = "Hello, world!"
  const dTrue = "\t\t\t\tHello, world!"
  const dPred = indent(c, 4, "\t")
  expect(dPred).toBe(dTrue)

  const e = [
    "  Hello, world!",
    "\t\t  My name is Josh!",
    "    \t\t  What's your name?",
  ].join("\n")

  const fTrue = e
    .split("\n")
    .map(line => "!!!!!!" + line)
    .join("\n")

  const fPred = indent(e, 6, "!")
  expect(fPred).toBe(fTrue)
})
