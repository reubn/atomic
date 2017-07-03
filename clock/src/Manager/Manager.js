import Sound from '../Sound'
import Display from '../Display'

class Manager {
  constructor({sound=[], display=[]}, initalAct){
    this.currentAct = null

    this.sound = new Sound(...sound)
    this.display = new Display(...display)

    if(initalAct) this.connect(initalAct)
  }

  connect(act){
    if(this.currentAct) this.disconnect(this.currentAct)

    const outputs = {
      display: this.display,
      sound: this.sound,
      previousAct: this.currentAct
    }

    act.start(outputs, next => (next ? this.connect(next) : this.disconnect(act)))

    this.currentAct = act
  }

  disconnect(act){
    if(act === this.currentAct){
      this.currentAct.end(true)

      this.sound.removeAllListeners()
      this.display.reset()

      this.currentView = null
    }
  }
}

export default Manager
