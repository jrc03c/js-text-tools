const out = {
  camelify: require("./camelify.js"),
  indent: require("./indent.js"),
  kebabify: require("./kebabify.js"),
  snakeify: require("./snakeify.js"),
  unindent: require("./unindent.js"),
  wrap: require("./wrap.js"),

  dump() {
    Object.keys(out).forEach(key => {
      if (typeof global !== "undefined") {
        global[key] = out[key]
      }

      if (typeof window !== "undefined") {
        window[key] = out[key]
      }
    })
  },
}

if (typeof module !== "undefined") {
  module.exports = out
}

if (typeof window !== "undefined") {
  window.JSTextTools = out
}
