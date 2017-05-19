import Display from '../Display'

class DisplayManager {
  constructor(...args){
    this.currentView = null

    this.display = new Display(...args)
  }

  connect(view){
    if(this.currentView) this.disconnect(this.currentView)

    view.start(this.display, next => (next ? this.connect(next) : this.disconnect(view)))
    this.currentView = view
  }

  disconnect(view){
    if(view === this.currentView){
      this.currentView.end()
      this.display.reset()

      this.currentView = null
    }
  }
}

export default DisplayManager
