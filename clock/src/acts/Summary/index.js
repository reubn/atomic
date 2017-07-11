import moment from 'moment'

import ClockAct from '../Clock'
import {renderText} from '../../Display'
import {tts, failureSound} from '../../Sound'

import weather from './weather'

import Act from '../Act'

class SummaryAct extends Act {
  async actWillMount(){
    // Weather
    this.weatherPromise = weather()

    const {displayTemp, weatherSummary} = await this.weatherPromise

    this.displayTemp = displayTemp
    const ttsStreamAndFormat = await tts({text: `The time is ${moment().format('h:mm; [on] dddd [the] Do [of] MMMM')}. ${weatherSummary}`, lang: 'en-au'})

    if(ttsStreamAndFormat) await this.outputs.sound.play(ttsStreamAndFormat)
    else await this.outputs.sound.play(failureSound)

    this.transitionTo(new ClockAct())
  }

  render(){
    this.outputs.display.display2DArray(renderText(`${this.displayTemp !== null ? this.displayTemp : '??'}°c`, this.outputs.display.width, this.outputs.display.height, true))
  }
}

export default SummaryAct
