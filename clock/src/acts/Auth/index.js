import button, {press} from '../../button'
import auth, {authComplete} from '../../auth'
import {authSuccessSound} from '../../Sound'

import Act from '../Act'

import renderPatterns from './renderPatterns'

class AuthAct extends Act {
  constructor(returnAct){
    super()
    this.returnAct = returnAct
  }

  actWillMount(){
    this.buttonHandler = () => {
      auth.generatePatterns()
      this.render()
    }
    button.on(press, this.buttonHandler)

    auth.once(authComplete, () => this.authFinished())
  }

  async authFinished(){
    await this.manager.sound.play(authSuccessSound)
    this.transitionTo(this.returnAct)
  }

  actWillUnmount(){
    button.removeListener(press, this.buttonHandler)
  }

  render(){
    this.manager.display.display2DArray(renderPatterns(auth.patterns, this.manager.display.width, this.manager.display.height, true))
  }
}

export default AuthAct
