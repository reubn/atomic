import button, {press} from '../../button'
import SummaryAct from '../Summary'
import {renderText} from '../../Display'
import {alarmSound, successSound} from '../../Sound'

class AlarmAct {
  constructor(alarm){
    this.alarm = alarm

    this.timer = null
    this.endHandle = null

    this.index = 0
  }

  start({display, sound}, end){
    this.endHandle = end

    // Sound
    const callToCancel = sound.loop(alarmSound)

    // Display
    display.setIntensity(16)
    this.render(display)
    this.timer = setInterval(() => this.render(display), 500)

    // Button Events
    button.once(press, () => this.onButtonPress(sound, callToCancel))
  }

  end(fromDisplayManager=false){
    if(!fromDisplayManager) return this.endHandle(new SummaryAct())

    clearInterval(this.timer)
    this.endHandle = null
  }

  async onButtonPress(sound, callToCancel){
    await callToCancel()
    await sound.play(successSound)

    this.end()
  }

  render(display){
    display.display2DArray(renderText('alarm', display.width, display.height, this.index % 2))

    this.index++
  }
}

export default AlarmAct
