const out = {
  camelify: require("./camelify"),
  Corpus: require("./corpus"),
  indent: require("./indent"),
  kebabify: require("./kebabify"),
  parse: require("./parse"),
  pascalify: require("./pascalify"),
  snakeify: require("./snakeify"),
  stringify: require("./stringify"),
  unindent: require("./unindent"),
  wrap: require("./wrap"),

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
