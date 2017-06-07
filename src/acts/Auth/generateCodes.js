export default (length, {width=4, height=4}={}) => {
  const maxBits = (2 ** (width * height)) - 1

  return Array(length).fill().map(() => {
    const number = Math.floor(Math.random() * maxBits)
    const bits = number.toString(2).padStart(width * height, 0).split``

    const pattern = Array(width).fill().map((a, x) => Array(height).fill().map((b, y) => (bits[((x % width) * width) + (y % height)] === '1')))

    return {number, pattern, bits}
  })
}
