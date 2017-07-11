import moment from 'moment'

import button, {press} from '../../button'
import {tapSound} from '../../Sound'

import {renderText} from '../../Display'

import Act from '../Act'

class ClockAct extends Act {
  actWillMount(){
    // Flash Alternator
    this.flash = false

    // Seconds Mode
    this.seconds = false

    // Button Events
    button.on(press, this.onButtonPress, this)
  }

  onButtonPress(){
    // Invert Seconds Mode
    this.seconds ^= 1

    // Rerender for fluidity
    this.render()

    this.outputs.sound.play(tapSound)
  }


  actWillUnmount(){
    button.removeListener(press, this.onButtonPress, this)
  }

  render(){
    const seconds = this.seconds ? `${this.flash ? ':' : ' '}ss` : ''
    this.outputs.display.display2DArray(renderText(moment().format(`h${this.flash ? ':' : ' '}mm${seconds}`), this.outputs.display.width, this.outputs.display.height, true))
    this.flash ^= 1
  }
}

export default ClockAct
