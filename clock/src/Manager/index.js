import auth from '../auth'
import ClockAct from '../acts/Clock'
import AuthAct from '../acts/Auth'

import Manager from './Manager'

const manager = new Manager({display: [4]})

auth.validTokenExists()
.then(result => manager.connect(result ? new ClockAct() : new AuthAct()))
.catch(() => manager.connect(new AuthAct()))

export default manager
