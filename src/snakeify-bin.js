#!/usr/bin/env node
const snakeify = require("./snakeify.js")

if (process.argv.length < 3) {
  console.log("The syntax is: snakeify <text>")
  process.exit(0)
}

console.log(snakeify(process.argv[2]))
