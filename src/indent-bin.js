#!/usr/bin/env node
const fs = require("fs")
const indent = require("./indent.js")
const path = require("path")
const unindent = require("./unindent.js")
const wrap = require("./wrap.js")

const helpMessage = wrap(
  indent(
    unindent(`
      The syntax is:

        \x1b[1m\x1b[35mindent <file> <chars>\x1b[0m

      Example:

        \x1b[36mindent somefile.txt ">> "\x1b[0m

      Use \`indent --help\` to show this message again.
    `),
    "  "
  )
)

try {
  if (process.argv.length <= 3) {
    console.log(helpMessage)
    process.exit()
  }

  if (process.argv.indexOf("--help") > -1) {
    console.log(helpMessage)
    process.exit()
  }

  const file = path.resolve(process.argv[2])
  const raw = fs.readFileSync(file, "utf8")
  const chars = process.argv[3]
  const out = indent(raw, chars)
  console.log(out)
} catch (e) {
  console.log(e)
  console.log("============================")
  console.log(helpMessage)
}
