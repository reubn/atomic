import clockAct from '../clockAct'

import Manager from './Manager'

const manager = new Manager({display: [4]})

manager.connect(clockAct)

export default manager
