import initAlarms from './alarms'
import initWifi from './wifi'
import initServer from './server'
import auth from './auth'

auth.validTokenExists()
.then(result => result && initAlarms())
.catch(() => null)

initWifi()
initServer()
