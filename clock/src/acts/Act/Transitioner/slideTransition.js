export default (renderA, renderB) => (index, a=renderA(), b=renderB()) => {
  const boundedIndex = Math.max(0, Math.min(a.length, index))
  return [...a.slice(boundedIndex, a.length), ...b.slice(0, boundedIndex)]
}
