#!/usr/bin/env node
const camelify = require("./camelify.js")

if (process.argv.length < 3) {
  console.log("The syntax is: camelify <text>")
  process.exit(0)
}

console.log(camelify(process.argv[2]))
