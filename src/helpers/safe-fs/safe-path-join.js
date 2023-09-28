function safePathJoin() {
  const parts = Array.from(arguments)

  return parts
    .map((p, i) => {
      p = p.replaceAll(/\/+/g, "/")

      if (i > 0) {
        p = p.replace(/^\//g, "")
      }

      p = p.replace(/\/$/g, "")
      return p.trim()
    })
    .filter(p => !!p)
    .join("/")
}

module.exports = safePathJoin
