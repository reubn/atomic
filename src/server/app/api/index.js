import Router from 'koa-router'

import auth from '../../../auth'

const router = new Router()

router.use(auth.requestMiddleware())

router.get('/ay', async ({response}) => {
  response.body = 'OOOOO'
})

export default router
