const hash = require("./hash")

async function shortHash(x, n) {
  n = n || 32
  return (await hash(x)).slice(0, n)
}

module.exports = shortHash
