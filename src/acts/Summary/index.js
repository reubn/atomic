import moment from 'moment'

import clockAct from '../clock'
import {renderText} from '../../Display'
import {tts, failureSound} from '../../Sound'

import weather from './weather'

class SummaryAct {
  constructor(){
    // Weather
    this.weatherPromise = weather()

    this.displayTemp = null

    this.timer = null
    this.endHandle = null
  }

  async start({display, sound}, end){
    this.endHandle = end

    // Display
    this.render(display)
    this.timer = setInterval(() => this.render(display), 500)

    const {displayTemp, weatherSummary} = await this.weatherPromise

    this.displayTemp = displayTemp
    const ttsStreamAndFormat = await tts({text: `The time is ${moment().format('h:mm; [on] dddd [the] Do [of] MMMM')}. ${weatherSummary}`, lang: 'en-au'})

    if(ttsStreamAndFormat) await sound.play(ttsStreamAndFormat)
    else await sound.play(failureSound)
    this.end()
  }

  end(fromDisplayManager=false){
    if(!fromDisplayManager) return this.endHandle(clockAct)

    clearInterval(this.timer)
    this.endHandle = null
    this.displayTemp = null
  }

  render(display){
    display.display2DArray(renderText(`${this.displayTemp !== null ? this.displayTemp : '??'}°c`, display.width, display.height, true))
  }
}

export default SummaryAct
