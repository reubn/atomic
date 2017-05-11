import SPI from 'pi-spi'

const DECODEMODE = 0x9
const INTENSITY = 0xA
const SCANLIMIT = 0xB
const SHUTDOWN = 0xC
const DISPLAYTEST = 0xF
const NOOP = 0x0


// Max Intensity
const MAX_INTENSITY = 0xF

class Max7219 {
  static unitDimension = 8

  constructor(device='/dev/spidev0.0', chainLength=1){
    // Initialise SPI device
    this.spi = SPI.initialize(device)

    this.chainLength = chainLength

    // Use 8 digits
    this.write(SCANLIMIT, 0x7)

    // Matrix Mode
    this.write(DECODEMODE, 0x0)

    // Disable Test Mode
    this.write(DISPLAYTEST, 0x0)
  }

  write(register, data, chainPosition=0){
    // Construct Array - 2 bytes per board.
    const byteArray =
      Array(this.chainLength * 2)
      .fill(0x0)
      .map((x, index) => {
        // If we're at the first byte (register) of the correct board
        if(index === chainPosition * 2) return register

        // If we're at the second byte (data) of the correct board
        if(index === (chainPosition * 2) + 1) return data

        // Else, if its a first byte, add the NoOp register, or blank data
        return (index % 2) ? NOOP : 0x0
      })

    // Create Buffer from byteArray
    const buffer = Buffer.from(byteArray)

    // Send Buffer
    this.spi.write(buffer, () => console.log('Wrote', buffer.toString('hex'), 'END'))
  }

  setIntensity(intensity){
    // Write Intensity, clamped by values
    this.write(INTENSITY, Math.min(MAX_INTENSITY, Math.max(0x0, intensity)))
  }

  setPower(on){
    // Turn display on or off
    this.write(SHUTDOWN, on ? 0x1 : 0x0)
  }
}

export default Max7219
