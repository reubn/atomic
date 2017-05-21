import clockView from '../clockView'

import DisplayManager from './DisplayManager'

const manager = new DisplayManager(4)

manager.connect(clockView)

export default manager
