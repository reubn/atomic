import Max7219 from './Max7219'

class Display {
  constructor(chainLength=1){
    // Initialise Controller
    this.max7219 = new Max7219('/dev/spidev0.0', chainLength)

    // Turn display on
    this.max7219.setPower(true)

    // Set medium intensity
    this.max7219.setIntensity(7)
  }

  display2DArray(twoDArray){
    const flattenedColumns = twoDArray.map(col => parseInt(col.join``, 2))

    flattenedColumns.forEach((data, index) => {
      // Register for which this data is applicable
      const register = (index % this.max7219.unitDimension) + 1

      // Position in the chain to which this data corresponds
      const chainPosition = Math.floor(index / this.max7219.unitDimension)

      // Write data
      this.max7219.write(register, data, chainPosition)
    })
  }

}

export default Display
