import button, {press} from '../button'
import clockAct from '../clockAct'
import {renderText} from '../Display'

import sound from './sound.wav'

class AlarmAct {
  constructor(alarm){
    this.alarm = alarm

    this.timer = null
    this.endHandle = null

    this.continuePlaying = false

    this.index = 0
  }

  start({display, player}, end){
    this.endHandle = end

    // Player
    this.continuePlaying = true
    player.play(sound)
    player.on('complete', () => this.continuePlaying && player.play(sound))

    // Display
    this.render(display)
    this.timer = setInterval(() => this.render(display), 500)

    // Button Events
    button.once(press, () => this.end())
  }
  end(fromDisplayManager=false){
    if(!fromDisplayManager) return this.endHandle(clockAct)

    clearInterval(this.timer)
    this.endHandle = null
    this.continuePlaying = false
  }

  render(display){
    display.setIntensity(this.index % 2 ? 16 : 1)
    display.display2DArray(renderText('alarm', display.width, display.height, this.index % 2))

    this.index++
  }
}

export default AlarmAct
