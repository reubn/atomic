import clockAct from '../acts/clock'

import Manager from './Manager'

const manager = new Manager({display: [4]})

manager.connect(clockAct)

export default manager
