import button, {press} from '../../button'
import SummaryAct from '../Summary'
import {renderText} from '../../Display'
import {alarmSound, successSound} from '../../Sound'

class AlarmAct {
  constructor(alarm){
    this.alarm = alarm

    this.timer = null
    this.endHandle = null

    this.continuePlaying = false

    this.index = 0
  }

  start({display, sound}, end){
    this.endHandle = end

    // Sound
    this.continuePlaying = true
    sound.newSource(alarmSound)

    const closeHandler = () => (this.continuePlaying ? sound.newSource(alarmSound) : sound.removeListener('close', closeHandler))
    sound.on('close', closeHandler)

    // Display
    display.setIntensity(16)
    this.render(display)
    this.timer = setInterval(() => this.render(display), 500)

    // Button Events
    button.once(press, () => this.onButtonPress(sound))
  }

  end(fromDisplayManager=false){
    if(!fromDisplayManager) return this.endHandle(new SummaryAct())

    clearInterval(this.timer)
    this.endHandle = null
    this.continuePlaying = false
  }

  onButtonPress(sound){
    this.continuePlaying = false

    new Promise(resolve => {
      sound.newSource(successSound)
      sound.once('close', resolve)
    })
    .then(() => this.end())
    .catch(err => console.error(err))
  }

  render(display){
    display.display2DArray(renderText('alarm', display.width, display.height, this.index % 2))

    this.index++
  }
}

export default AlarmAct
