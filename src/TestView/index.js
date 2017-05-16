class TestView {
  constructor(){
    this.timer = null
  }

  start(display){
    this.render(display)
    this.timer = setInterval(() => this.render(display), 500)
  }
  end(){
    clearInterval(this.timer)
  }

  render(display){
    display.setIntensity(Math.floor(Math.random() * 16) + 1)
    display.display2DArray(Array(display.width).fill().map(() => Array(display.height).fill().map(() => Math.random() > 0.5)))
  }
}

export default TestView
