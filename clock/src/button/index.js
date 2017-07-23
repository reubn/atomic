import EventEmitter from 'eventemitter3'

import rpio from 'rpio'

const press = Symbol('press')
const release = Symbol('release')

class Button extends EventEmitter {
  constructor({toggle=15, led=13}={}){
    super()

    // Store pins
    this.toggle = toggle
    this.led = led

    // Unknown state
    this.state = null

    // Open switch pin, and poll for events
    rpio.open(toggle, rpio.INPUT, rpio.PULL_DOWN)
    rpio.poll(toggle, (...args) => this.pollCallback(...args))

    // Turn on LED
    rpio.open(led, rpio.OUTPUT, rpio.PULL_UP)
  }

  pollCallback(pin){
    // Invert high/low from pin to find new state
    const newState = !rpio.read(pin)

    // Dedup repeat events
    if(this.state === newState) return

    // Trigger change
    this.trigger(newState)
  }

  trigger(state=true){
    // Set internal state
    this.state = state

    // Emit event
    this.emit(this.state ? press : release)
  }
}

export default new Button()
export {press, release}
