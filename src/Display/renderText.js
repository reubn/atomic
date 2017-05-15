import font from './font'

export default (text, displayWidth, displayHeight, contrastMode=false) => {
  const contrastedFont = font(contrastMode)

  const setLetters = [...text].reduce((cols, char) => {
    if(!contrastedFont[char]) return cols

    const shape = contrastedFont[char]
    return !cols ? shape : [...cols, Array(shape[0].length).fill(contrastMode), ...shape]
  }, null)

  const insertWidth = setLetters.length
  const insertHeight = setLetters[0].length

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

  return [...widthPaddingBefore, ...setLetters.map(col => [...heightPaddingBefore, ...col, ...heightPaddingAfter]), ...widthPaddingAfter]
}
