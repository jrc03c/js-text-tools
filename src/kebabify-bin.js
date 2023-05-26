#!/usr/bin/env node
const color = require("@jrc03c/bash-colors")
const kebabify = require("./kebabify.js")

const { bright } = color.fx
const { magenta } = color.fg

if (process.argv.length < 3) {
  console.log(`\n  The syntax is: ${bright(magenta("kebabify <text>"))}\n`)
  process.exit(0)
}

console.log(kebabify(process.argv[2]))
