import Max7219 from './Max7219'

class Display {
  constructor(chainLength=1){
    // Initialise Controller
    this.max7219 = new Max7219('/dev/spidev0.0', chainLength)

    // Turn display on
    this.max7219.setPower(true)

    // Set low intensity
    this.max7219.setIntensity(1)

    // Clear Display
    this.clear()

    // Width
    this.width = this.max7219.unitDimension * chainLength

    // Height
    this.height = this.max7219.unitDimension
  }

  clear(){
    // Create blank array
    const blankArray = Array(this.max7219.chainLength * this.max7219.unitDimension).fill(0).map(() => Array(this.max7219.unitDimension).fill(0))

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
    const flattenedRows = rotated.map(col => parseInt(col.join``, 2))

    flattenedRows.forEach((data, index) => {
      // Register for which this data is applicable
      const register = (index % this.max7219.unitDimension) + 1

      // Position in the chain to which this data corresponds
      const chainPosition = Math.floor(index / this.max7219.unitDimension)

      // Write data
      this.max7219.write(register, data, [chainPosition])
    })
  }

}

export default Display
