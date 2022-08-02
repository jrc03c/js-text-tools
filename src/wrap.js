function wrap(raw, maxLineLength, hangingIndentPrefix) {
  if (typeof raw !== "string") {
    throw new Error(
      "The first argument to the `wrap` function must be a string!"
    )
  }

  if (typeof maxLineLength === "undefined" || maxLineLength === null) {
    if (
      typeof process !== "undefined" &&
      typeof process.stdout !== "undefined" &&
      typeof process.stdout.columns === "number"
    ) {
      maxLineLength = process.stdout.columns > 80 ? 80 : process.stdout.columns
    } else {
      maxLineLength = 80
    }
  }

  if (isNaN(maxLineLength) || typeof maxLineLength !== "number") {
    throw new Error(
      "The second argument to the `wrap` function must be undefined, null, or an integer!"
    )
  }

  if (typeof hangingIndentPrefix === "undefined") {
    hangingIndentPrefix = ""
  }

  if (typeof hangingIndentPrefix !== "string") {
    throw new Error(
      "The third argument to the `wrap` function must be undefined, null, or a string!"
    )
  }

  const out = []

  raw.split("\n").forEach(line => {
    if (line.trim().length === 0) {
      return out.push("")
    }

    const indentation = line.split(/[^\s]/g)[0]
    const words = line.replace(indentation, "").split(" ")
    let temp = indentation

    words.forEach(word => {
      const newLine = temp + (temp.trim().length > 0 ? " " : "") + word

      if (newLine.length > maxLineLength) {
        out.push(temp)
        temp = indentation + hangingIndentPrefix + word
      } else {
        temp = newLine
      }
    })

    if (temp.length > 0) {
      out.push(temp)
    }
  })

  return out.join("\n")
}

module.exports = wrap
