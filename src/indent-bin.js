#!/usr/bin/env node
const color = require("@jrc03c/bash-colors")
const fs = require("node:fs")
const indent = require("./indent")
const path = require("node:path")
const unindent = require("./unindent")
const wrap = require("./wrap")

const { bright } = color.fx
const { cyan, magenta } = color.fg

const helpMessage = wrap(
  indent(
    unindent(`
      The syntax is:

        ${bright(magenta("indent <file> <chars>"))}

      Example:

        ${cyan('indent somefile.txt " >> "')}

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
