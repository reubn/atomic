// import Player from 'aplay'
//
// import displayManager from '../displayManager'
// import clockView from '../clockView'
//
// import AlarmView from './View'
// import sound from './sound.wav'
//
// import button, {press} from '../button'
//
// const alarmView = new AlarmView(clockView)
// const alarmPlayer = new Player()
//
// export default alarm => {
//   displayManager.connect(alarmView)
//
//   let continuePlaying = true
//   alarmPlayer.play(sound)
//   alarmPlayer.on('complete', () => continuePlaying && alarmPlayer.play(sound))
//
//   // setTimeout(() => {
//   //   alarmView.end()
//   //   continuePlaying = false
//   // }, 10000)
//
//   button.on(press, () => {
//     alarmView.end()
//     continuePlaying = false
//   })
// }
import button, {press} from '../button'
import clockAct from '../clockAct'
import renderText from '../Display/renderText'

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
