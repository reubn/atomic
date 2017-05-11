import font from './font'

export default (text, {width: displayWidth=8*4, height: displayHeight=8}={}) => {
  const setLetters = [...text].reduce((cols, char) => {
    if(!font[char]) return cols

    const shape = font[char]
    return !cols ? shape : [...cols, Array(shape[0].length).fill(0), ...shape]
  }, 0)

  const insertWidth = setLetters.length
  const insertHeight = setLetters[0].length

  const widthRemainder = displayWidth - insertWidth
  const heightRemainder = displayHeight - insertHeight

  const widthBefore = Math.floor(widthRemainder / 2)
  const widthAfter = Math.ceil(widthRemainder / 2)

  const heightBefore = Math.floor(heightRemainder / 2)
  const heightAfter = Math.ceil(heightRemainder / 2)

  const widthPaddingBefore = Array(widthBefore).fill().map(() => Array(displayHeight).fill(0))
  const widthPaddingAfter = Array(widthAfter).fill().map(() => Array(displayHeight).fill(0))

  const heightPaddingBefore = Array(heightBefore).fill(0)
  const heightPaddingAfter = Array(heightAfter).fill(0)

  return [...widthPaddingBefore, ...setLetters.map(col => [...heightPaddingBefore, ...col, ...heightPaddingAfter]), ...widthPaddingAfter]
}
