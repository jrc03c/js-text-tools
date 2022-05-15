#!/usr/bin/env node
const camelify = require("./camelify.js")

if (process.argv.length < 3) {
  console.log("The syntax is: \x1b[1m\x1b[35camelify <text>\x1b[0m")
  process.exit(0)
}

console.log(camelify(process.argv[2]))
