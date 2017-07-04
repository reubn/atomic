import initAlarms from './alarms'
import initWifi from './wifi'
import initServer from './server'
import auth from './auth'
import manager from './manager'
import {bootSound} from './Sound'

import AuthAct from './acts/Auth'

manager.sound.play(bootSound)

auth.validTokenExists()
.then(result => result && initAlarms())
.catch(() => manager.connect(new AuthAct()))

initWifi()
initServer()