import auth from '../../auth'

export default async ctx => {
  const {patterns=[]} = ctx.request.body

  const token = await auth.exchangePatterns(patterns)

  if(!token) return ctx.throw(401, 'auth error')

  ctx.body = token
}
