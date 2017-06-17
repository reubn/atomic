import Router from 'koa-router'

import get from './get'

const router = new Router()

router.get('/', get)

export default router
