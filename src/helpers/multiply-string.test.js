const { floor, isNumber, isString } = require("@jrc03c/js-math-tools")
const multiplyString = require("./multiply-string")

test("tests that the `multiplyString` function works as expected", () => {
  expect(multiplyString("=", 5)).toBe("=====")
  expect(multiplyString("foo", 3)).toBe("foofoofoo")

  const variables = [
    0,
    1,
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
    "foo",
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

  for (const v1 of variables) {
    for (const v2 of variables) {
      if (!isString(v1) || !(isNumber(v2) && v2 >= 0 && floor(v2) === v2)) {
        expect(() => multiplyString(v1, v2)).toThrow()
      }
    }
  }
})
