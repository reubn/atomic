import moment from 'moment'

import renderText from '../Display/renderText'

class ClockAct {
  constructor(){
    this.timer = null

    this.alternateEvenOdd = 0
  }

  start({display}){
    this.render(display)
    this.timer = setInterval(() => this.render(display), 500)
  }
  end(){
    clearInterval(this.timer)
    this.alternateEvenOdd = 0
  }

  render(display){
    display.display2DArray(renderText(moment().format(`h${(this.alternateEvenOdd % 2) ? ':' : ' '}mm`), display.width, display.height, true))
    this.alternateEvenOdd++
  }
}

export default ClockAct
