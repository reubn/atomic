export default class Transitioner {
  constructor({screens, transitionFunction, transitionLength, transitionStartHook, transitionEndHook}){
    // Array of screen renderFunctions
    this.screens = screens

    // The function to use for animating the transition
    this.transitionFunction = transitionFunction

    // The number of frames for which the transition shall continue
    this.transitionLength = transitionLength

    // Hook Functions
    this.transitionStartHook = transitionStartHook
    this.transitionEndHook = transitionEndHook

    // Start statically
    this.transitioning = false

    // Start on screen `0`
    this.screenIndex = 0
  }

  next(){
    // Start transition
    this.transitioning = true

    // Start on frame 0
    this.transitionFrame = 0

    // Create transition
    this.transition = this.transitionFunction(this.screens[this.screenIndex], this.screens[(this.screenIndex + 1) % this.screens.length])

    // Trigger hook
    if(this.transitionStartHook) this.transitionStartHook()
  }

  transitionFinished(){
    // End transition
    this.transitioning = false

    // Move to the next screen, wrapping around to the start
    this.screenIndex = (this.screenIndex + 1) % this.screens.length

    // Trigger hook
    if(this.transitionEndHook) this.transitionEndHook()

    // Return screen renderFunction of the next screen
    return this.screens[this.screenIndex]()
  }

  render(){
    // If we're transitioning between screens, and have not finished; return transition frame, incrementing frame index
    if(this.transitioning && this.transitionFrame < this.transitionLength) return this.transition(this.transitionFrame++)

    // If we've reached the end of the transition; end transition and return renderFunction of the next screen
    if(this.transitioning) return this.transitionFinished()

    // If we're static on a screen; return screen renderFunction
    return this.screens[this.screenIndex]()
  }
}

export {default as slide} from './slideTransition'
