import font from './font'

export default (text, displayWidth, displayHeight, contrastMode=false, horizontalShift=0, verticalShift=0) => {
  // Generate contrasted font
  const contrastedFont = font(contrastMode)

  const plottedChars = [...text].reduce((cols, char) => {
    // If we're missing char, try lowercase, or else display `?`
    const shape = contrastedFont[char] || contrastedFont[char.toLowerCase()] || contrastedFont['?']

    // Join letters together
    return !cols ? shape : [...cols, Array(shape[0].length).fill(contrastMode), ...shape]
  }, null)

  // Text bounding box dimensions
  const textWidth = plottedChars.length
  const textHeight = plottedChars[0].length

  // Horizontal and vertical remainders: to make up to dimensions of the display
  const widthRemainder = displayWidth - textWidth
  const heightRemainder = displayHeight - textHeight

  // Split remainders into before and after, and carry out any adjustment shifts
  const widthBefore = Math.floor(widthRemainder / 2) + horizontalShift
  const widthAfter = Math.ceil(widthRemainder / 2) - horizontalShift

  const heightBefore = Math.floor(heightRemainder / 2) + verticalShift
  const heightAfter = Math.ceil(heightRemainder / 2) - verticalShift

  // Create arrays to pad up to display dimensions, fill with contrast
  const widthPaddingBefore = Array(widthBefore).fill().map(() => Array(displayHeight).fill(contrastMode))
  const widthPaddingAfter = Array(widthAfter).fill().map(() => Array(displayHeight).fill(contrastMode))

  const heightPaddingBefore = Array(heightBefore).fill(contrastMode)
  const heightPaddingAfter = Array(heightAfter).fill(contrastMode)

  // Combine padding and text
  return [...widthPaddingBefore, ...plottedChars.map(col => [...heightPaddingBefore, ...col, ...heightPaddingAfter]), ...widthPaddingAfter]
}
