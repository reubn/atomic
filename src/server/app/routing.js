import Router from 'koa-router'

import login from './login'
import api from './api'

const router = new Router()

router.get('/login', login)

router.use('/api', api.routes())

export default router
