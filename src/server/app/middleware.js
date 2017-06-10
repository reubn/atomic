import helmet from 'koa-helmet'
import bodyParse from 'koa-bodyparser'

import router from './routing'

export default app => {
  // Security
  app.use(helmet())

  // Body
  app.use(bodyParse({enableTypes: ['json']}))

  // Routing
  app.use(router.routes())
}
