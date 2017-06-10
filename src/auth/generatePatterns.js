const generateSlice = height => {
  const number = Math.floor(Math.random() * (2 ** height))
  const bits = number.toString(2).padStart(height, 0).split('').map(b => b === '1')

  return bits.includes(true) ? bits : generateSlice(height)
}

export default (length=4, {width=4, height=4}={}) =>
  Array(length).fill().map(() => {
    const pattern = Array(width).fill().map(() => generateSlice(height))
    const number = parseInt(pattern.reduce((arr, slice) => [...arr, ...slice.map(x => (x ? '1' : '0'))], []).join(''), 2)

    console.log(number)
    return {number, pattern}
  })
