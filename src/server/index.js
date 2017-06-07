import http from 'http'

import {httpPort} from './config'
import app from './app'

export default () => http.createServer(app.callback()).listen(httpPort)

export {app}
