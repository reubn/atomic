import EventEmitter from 'eventemitter3'

import rpio from 'rpio'

const press = Symbol('press')
const release = Symbol('release')

class Button extends EventEmitter {
  constructor({toggle=15, led=13}={}){
    super()

    this.toggle = toggle
    this.led = led

    this.state = null

    rpio.open(toggle, rpio.INPUT, rpio.PULL_DOWN)
    rpio.poll(toggle, (...args) => this.pollCallback(...args))

    rpio.open(led, rpio.OUTPUT, rpio.PULL_UP)
  }

  pollCallback(pin){
    const newState = !rpio.read(pin)
    if(this.state === newState) return

    this.state = newState
    this.emit(this.state ? press : release)
  }
}

export default new Button()
export {press, release}
