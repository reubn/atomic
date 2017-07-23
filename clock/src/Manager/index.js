import ClockAct from '../acts/Clock'
import Manager from './Manager'

const defaultAct = new ClockAct()

const manager = new Manager({display: [4]}, defaultAct)

export default manager
export {defaultAct}
