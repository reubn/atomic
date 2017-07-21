export default class Transitioner {
  constructor({screens, transitionFunction, transitionLength, transitionStartHook, transitionEndHook}){
    this.screens = screens
    this.transitionFunction = transitionFunction
    this.transitionLength = transitionLength

    this.transitionStartHook = transitionStartHook
    this.transitionEndHook = transitionEndHook

    this.transitioning = false
    this.screenIndex = 0
  }

  next(){
    this.transitioning = true
    this.transitionFrame = 0
    this.transition = this.transitionFunction(this.screens[this.screenIndex], this.screens[(this.screenIndex + 1) % this.screens.length])

    if(this.transitionStartHook) this.transitionStartHook()
  }

  transitionFinished(){
    this.transitioning = false
    this.transitionFrame = 0

    this.screenIndex = (this.screenIndex + 1) % this.screens.length

    if(this.transitionEndHook) this.transitionEndHook()

    return this.screens[this.screenIndex]()
  }

  render(){
    // If we're transitioning between screens, and have not finished
    if(this.transitioning && this.transitionFrame < this.transitionLength) return this.transition(this.transitionFrame++)

    // If we've reached the end of the transition
    if(this.transitioning) return this.transitionFinished()

    // If we're static on a screen
    return this.screens[this.screenIndex]()
  }
}

export {default as slide} from './slideTransition'
