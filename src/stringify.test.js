const { random, round, seed } = require("@jrc03c/js-math-tools")
const makeKey = require("@jrc03c/make-key")
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

test("tests that indentation can be applied when stringifying", () => {
  function double(x) {
    return x * 2
  }

  seed(12345)

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
    x => x,
    new Date(round(random() * 10e13)),
    double,
  ]

  const obj = {}
  const frontier = [obj]

  for (let i = 0; i < 100; i++) {
    const endpoint = frontier[parseInt(random() * frontier.length)]

    const value =
      random() < 1 / 4
        ? []
        : random() < 1 / 4
        ? {}
        : variables[parseInt(random() * variables.length)]

    if (endpoint instanceof Array) {
      endpoint.push(value)
    } else {
      const key = makeKey(parseInt(random() * 5) + 1)
      endpoint[key] = value
    }

    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Date)
    ) {
      frontier.push(value)
    }
  }

  const xPred = stringify(obj, "  ")

  const xTrue = unindent(`
    {
      "43": 2.3,
      "dgg4": [
        0,
        false,
        0,
        {
          "2": [
            undefined
          ],
          "5": x => x,
          "49": [
            [],
            {},
            1,
            []
          ],
          "1d": x => x,
          "2e03": 1,
          "e2b": [
            -2.3,
            Infinity,
            [],
            2.3,
            x => x
          ],
          "d0e58": x => x,
          "fd0cc": {
            "3897": undefined,
            "bf": {
              "14": [
                -2.3
              ],
              "ab1": [],
              "8fg": x => x
            },
            "aa9d": undefined,
            "c7": [
              [
                [
                  2.3,
                  [
                    [
                      true
                    ],
                    []
                  ],
                  {}
                ]
              ],
              []
            ],
            "a9gb": {
              "1c9": [
                -Infinity
              ],
              "0568": Symbol(Hello, world!)
            }
          },
          "1dfce": 0,
          "7c": {
            "0c6fc": {},
            "d7f2d": {}
          },
          "f7dd": [
            1
          ]
        },
        [
          {
            "9": -Infinity,
            "189f": {
              "9": [],
              "d6": {
                "9deg1": "foo",
                "d3f": [
                  {
                    "9": "foo",
                    "962": [],
                    "2g2bb": {},
                    "4b8ce": Symbol(Hello, world!),
                    "e777": 0
                  },
                  2.3
                ]
              },
              "9a1": [
                {}
              ]
            },
            "f1": {
              "7c4": {
                "a": 0
              }
            }
          },
          {
            "5": 1,
            "62859": {},
            "begd": 2365-02-16T23:47:32.955Z
          },
          [],
          {},
          true,
          [
            2.3
          ]
        ],
        function double(x) {
      return x * 2;
    },
        {
          "55da": [
            [
              NaN,
              null,
              true,
              []
            ],
            false,
            NaN
          ],
          "87b8": [
            {
              "4f": "foo",
              "ad": x => x
            }
          ]
        },
        []
      ],
      "73aa2": NaN,
      "eff": x => x,
      "f95": function double(x) {
      return x * 2;
    },
      "d8g3": 2365-02-16T23:47:32.955Z,
      "6ea": 1
    }  
  `)
    .trim()
    .split("\n")
    .map((line, i, arr) => {
      if (line.includes("return x * 2;")) {
        return "    " + unindent(line)
      }

      if (arr[i - 1] && arr[i - 1].includes("return x * 2;")) {
        return "  " + unindent(line)
      }

      return line
    })
    .join("\n")

  expect(xPred).toBe(xTrue)
})
