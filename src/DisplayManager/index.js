import Display from '../Display'

class DisplayManager {
  constructor(...args){
    this.currentView = null

    this.display = new Display(...args)
  }

  connect(view){
    if(this.currentView) this.disconnect(this.currentView)

    view.start(this.display)
    this.currentView = view
  }

  disconnect(view){
    if(view === this.currentView){
      this.currentView.end()
      this.display.reset()
    }
  }
}

export default DisplayManager
