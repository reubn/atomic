import EventEmitter from 'eventemitter3'
import Speaker from 'speaker'
import loudness from 'loudness'

import ReplayableStream from './ReplayableStream'

const end = Symbol('end')

export default class Sound extends EventEmitter {
  constructor(){
    super()

    this.volume = null

    this.loopStates = new Map()
  }

  async getVolume(){
    return this.volume !== null ? this.volume : new Promise((resolve, reject) => loudness.getVolume((err, volume) => {
      if(err) reject(err)

      this.volume = volume
      resolve(volume)
    }))
  }

  async setVolume(volume=100){
    if(await this.getVolume() === volume) return

    this.volume = volume
    return new Promise((resolve, reject) => loudness.setVolume(volume, err => (err ? reject(err) : resolve())))
  }

  async play({format, stream={}}, {volumeLevel=100}={}){
    if(!format) throw new Error('Format Required')
    if(!(stream instanceof ReplayableStream)) throw new Error('ReplayableStream Required')

    await this.setVolume(volumeLevel)

    const speaker = new Speaker(format)
    stream.flow().pipe(speaker)

    return new Promise(resolve => speaker.on('close', resolve))
  }

  loop({format, stream={}}, {volumeLevel=100}={}){
    if(!format) throw new Error('Format Required')
    if(!(stream instanceof ReplayableStream)) throw new Error('ReplayableStream Required')

    const speaker = new Speaker(format)

    this.setVolume(volumeLevel)
    .then(() => stream.loop().pipe(speaker))

    return async () => {
      stream.cap()
      speaker.end()

      return new Promise(resolve => speaker.on('close', resolve))
    }
  }
}

export {end}
