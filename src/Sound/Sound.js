import EventEmitter from 'eventemitter3'
import fs from 'fs'

import Speaker from 'speaker'
import {Reader as WavReader} from 'wav'
import Volume from 'pcm-volume'

import Omx from 'node-omxplayer'

const end = Symbol('end')

export default class Sound extends EventEmitter {
  constructor(){
    super()

    this.currentMode = null

    this.loopStates = new Set()
  }

  hasEnded(){
    this.currentMode = null
    this.emit(end)
  }

  async createEndPromise(){
    return new Promise(resolve => this.once(end, resolve))
  }

  async slowPlay(path, {volumeLevel}={}){
    if(this.currentMode) throw new Error('Player Busy')

    this.currentMode = 'omx'

    const omx = new Omx()
    omx.newSource(path, undefined, undefined, volumeLevel)
    omx.once('close', () => this.hasEnded())

    return this.createEndPromise()
  }

  async quickPlay(path, {volumeLevel=1}={}){
    if(this.currentMode) throw new Error('Player Busy')

    this.currentMode = 'speaker'

    const volume = new Volume(volumeLevel)
    const reader = new WavReader()

    // pipe the WAVE file to the Reader instance
    fs.createReadStream(path).pipe(reader)

    // the "format" event gets emitted at the end of the WAVE header
    reader.on('format', format => {
      // the WAVE header is stripped from the output of the reader
      const speaker = new Speaker(format)
      reader.pipe(volume)
      volume.pipe(speaker)

      this.hasEnded()
    })

    return this.createEndPromise()
  }

  slowLoop(path, {volumeLevel, symbol=Symbol(path)}={}){
    let hoistedResolve
    if(!this.loopStates.has(symbol)) this.loopStates.add(symbol)

    this.slowPlay(path, {volumeLevel})
    .then(() => (this.loopStates.has(symbol) ? this.slowLoop(path, {volumeLevel, symbol}) : hoistedResolve()))

    return async () => {
      const hoistPromise = new Promise(resolve => hoistedResolve = resolve)
      this.loopStates.delete(symbol)

      return hoistPromise
    }
  }
}

export {end}
