const stringify = require("./stringify")
const unindent = require("./unindent")

test("tests that standard values can be stringified", () => {
  function double(x) {
    return x * 2
  }

  const pairs = [
    [-2.3, "-2.3"],
    [-Infinity, "-Infinity"],
    ["foo", `"foo"`],
    [[2, 3, 4], "[2,3,4]"],
    [{ hello: "world" }, `{"hello":"world"}`],
    [0, "0"],
    [1, "1"],
    [2.3, "2.3"],
    [double, "function double(x) {\n    return x * 2;\n  }"],
    [false, "false"],
    [Infinity, "Infinity"],
    [NaN, "NaN"],
    [null, "null"],
    [Symbol.for("Hello, world!"), "Symbol(Hello, world!)"],
    [true, "true"],
    [undefined, "undefined"],
    [x => x, "x => x"],
  ]

  pairs.forEach(pair => {
    expect(stringify(pair[0])).toBe(pair[1])
  })
})

test("tests that objects and arrays with circular references can be stringified", () => {
  const arr = [2, 3, 4]
  arr.push([[arr]])
  arr.push([5, 6, [arr]])
  const arrTrue = `[2,3,4,[["<reference to \\"/\\">"]],[5,6,["<reference to \\"/\\">"]]]`
  expect(stringify(arr)).toBe(arrTrue)

  const obj = { hello: { to: { the: "world" } } }
  obj.hello.to.copy = obj.hello.to
  obj["self"] = { x: { y: { z: obj.hello.to } } }
  obj["arr"] = { values: [2, obj.hello.to, 3, 4] }
  const objTrue = `{"hello":{"to":{"the":"world","copy":"<reference to \\"/hello/to\\">"}},"self":{"x":{"y":{"z":{"the":"world","copy":"<reference to \\"/hello/to\\">"}}}},"arr":{"values":[2,{"the":"world","copy":"<reference to \\"/hello/to\\">"},3,4]}}`
  expect(stringify(obj)).toBe(objTrue)
})
