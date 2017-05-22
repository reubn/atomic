import Player from 'aplay'

import Display from '../Display'

class Manager {
  constructor({player=[], display=[]}){
    this.currentAct = null

    this.player = new Player(...player)
    this.display = new Display(...display)
  }

  connect(act){
    if(this.currentAct) this.disconnect(this.currentAct)

    const outputs = {
      display: this.display,
      player: this.player
    }

    act.start(outputs, next => (next ? this.connect(next) : this.disconnect(act)))

    this.currentAct = act
  }

  disconnect(act){
    if(act === this.currentAct){
      this.currentAct.end(true)

      this.player.pause()
      this.display.reset()

      this.currentView = null
    }
  }
}

export default Manager
