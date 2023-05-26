#!/usr/bin/env node
const color = require("@jrc03c/bash-colors")
const fs = require("fs")
const indent = require("./indent.js")
const path = require("path")
const unindent = require("./unindent.js")
const wrap = require("./wrap.js")

const { bright } = color.fx
const { cyan, magenta } = color.fg

const helpMessage = wrap(
  indent(
    unindent(`
      The syntax is:

        ${bright(magenta("unindent <file>"))}

      Example:

        ${cyan("unindent somefile.txt")}

      Use \`unindent --help\` to show this message again.
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
  const raw = fs.readFileSync(file, "utf8")
  const out = unindent(raw)
  console.log(out)
} catch (e) {
  console.log(e)
  console.log("============================")
  console.log(helpMessage)
}
