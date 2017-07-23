import initAlarms from './alarms'
import initWifi from './wifi'
import initServer from './server'
import auth from './auth'
import manager, {defaultAct} from './manager'
import {bootSound} from './Sound'

import AuthAct from './acts/Auth'

manager.sound.play(bootSound)

auth.validTokenExists()
.then(() => initAlarms())
.catch(() => manager.connect(new AuthAct(defaultAct)))

initWifi()
initServer()
