export default class Act {
  static frameRate = 2

  _preActWillMount({manager, previousAct, transitionTo}){
    this.manager = manager
    this.previousAct = previousAct
    this.transitionTo = transitionTo

    if(this.actWillMount) this.actWillMount()
    this._setFrameRate(this.frameRate)
  }

  _preActWillUnmount(){
    clearInterval(this._renderTimer)

    delete this.manager
    delete this.previousAct
    delete this.transitionTo


    if(this.actWillUnmount) this.actWillUnmount()
  }

  _setFrameRate(frameRate){
    clearInterval(this._renderTimer)
    this._renderTimer = frameRate !== 0 ? setInterval(() => this.render(), 1000 / (frameRate || Act.frameRate)) : null
  }

}
