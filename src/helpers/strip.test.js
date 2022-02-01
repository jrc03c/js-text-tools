const strip = require("./strip.js")

test("tests `strip`", () => {
  expect(strip("foobarbaz")).toBe("foobarbaz")

  expect(strip("Hello, world! My name is Josh!")).toBe(
    "hello world my name is josh"
  )

  expect(strip("'42 is the number thou shalt count!'")).toBe(
    "42 is the number thou shalt count"
  )

  expect(strip("I don't like you.")).toBe("i dont like you")
})
