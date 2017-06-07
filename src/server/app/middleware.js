import helmet from 'koa-helmet'

import router from './routing'

export default app => {
  // Security
  app.use(helmet())

  // Routing
  app.use(router.routes())
}
