function indent(text, chars) {
  chars = chars || ""

  return text
    .split("\n")
    .map(line => {
      if (line.trim().length > 0) {
        return chars + line
      } else {
        return line
      }
    })
    .join("\n")
}

module.exports = indent
