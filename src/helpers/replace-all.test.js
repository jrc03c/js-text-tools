const replaceAll = require("./replace-all")

test("tests `replaceAll`", () => {
  expect(replaceAll("foobar", "o", "z")).toBe("fzzbar")
  expect(replaceAll("Hello, world!", "!", "?")).toBe("Hello, world?")
})
