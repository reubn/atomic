import button, {press} from '../../button'
import auth from '../../auth'

import renderPatterns from './renderPatterns'

class AuthAct {
  constructor(){
    this.timer = null
  }

  start({display}){
    this.render(display)
    this.timer = setInterval(() => this.render(display), 250)

    this.buttonHandler = () => {
      auth.generatePatterns()
      this.render(display)
    }
    button.on(press, this.buttonHandler)
  }

  end(){
    clearInterval(this.timer)
    button.removeListener(press, this.buttonHandler)
  }

  render(display){
    display.display2DArray(renderPatterns(auth.patterns, display.width, display.height, true))
  }
}

export default AuthAct
