export default (o, l=!o) => ({
  0: [[l, l, l, l], [l, o, o, l], [l, l, l, l]],
  1: [[l, o, o, l], [l, l, l, l], [o, o, o, l]],
  2: [[l, o, l, l], [l, l, o, l], [l, l, o, l]],
  3: [[l, o, o, l], [l, l, o, l], [l, l, l, l]],
  4: [[l, l, l, o], [o, o, l, o], [l, l, l, l]],
  5: [[l, l, o, l], [l, l, o, l], [l, o, l, l]],
  6: [[l, l, l, l], [o, l, o, l], [o, l, l, l]],
  7: [[l, o, o, o], [l, o, o, o], [l, l, l, l]],
  8: [[l, l, l, l], [l, o, l, l], [l, l, l, l]],
  9: [[l, l, l, o], [l, o, l, o], [l, l, l, l]],
  ':': [[o, l, o, l]],
  ' ': [[o, o, o, o]]
})
