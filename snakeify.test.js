const snakeify = require("./snakeify.js")

test("tests `snakeify`", () => {
  expect(snakeify("foobarbaz")).toBe("foobarbaz")

  expect(snakeify("Hello, world! My name is Josh!")).toBe(
    "hello_world_my_name_is_josh"
  )

  expect(snakeify("'42 is the number thou shalt count!'")).toBe(
    "42_is_the_number_thou_shalt_count"
  )
})
