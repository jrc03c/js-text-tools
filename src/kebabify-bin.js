#!/usr/bin/env node
const kebabify = require("./kebabify.js")

if (process.argv.length < 3) {
  console.log("The syntax is: kebabify <text>")
  process.exit(0)
}

console.log(kebabify(process.argv[2]))
