import moment from 'moment'

import renderText from '../Display/renderText'

class UptimeView {
  constructor(){
    this.timer = null

    this.startTime = moment()
    this.alternateEvenOdd = 0
  }

  start(display){
    this.render(display)
    this.timer = setInterval(() => this.render(display), 500)
  }
  end(){
    clearInterval(this.timer)
    this.alternateEvenOdd = 0
  }

  render(display){
    const duration = moment.duration(moment().diff(this.startTime))

    display.display2DArray(renderText(`${duration.hours()}${(this.alternateEvenOdd % 2) ? ':' : ' '}${duration.minutes()}`, display.width, display.height, true))
    this.alternateEvenOdd++
  }
}

export default UptimeView
