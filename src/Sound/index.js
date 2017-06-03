import fs from 'fs'

import ReplayableStream from './ReplayableStream'

import successPath from './sounds/success.pcm'
import failurePath from './sounds/failure.pcm'
import tapPath from './sounds/tap.pcm'
import alarmPath from './sounds/alarm.pcm'
import radiatePath from './sounds/radiate.pcm'

const defaultFormat = {
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
}

const successSound = {format: {...defaultFormat, channels: 1}, stream: new ReplayableStream(fs.createReadStream(successPath))}
const failureSound = {format: {...defaultFormat, channels: 1}, stream: new ReplayableStream(fs.createReadStream(failurePath))}
const tapSound = {format: {...defaultFormat, channels: 1}, stream: new ReplayableStream(fs.createReadStream(tapPath))}
const alarmSound = {format: {...defaultFormat, channels: 2}, stream: new ReplayableStream(fs.createReadStream(alarmPath))}
const radiateSound = {format: {...defaultFormat, channels: 2}, stream: new ReplayableStream(fs.createReadStream(radiatePath))}

export {
  successSound,
  failureSound,
  tapSound,
  alarmSound,
  radiateSound
}

export {default, end} from './Sound'

export {ReplayableStream}

export {default as lame2desc} from './lame2desc'
export {default as tts} from './tts'
