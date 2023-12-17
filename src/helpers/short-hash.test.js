const shortHash = require("./short-hash")

test("tests that the `short-hash` function works as expected", async () => {
  const a = await shortHash("Hello, world!", 32)
  const b = await shortHash("Hello, world!", 32)
  expect(a.length).toBe(32)
  expect(b).toBe(a)

  const c = await shortHash("Goodbye, world!", 32)
  expect(c).not.toBe(b)

  const d = await shortHash("foobar", 8)
  const e = await shortHash("foobar", 64)
  expect(e.slice(0, 8)).toBe(d)
  expect(d.length).toBe(8)
  expect(e.length).toBe(64)
})
