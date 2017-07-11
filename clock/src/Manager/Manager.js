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
      sound: this.sound
    }

    act._preActWillMount(outputs, this.currentAct, next => (next ? this.connect(next) : this.disconnect(act)))

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
