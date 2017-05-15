import SPI from 'pi-spi'

// Register Addresses
const DECODEMODE = 0x9
const INTENSITY = 0xA
const SCANLIMIT = 0xB
const SHUTDOWN = 0xC
const DISPLAYTEST = 0xF
const NOOP = 0x0

const MAX_INTENSITY = 0xF

class Max7219 {
  constructor(device='/dev/spidev0.0', chainLength=1, unitDimension=8){
    // Initialise SPI device
    this.spi = SPI.initialize(device)

    this.chainLength = chainLength
    this.unitDimension = unitDimension

    // Use 8 digits
    this.writeForAll(SCANLIMIT, 0x7)

    // Matrix Mode
    this.writeForAll(DECODEMODE, 0x0)

    // Disable Test Mode
    this.writeForAll(DISPLAYTEST, 0x0)
  }

  writeForAll(register, data){
    // Write data, with all positions selected
    return this.write(register, data, Array(this.chainLength).fill().map((x, i) => i))
  }

  write(register, data, chainPositions=[0]){
    // Construct Array - 2 bytes per board.
    const byteArray =
      Array(this.chainLength * 2)
      .fill(0x0)
      .map((x, index) => {
        // If we're at the first byte (register) on a correct unit
        if(chainPositions.includes(index / 2)) return register

        // If we're at the second byte (data) on a correct unit
        if(chainPositions.includes((index - 1) / 2)) return data

        // Else, if its a first byte, add the NoOp register, or blank data
        return !(index % 2) ? NOOP : 0x0
      })

    // Create Buffer from byteArray
    const buffer = Buffer.from(byteArray)

    // Send Buffer
    this.spi.write(buffer, () => 0)
  }

  setIntensity(intensity){
    // Write Intensity, clamped by values
    this.writeForAll(INTENSITY, Math.min(MAX_INTENSITY, Math.max(0x0, intensity)))
  }

  setPower(on){
    // Turn display on or off
    this.writeForAll(SHUTDOWN, on ? 0x1 : 0x0)
  }
}

export default Max7219
