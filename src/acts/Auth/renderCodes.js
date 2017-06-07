export default (code, displayWidth, displayHeight, contrastMode=false) => {
  const setPatterns = code.reduce((cols, {pattern}) => {
    const blankVertical = Array(pattern[0].length + 4).fill().map((_, i, {length}) => (!i || i === length - 1) ? contrastMode : false)
    const altVertical = Array(pattern[0].length + 4).fill(contrastMode)

    return [...cols, altVertical, blankVertical, ...pattern.map(small => [contrastMode, false, ...small, false, contrastMode]), blankVertical, altVertical]
  }, [])

  const insertWidth = setPatterns.length
  const insertHeight = setPatterns[0].length

  const widthRemainder = displayWidth - insertWidth
  const heightRemainder = displayHeight - insertHeight

  const widthBefore = Math.floor(widthRemainder / 2)
  const widthAfter = Math.ceil(widthRemainder / 2)

  const heightBefore = Math.floor(heightRemainder / 2)
  const heightAfter = Math.ceil(heightRemainder / 2)

  const widthPaddingBefore = Array(widthBefore).fill().map(() => Array(displayHeight).fill(contrastMode))
  const widthPaddingAfter = Array(widthAfter).fill().map(() => Array(displayHeight).fill(contrastMode))

  const heightPaddingBefore = Array(heightBefore).fill(contrastMode)
  const heightPaddingAfter = Array(heightAfter).fill(contrastMode)

  return [...widthPaddingBefore, ...setPatterns.map(col => [...heightPaddingBefore, ...col, ...heightPaddingAfter]), ...widthPaddingAfter]
}
