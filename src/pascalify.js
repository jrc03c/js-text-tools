const camelify = require("./camelify")

function pascalify(text) {
  const out = camelify(text)
  return out[0].toUpperCase() + out.slice(1)
}

module.exports = pascalify
