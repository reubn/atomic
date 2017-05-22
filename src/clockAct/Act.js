import moment from 'moment'

import button, {press} from '../button'

import renderText from '../Display/renderText'

class ClockAct {
  constructor(){
    this.timer = null

    this.seconds = false
    this.alternateEvenOdd = 0
  }

  start({display}){
    this.render(display)
    this.timer = setInterval(() => this.render(display), 500)

    // Button Events
    this.buttonHandler = () => this.toggleSeconds()
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
    const seconds = this.seconds ? `${(this.alternateEvenOdd % 2) ? ':' : ' '}ss` : ''
    display.display2DArray(renderText(moment().format(`h${(this.alternateEvenOdd % 2) ? ':' : ' '}mm${seconds}`), display.width, display.height, true))
    this.alternateEvenOdd++
  }
}

export default ClockAct
