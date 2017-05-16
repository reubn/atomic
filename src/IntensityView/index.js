import renderText from '../Display/renderText'

class IntensityView {
  constructor(){
    this.timer = null

    this.index = 0
  }

  start(display){
    this.render(display)
    this.timer = setInterval(() => this.render(display), 500)
  }
  end(){
    clearInterval(this.timer)
  }

  render(display){
    display.setIntensity(this.index)
    display.display2DArray(renderText(this.index+'', display.width, display.height, true))

    this.index = (this.index + 1) % 16
  }
}

export default IntensityView
