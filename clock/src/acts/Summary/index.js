import moment from 'moment'

import ClockAct from '../Clock'
import {renderText} from '../../Display'
import {tts, failureSound} from '../../Sound'

import weather from './weather'

import Act from '../Act'

class SummaryAct extends Act {
  constructor(){
    super()

    // Weather
    this.weatherPromise = weather()
  }

  async actWillMount(){
    const {displayTemp, weatherSummary} = await this.weatherPromise

    this.displayTemp = displayTemp
    const ttsStreamAndFormat = await tts({text: `The time is ${moment().format('h:mm; [on] dddd [the] Do [of] MMMM')}. ${weatherSummary}`, lang: 'en-au'})

    if(ttsStreamAndFormat) await this.manager.sound.play(ttsStreamAndFormat)
    else await this.manager.sound.play(failureSound)

    this.transitionTo(new ClockAct())
  }

  render(){
    this.manager.display.display2DArray(renderText(`${this.displayTemp !== null ? this.displayTemp : '??'}°c`, this.manager.display.width, this.manager.display.height, true))
  }
}

export default SummaryAct
