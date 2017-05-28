import moment from 'moment'

import button, {press} from '../button'
import clockAct from '../clockAct'
import {renderText} from '../Display'
import {tts, alarmSound, successSound} from '../Sound'

import weather from './weather'

class AlarmAct {
  constructor(alarm){
    this.alarm = alarm

    this.timer = null
    this.endHandle = null

    // Weather
    this.weatherPromise = weather()

    this.continuePlaying = false

    this.index = 0
  }

  start({display, sound}, end){
    this.endHandle = end

    // Sound
    this.continuePlaying = true
    sound.newSource(alarmSound)
    sound.on('close', () => this.continuePlaying && sound.newSource(alarmSound, 'local'))

    // Display
    display.setIntensity(16)
    this.render(display)
    this.timer = setInterval(() => this.render(display), 500)

    // Button Events
    button.once(press, () => this.onButtonPress(sound))
  }
  end(fromDisplayManager=false){
    if(!fromDisplayManager) return this.endHandle(clockAct)

    clearInterval(this.timer)
    this.endHandle = null
    this.continuePlaying = false
  }

  async onButtonPress(sound){
    this.continuePlaying = false

    const weatherSummary = await this.weatherPromise
    const ttsPath = await tts(`The time is ${moment().format('h:mm; [on] dddd [the] Do [of] MMMM')}. ${weatherSummary}`)

    await new Promise(resolve => {
      sound.newSource(successSound)
      sound.on('close', resolve)
    })

    new Promise(resolve => {
      sound.newSource(ttsPath, 'local')
      sound.on('close', resolve)
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
