import Koa from 'koa'

import middleware from './middleware'

const app = new Koa()

middleware(app)

export default app
