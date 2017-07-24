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

    act._preActWillMount({manager: this, previousAct: this.currentAct, transitionTo: next => (next ? this.connect(next) : this.disconnect(act))})

    this.currentAct = act
  }

  disconnect(act){
    if(act === this.currentAct){
      this.currentAct._preActWillUnmount()

      this.sound.removeAllListeners()
      this.display.reset()

      this.currentAct = null
    }
  }
}

export default Manager
