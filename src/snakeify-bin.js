#!/usr/bin/env node
const { execSync } = require("node:child_process")
const color = require("@jrc03c/bash-colors")
const snakeify = require("./snakeify")

const { bright } = color.fx
const { magenta, yellow } = color.fg

if (process.argv.length < 3) {
  console.log(`\n  The syntax is: ${bright(magenta("snakeify <text>"))}\n`)
  process.exit(0)
}

const out = snakeify(process.argv[2])
console.log(out)

try {
  execSync(`echo "${out}" | xsel -b`, { encoding: "utf8" })
} catch (e) {
  console.log(
    yellow(
      "NOTE: This tool can copy the resulting text to the clipboard automatically if you have `xsel` installed!"
    )
  )
}
