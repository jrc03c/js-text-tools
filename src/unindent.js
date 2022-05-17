function unindent(text) {
  const lines = text.split("\n")

  const indentations = lines
    .filter(line => line.trim().length > 0)
    .map(line => line.split("").findIndex(char => !char.match(/\s/g)))

  const minIndentation = Math.min(...indentations)
  return lines.map(line => line.substring(minIndentation)).join("\n")
}

module.exports = unindent
