const kebabify = require("./kebabify")

test("tests `kebabify`", () => {
  expect(kebabify("foobarbaz")).toBe("foobarbaz")

  expect(kebabify("Hello, world! My name is Josh!")).toBe(
    "hello-world-my-name-is-josh"
  )

  expect(kebabify("'42 is the number thou shalt count!'")).toBe(
    "42-is-the-number-thou-shalt-count"
  )

  expect(kebabify("I don't like you.")).toBe("i-don-t-like-you")

  expect(kebabify("how-about-now")).toBe("how-about-now")
})
