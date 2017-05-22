import EventEmitter from 'events'

import rpio from 'rpio'

const press = Symbol('press')
const release = Symbol('release')

class Button extends EventEmitter {
  constructor(pin){
    super()

    this.pin = pin

    this.state = null

    rpio.open(pin, rpio.INPUT, rpio.PULL_DOWN)
    rpio.poll(pin, (...args) => this.pollCallback(...args))
  }

  pollCallback(pin){
    const newState = !rpio.read(pin)
    if(this.state === newState) return

    this.state = newState
    this.emit(this.state ? press : release)
  }
}

export default new Button(15)
export {press, release}
