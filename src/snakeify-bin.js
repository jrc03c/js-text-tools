#!/usr/bin/env node
const snakeify = require("./snakeify.js")

if (process.argv.length < 3) {
  console.log("The syntax is: \x1b[1m\x1b[35snakeify <text>\x1b[0m")
  process.exit(0)
}

console.log(snakeify(process.argv[2]))
