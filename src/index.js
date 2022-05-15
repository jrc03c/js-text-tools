const out = {
  camelify: require("./camelify.js"),
  indent: require("./indent.js"),
  kebabify: require("./kebabify.js"),
  snakeify: require("./snakeify.js"),
  unindent: require("./unindent.js"),

  dump() {
    Object.keys(out).forEach(key => {
      global[key] = out[key]

      if (typeof window !== "undefined") {
        window[key] = out[key]
      }
    })
  },
}

module.exports = out
