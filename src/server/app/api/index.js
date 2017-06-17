import Router from 'koa-router'

import auth from '../../../auth'

import alarms from './alarms'

const router = new Router()

router.use(auth.requestMiddleware())

router.use('/alarms', alarms.routes())

export default router
