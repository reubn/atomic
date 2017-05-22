import Player from 'aplay'

import displayManager from '../displayManager'
import clockView from '../clockView'

import AlarmView from './View'
import sound from './sound.wav'

import button, {press} from '../button'

const alarmView = new AlarmView(clockView)
const alarmPlayer = new Player()

export default alarm => {
  displayManager.connect(alarmView)

  let continuePlaying = true
  alarmPlayer.play(sound)
  alarmPlayer.on('complete', () => continuePlaying && alarmPlayer.play(sound))

  // setTimeout(() => {
  //   alarmView.end()
  //   continuePlaying = false
  // }, 10000)

  button.on(press, () => {
    alarmView.end()
    continuePlaying = false
  })
}
