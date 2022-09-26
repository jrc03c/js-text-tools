#!/usr/bin/env node
const fs = require("fs")
const indent = require("./indent.js")
const path = require("path")
const unindent = require("./unindent.js")
const wrap = require("./wrap.js")

import("chalk").then(lib => {
  const chalk = lib.default

  const helpMessage = wrap(
    indent(
      unindent(`
        The syntax is:
  
          ${chalk.blue.bold("wrap")} ${chalk.blue("[options] <file>")}
  
        Options include:

          ${chalk.yellow(
            "--output-file, -o"
          )} = the file in which to save the wrapped text; does not work with the --save option
  
          ${chalk.yellow(
            "--save, -s"
          )} = overwrite the contents of <file> with the wrapped text; overrides the --output-file option

          ${chalk.yellow(
            "[max-line-length]"
          )} = the maximum length of each line; defaults to 80 if unspecified
  
        Examples:
  
          ${chalk.dim(
            "# overwrite the contents of the file with its own content wrapped at 40 characters"
          )}
          wrap -s 40 somefile.txt
          
          ${chalk.dim(
            "# write the wrapped contents of a file out to another file (wrapped at the default of 80 characters)"
          )}
          wrap -o wrapped.txt somefile.txt
  
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

    const maxLineLength =
      parseInt(
        process.argv.find(v => {
          try {
            return !isNaN(parseInt(v))
          } catch (e) {
            return false
          }
        })
      ) || 80

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
})
