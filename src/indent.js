function multiplyText(text, n) {
  let out = ""
  for (let i = 0; i < n; i++) out += text
  return out
}

function indent(text, n, char) {
  char = char || " "

  return text
    .split("\n")
    .map(line => {
      if (line.trim().length > 0) {
        return multiplyText(char, n) + line
      } else {
        return line
      }
    })
    .join("\n")
}

module.exports = indent
