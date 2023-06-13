#!/usr/bin/env node
const color = require("@jrc03c/bash-colors")
const fs = require("node:fs")
const indent = require("./indent")
const path = require("node:path")
const unindent = require("./unindent")
const wrap = require("./wrap")

const { bright, dim } = color.fx
const { cyan, magenta, yellow } = color.fg

const helpMessage = wrap(
  indent(
    unindent(`
        The syntax is:
  
          ${bright(magenta("wrap [options] <file>"))}
  
        Options include:

          ${yellow(
            "--output-file, -o"
          )} = the file in which to save the wrapped text; does not work with the --save option; if not used, output is printed to stdout
  
          ${yellow(
            "--save, -s"
          )} = overwrite the contents of <file> with the wrapped text; overrides the --output-file option

          ${yellow(
            "--max-line-length, -m"
          )} = the maximum length of each line; defaults to 80 if unspecified
  
        Examples:
  
          ${dim(
            "# overwrite the contents of the file with its own content wrapped at 40 characters"
          )}
          ${cyan("wrap -m 40 -s somefile.txt")}
          
          ${dim(
            "# write the wrapped contents of a file out to another file (wrapped at the default of 80 characters)"
          )}
          ${cyan("wrap -o wrapped.txt somefile.txt")}
  
        The maximum line length is optional and defaults to the minimum of 80 characters. Use \`wrap --help\` to show this message again.
      `),
    "  "
  ),
  Math.min(process.stdout.columns, 80),
  [/^\s*#/g]
)

try {
  if (process.argv.length < 3) {
    console.log(helpMessage)
    process.exit()
  }

  if (
    process.argv.indexOf("--help") > -1 ||
    process.argv.indexOf("help") > -1
  ) {
    console.log(helpMessage)
    process.exit()
  }

  const file = path.resolve(process.argv.at(-1))

  const shouldSave =
    process.argv.indexOf("-s") > -1 ||
    process.argv.indexOf("--save") > -1 ||
    process.argv.indexOf("-o") > -1 ||
    process.argv.indexOf("--output-file") > -1

  const newFile = (() => {
    const index = Math.max(
      process.argv.indexOf("-o"),
      process.argv.indexOf("--output-file")
    )

    if (index > -1) {
      return path.resolve(process.argv[index + 1])
    } else {
      return file
    }
  })()

  const maxLineLength = (() => {
    const index1 = process.argv.indexOf("-m")

    if (index1 > -1) {
      return parseInt(process.argv[index1 + 1])
    }

    const index2 = process.argv.findIndex(a => a.includes("--max-line-length"))

    if (index2 > -1) {
      return parseInt(process.argv[index2].split("=")[1])
    }

    return 80
  })()

  const raw = fs.readFileSync(file, "utf8")
  const out = wrap(raw, maxLineLength)

  if (shouldSave) {
    fs.writeFileSync(newFile, out, "utf8")
  } else {
    console.log(out)
  }
} catch (e) {
  console.log(e)
  console.log("============================")
  console.log(helpMessage)
}
