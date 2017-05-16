import DisplayManager from './DisplayManager'
import ClockView from './ClockView'
// import TestView from './TestView'
// import IntensityView from './IntensityView'

const manager = new DisplayManager(4)
const clockView = new ClockView()
// const testView = new TestView()
// const intensityView = new IntensityView()

manager.connect(clockView)
// let alternate = 1
// const views = [clockView, intensityView]
// setInterval(() => manager.connect(views[alternate++ % views.length]), 16000)
