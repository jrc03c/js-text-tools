#!/usr/bin/env node
const color = require("@jrc03c/bash-colors")
const snakeify = require("./snakeify.js")

const { bright } = color.fx
const { magenta } = color.fg

if (process.argv.length < 3) {
  console.log(`\n  The syntax is: ${bright(magenta("snakeify <text>"))}\n`)
  process.exit(0)
}

console.log(snakeify(process.argv[2]))
