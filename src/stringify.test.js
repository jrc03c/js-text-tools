const stringify = require("./stringify.js")

test("tests that standard values can be stringified", () => {
  const pairs = [
    [234, "234"],
    ["foobar", `"foobar"`],
    [true, "true"],
    [false, "false"],
    [undefined, undefined],
    [null, "null"],
    [x => x, undefined],
    [[2, 3, 4], "[2,3,4]"],
    [{ hello: "world" }, `{"hello":"world"}`],
  ]

  pairs.forEach(pair => {
    expect(stringify(pair[0])).toBe(pair[1])
  })
})

test("tests that objects and arrays with circular references can be stringified", () => {
  const arr = [2, 3, 4]
  arr.push([[arr]])
  arr.push([5, 6, [arr]])
  const arrTrue = `[2,3,4,[["<cyclic reference>"]],[5,6,["<cyclic reference>"]]]`
  expect(stringify(arr)).toBe(arrTrue)

  const obj = { hello: "world" }
  obj["self"] = { x: { y: { z: obj } } }
  obj["arr"] = { values: [2, obj, 3, 4] }
  const objTrue = `{"hello":"world","self":{"x":{"y":{"z":"<cyclic reference>"}}},"arr":{"values":[2,"<cyclic reference>",3,4]}}`
  expect(stringify(obj)).toBe(objTrue)
})
