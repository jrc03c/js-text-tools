#!/usr/bin/env node
const color = require("@jrc03c/bash-colors")
const camelify = require("./camelify.js")

const { bright } = color.fx
const { magenta } = color.fg

if (process.argv.length < 3) {
  console.log(`\n  The syntax is: ${bright(magenta("camelify <text>"))}\n`)
  process.exit(0)
}

console.log(camelify(process.argv[2]))
