function isANumberString(x) {
  x = x.trim()

  return !!(
    x.match(/^-?\d+(\.\d+)?$/g) ||
    x.match(/^-?\d+(\.\d+)?e-?\d+(\.\d+)?$/g) ||
    x.match(/^-?\.\d+$/g) ||
    x === "NaN"
  )
}

module.exports = isANumberString
