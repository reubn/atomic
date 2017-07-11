import button, {press} from '../../button'
import SummaryAct from '../Summary'
import {renderText} from '../../Display'
import {radiateSound, successSound} from '../../Sound'

import Act from '../Act'

class AlarmAct extends Act {
  constructor(alarm){
    super()
    this.alarm = alarm
  }

  actWillMount(){
    // Sound
    this.callToCancelLoop = this.outputs.sound.loop(radiateSound)

    // Display
    this.outputs.display.setIntensity(16)

    // Flash Alternator
    this.flash = false

    // Button Events
    button.once(press, () => this.onButtonPress())

    // Create SummaryAct ahead of time, to allow time for data fetching
    this.summaryAct = new SummaryAct()
  }

  async onButtonPress(){
    await this.callToCancelLoop()
    await this.outputs.sound.play(successSound)

    this.transitionTo(this.summaryAct)
  }

  render(){
    this.outputs.display.display2DArray(renderText(this.alarm.name, this.outputs.display.width, this.outputs.display.height, this.flash ^= 1))
  }
}

export default AlarmAct
