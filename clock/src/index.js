import initAlarms from './alarms'
import initWifi from './wifi'
import initServer from './server'
import auth from './auth'
import manager from './manager'
import {bootSound} from './Sound'
manager.sound.play(bootSound)

auth.validTokenExists()
.then(result => result && initAlarms())
.catch(() => null)

initWifi()
initServer()
