import {PassThrough} from 'stream'

import StreamCache from 'stream-cache'
import multistream from 'multistream'

// Replayable Stream - can be piped out of multiple times and looped over
export default class ReplayableStream {
  constructor(stream){
    // Init Loop Set
    this.loopSet = new Set()

    // Use StreamCache as underlying store
    this.streamCache = new StreamCache()

    // Pipe unreplayable stream into store
    stream.pipe(this.streamCache)
  }

  flow(){
    // Convert pseudo stream into real strean
    return this.streamCache.pipe(new PassThrough())
  }

  loop(){
    // Create Symbol
    const symbol = Symbol('Loop')

    // Add loop to set
    this.loopSet.add(symbol)

    // As long as we are looping, repeatedly pipe out stream
    const stream = multistream(cb => cb(null, this.loopSet.has(symbol) ? this.flow() : null))

    // Add loopKey to stream
    stream.loopKey = symbol

    return stream
  }

  cap(stream){
    // Extract loopKey
    const {loopKey} = stream

    // Stop looping
    this.loopSet.delete(loopKey)

    // End pipe
    stream.unpipe()
  }
}
