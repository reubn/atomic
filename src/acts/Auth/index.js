import button, {press} from '../../button'

import generateCodes from './generateCodes'
import renderCodes from './renderCodes'

class AuthAct {
  constructor(){
    this.timer = null
    this.codes = generateCodes(4)
  }

  start({display}){
    this.render(display)
    this.timer = setInterval(() => this.render(display), 250)

    this.buttonHandler = () => {
      this.codes = generateCodes(4)
      this.render(display)
    }
    button.on(press, this.buttonHandler)
  }

  end(){
    clearInterval(this.timer)
    button.removeListener(press, this.buttonHandler)
  }

  render(display){
    display.display2DArray(renderCodes(this.codes, display.width, display.height, true))
  }
}

export default AuthAct
