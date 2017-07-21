import Router from 'koa-router'

import auth from '../../../auth'

import alarms from './alarms'
import button from './button'

const router = new Router()

router.use(auth.requestMiddleware())

router.use('/alarms', alarms.routes())
router.use('/button', button.routes())

export default router
