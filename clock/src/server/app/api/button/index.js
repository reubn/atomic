import Router from 'koa-router'

import post from './post'

const router = new Router()

router.post('/', post)

export default router
