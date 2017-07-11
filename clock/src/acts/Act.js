export default class Act {
  _preActWillMount(outputs, previousAct, transitionTo){
    this.outputs = outputs
    this.previousAct = previousAct
    this.transitionTo = transitionTo

    if(this.actWillMount) this.actWillMount()
    this._renderTimer = setInterval(() => this.render(), this.interval || 500)
  }

  _preActWillUnmount(){
    clearInterval(this._renderTimer)

    delete this.outputs
    delete this.previousAct
    delete this.transitionTo


    if(this.actWillUnmount) this.actWillUnmount()
  }
}
