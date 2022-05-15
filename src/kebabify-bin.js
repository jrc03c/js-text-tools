#!/usr/bin/env node
const kebabify = require("./kebabify.js")

if (process.argv.length < 3) {
  console.log("The syntax is: \x1b[1m\x1b[35kebabify <text>\x1b[0m")
  process.exit(0)
}

console.log(kebabify(process.argv[2]))
