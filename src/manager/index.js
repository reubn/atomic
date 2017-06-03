import ClockAct from '../acts/Clock'

import Manager from './Manager'

const manager = new Manager({display: [4]})

manager.connect(new ClockAct())

export default manager
