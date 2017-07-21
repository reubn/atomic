import button from '../../../../button'

export default async ({response}) => {
  button.trigger()
  response.body = {success: true}
}
