import moment from 'moment'

import Display from './Display'
import renderText from './Display/renderText'

const display = new Display(4)

setInterval(() => display.display2DArray(renderText(moment().format('h:mm:ss'), display.width, display.height)), 1000)
