import ClockAct from '../acts/Clock'
import Manager from './Manager'

const manager = new Manager({display: [4]}, new ClockAct())

export default manager
