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

        \x1b[1m\x1b[35mwrap <file> \x1b[2m<max-line-length> <hanging-indent-prefix>\x1b[0m

      Example:

        \x1b[36mwrap somefile.txt 80 "→→" \x1b[0m

      The maximum line length is optional and defaults to the minimum of 80 characters. Use \`wrap --help\` to show this message again.
    `),
    "  "
  )
)

try {
  if (process.argv.length <= 2) {
    console.log(helpMessage)
    process.exit()
  }

  if (process.argv.indexOf("--help") > -1) {
    console.log(helpMessage)
    process.exit()
  }

  const file = path.resolve(process.argv[2])
  const tempMaxLineLength = parseInt(process.argv[3])
  const maxLineLength = isNaN(tempMaxLineLength) ? 80 : tempMaxLineLength
  const hangingIndentPrefix = process.argv.length > 4 ? process.argv[4] : ""

  const raw = fs.readFileSync(file, "utf8")
  const out = wrap(raw, maxLineLength, hangingIndentPrefix)
  console.log(out)
} catch (e) {
  console.log(e)
  console.log("============================")
  console.log(helpMessage)
}
