import moment from 'moment'

import button, {press} from '../../button'
import {tapSound} from '../../Sound'

import {renderText} from '../../Display'

import Act from '../Act'
import Transitioner, {slide} from '../Act/Transitioner'

class ClockAct extends Act {
  actWillMount(){
    // Flash Alternator
    this.flash = false

    // Transitions
    this.transitioner = new Transitioner({
      screens: [() => this.minutesRender(), () => this.secondsRender(), () => this.dateRender(), () => this.weekRender()],
      transitionFunction: slide,
      transitionLength: this.manager.display.width,

      // Speed up transition
      transitionStartHook: () => this._setFrameRate(270),

      // Return to normal frame rate
      transitionEndHook: () => this._setFrameRate()
    })

    // Button Events
    button.on(press, this.onButtonPress, this)
  }

  onButtonPress(){
    // Trigger slide
    this.transitioner.next()

    // Rerender for fluidity
    this.render()

    // Play tap sound
    this.manager.sound.play(tapSound)
  }

  actWillUnmount(){
    button.removeListener(press, this.onButtonPress, this)
  }

  minutesRender(){
    return renderText(moment().format(`h${this.flash ? ':' : ' '}mm`), this.manager.display.width, this.manager.display.height, true)
  }

  secondsRender(){
    return renderText(moment().format(`h${this.flash ? ':' : ' '}mm${this.flash ? ':' : ' '}ss`), this.manager.display.width, this.manager.display.height, true)
  }

  dateRender(){
    return renderText(moment().format(`D${this.flash ? '.' : ' '}M${this.flash ? '.' : ' '}YY`), this.manager.display.width, this.manager.display.height, true)
  }

  weekRender(){
    return renderText(moment().format(`ddd D${this.flash ? '.' : ' '}`), this.manager.display.width, this.manager.display.height, true, 1)
  }

  minuteProgressRender(){
    const seconds = moment().seconds() % 30
    const paddingSlice = Array(this.manager.display.height).fill(true)
    const countingSlice = [true, true, false, true, true, false, true, true]

    return Array(this.manager.display.width).fill().map((_, index) => (index < 1 || index > 30 || index > seconds + 1) ? paddingSlice : countingSlice)
  }

  render(){
    this.manager.display.display2DArray(this.transitioner.render())

    // Invert flash value
    this.flash ^= 1
  }
}

export default ClockAct
