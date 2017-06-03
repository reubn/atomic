import EventEmitter from 'eventemitter3'
import streamToArray from 'stream-to-array'
import arrayToStream from 'stream-array'
import multistream from 'multistream'
import Speaker from 'speaker'
import loudness from 'loudness'

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

  async play(desc, {volumeLevel=100}={}){
    const {format, stream} = desc()
    if(!format) throw new Error('Format Required')
    if(!stream) throw new Error('Stream Required')

    await this.setVolume(volumeLevel)

    const speaker = new Speaker(format)
    stream.pipe(speaker)

    return new Promise(resolve => speaker.on('close', resolve))
  }

  loop(desc, {volumeLevel=100}={}){
    const {format, stream} = desc()
    if(!format) throw new Error('Format Required')
    if(!stream) throw new Error('Stream Required')

    const speaker = new Speaker(format)
    let continuePlaying = true
    let loopStream = null

    this.setVolume(volumeLevel)
    .then(() => streamToArray(stream))
    .then(arrayData => {
      loopStream = multistream(cb => cb(null, (continuePlaying === true) ? arrayToStream(arrayData) : null))
      loopStream.pipe(speaker)
    })

    return async () => {
      continuePlaying = false
      loopStream.unpipe()
      speaker.end()

      return new Promise(resolve => speaker.on('close', resolve))
    }
  }
}

export {end}
