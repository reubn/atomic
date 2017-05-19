import renderText from '../Display/renderText'

class AlarmView {
  constructor(TESTCV){
    this.timer = null
    this.TESTCV = TESTCV

    this.index = 0
  }

  start(display, end){
    this.render(display)
    this.timer = setInterval(() => this.render(display, end), 500)
  }
  end(){
    clearInterval(this.timer)
  }

  render(display, end){
    if(this.index === 20) return end(this.TESTCV)

    display.setIntensity(this.index % 2 ? 16 : 1)
    display.display2DArray(renderText('alarm', display.width, display.height, this.index % 2))

    this.index++
  }
}

export default AlarmView
