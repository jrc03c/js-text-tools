#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const wrap = require("./wrap.js")

const helpMessage = wrap(
  `
The syntax is:

  \x1b[1m\x1b[35mwrap <file> \x1b[2m<max-line-length> <output-file>\x1b[0m

The maximum line length is optional and defaults to 80 characters. Writing to an output file is also optional; if omitted, the results are just printed to the console. Use \`wrap --help\` to show this message again.
`,
  process.stdout.columns > 80 ? 80 : process.stdout.columns
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

  const outFile = (() => {
    try {
      return path.resolve(process.argv[4])
    } catch (e) {
      return undefined
    }
  })()

  const raw = fs.readFileSync(file, "utf8")
  const out = wrap(raw, maxLineLength)

  if (outFile) {
    fs.writeFileSync(outFile, out, "utf8")
  } else {
    console.log(out)
  }
} catch (e) {
  console.log(e)
  console.log("============================")
  console.log(helpMessage)
}
