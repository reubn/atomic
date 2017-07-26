import Router from 'koa-router'

import login from './login'
import api from './api'

const router = new Router()

router.post('/login', login)

router.use('/api', api.routes())

export default router
