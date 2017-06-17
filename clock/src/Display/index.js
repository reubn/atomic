import Max7219 from './Max7219'

class Display {
  constructor(chainLength=1){
    // Initialise Controller
    this.max7219 = new Max7219('/dev/spidev0.0', chainLength)

    // Reset Display to predictable state
    this.reset()

    // Width
    this.width = this.max7219.unitDimension * chainLength

    // Height
    this.height = this.max7219.unitDimension
  }

  reset(){
    // Turn display on
    this.setPower(true)

    // Set medium intensity
    this.setIntensity(8)

    // Clear Display
    this.clear()
  }

  clear(){
    // Create blank array
    const blankArray = Array(this.max7219.chainLength * this.max7219.unitDimension).fill().map(() => Array(this.max7219.unitDimension).fill(false))

    // Display the blank array
    this.display2DArray(blankArray)
  }

  display2DArray(twoDArray){
    // Chunk the columns into 8s
    const chunks = twoDArray.reduce((ar, it, i) => {
      const ix = Math.floor(i / this.max7219.unitDimension)
      ar[ix] = !ar[ix] ? [it] : [...ar[ix], it]
      return ar
    }, [])

    // Rotate Each 8x8, and rejoin
    const rotated = chunks.reduce((array, chunk) => [...array, ...chunk.reverse().reduce((prev, next) => next.map((item, i) => [...(prev[i] || []), next[i]]), [])], []).reverse()

    // Convert the rows to hex values
    const flattenedRows = rotated.map(col => parseInt(col.map(p => (p ? 1 : 0)).join``, 2))

    flattenedRows.forEach((data, index) => {
      // Register for which this data is applicable
      const register = (index % this.max7219.unitDimension) + 1

      // Position in the chain to which this data corresponds
      const chainPosition = Math.floor(index / this.max7219.unitDimension)

      // Write data
      this.max7219.write(register, data, [chainPosition])
    })
  }

  setIntensity(...args){
    return this.max7219.setIntensity(...args)
  }

  setPower(...args){
    return this.max7219.setPower(...args)
  }

}

export default Display
export {default as renderText} from './renderText'
