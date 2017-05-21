import renderText from '../Display/renderText'

class AlarmView {
  constructor(returnView){
    this.timer = null
    this.endHandle = null
    this.returnView = returnView

    this.index = 0
  }

  start(display, end){
    this.render(display)

    this.endHandle = end
    this.timer = setInterval(() => this.render(display), 500)
  }
  end(fromDisplayManager=false){
    if(!fromDisplayManager) return this.endHandle(this.returnView)

    clearInterval(this.timer)
    this.endHandle = null
  }

  render(display){
    // if(this.index === 20) return this.endHandle(this.returnView)

    display.setIntensity(this.index % 2 ? 16 : 1)
    display.display2DArray(renderText('alarm', display.width, display.height, this.index % 2))

    this.index++
  }
}

export default AlarmView
