import button, {press} from '../../button'
import {defaultAct} from '../../manager'
import {renderText} from '../../Display'
import {radiateSound, successSound} from '../../Sound'

import Act from '../Act'
import SummaryAct from '../Summary'

class AlarmAct extends Act {
  constructor(alarm){
    super()
    this.alarm = alarm
  }

  actWillMount(){
    // Sound
    this.callToCancelLoop = this.manager.sound.loop(radiateSound)

    // Display
    this.manager.display.setIntensity(16)

    // Flash Alternator
    this.flash = false

    // Button Events
    button.once(press, () => this.onButtonPress())

    // Create SummaryAct ahead of time, to allow time for data fetching
    if(this.alarm.summary) this.summaryAct = new SummaryAct()
  }

  async onButtonPress(){
    await this.callToCancelLoop()
    await this.manager.sound.play(successSound)

    this.transitionTo(this.alarm.summary ? this.summaryAct : defaultAct)
  }

  render(){
    this.manager.display.display2DArray(renderText(this.alarm.name, this.manager.display.width, this.manager.display.height, this.flash ^= 1))
  }
}

export default AlarmAct
