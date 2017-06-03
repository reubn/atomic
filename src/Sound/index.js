import fs from 'fs'

import successPath from './sounds/success.pcm'
import failurePath from './sounds/failure.pcm'
import tapPath from './sounds/tap.pcm'
import alarmPath from './sounds/alarm.pcm'
import radiatePath from './sounds/radiate.pcm'

const defaultFormat = {
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
}

const successSound = () => ({format: {...defaultFormat, channels: 1}, stream: fs.createReadStream(successPath)})
const failureSound = () => ({format: {...defaultFormat, channels: 1}, stream: fs.createReadStream(failurePath)})
const tapSound = () => ({format: {...defaultFormat, channels: 1}, stream: fs.createReadStream(tapPath)})
const alarmSound = () => ({format: {...defaultFormat, channels: 2}, stream: fs.createReadStream(alarmPath)})
const radiateSound = () => ({format: {...defaultFormat, channels: 2}, stream: fs.createReadStream(radiatePath)})

export {
  successSound,
  failureSound,
  tapSound,
  alarmSound,
  radiateSound
}

export {default, end} from './Sound'

export {default as lame2desc} from './lame2desc'
export {default as tts} from './tts'
