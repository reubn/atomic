import moment from 'moment'

import button, {press} from '../../button'
import {tapSound} from '../../Sound'

import {renderText} from '../../Display'

class ClockAct {
  constructor(){
    this.timer = null

    this.seconds = false

    // Flash Alternator
    this.flash = false
  }

  start({display, sound}){
    this.render(display)
    this.timer = setInterval(() => this.render(display), 500)
    // Button Events
    this.buttonHandler = () => {
      this.toggleSeconds()
      this.render(display)

      sound.play(tapSound)
    }
    button.on(press, this.buttonHandler)
  }

  end(){
    clearInterval(this.timer)
    button.removeListener(press, this.buttonHandler)
    this.seconds = false
    this.alternateEvenOdd = 0
  }

  toggleSeconds(){this.seconds = !this.seconds}

  render(display){
    const seconds = this.seconds ? `${this.flash ? ':' : ' '}ss` : ''
    display.display2DArray(renderText(moment().format(`h${this.flash ? ':' : ' '}mm${seconds}`), display.width, display.height, true))
    this.flash ^= 1
  }
}

export default ClockAct
