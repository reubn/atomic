import {PassThrough} from 'stream'

import StreamCache from 'stream-cache'
import multistream from 'multistream'


export default class ReplayableStream {
  constructor(stream){
    this.streamCache = new StreamCache()
    stream.pipe(this.streamCache)
  }

  normalise(){
    return this.streamCache.pipe(new PassThrough())
  }

  flow(){
    this.outStream = this.normalise()

    return this.outStream
  }

  loop(){
    this.continueLooping = true
    this.outStream = multistream(cb => cb(null, (this.continueLooping === true) ? this.normalise() : null))

    return this.outStream
  }

  cap(){
    this.continueLooping = false
    this.outStream.unpipe()
  }
}
