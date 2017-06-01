import {startAP, stopAP, defineNetwork} from './wifi'

import {ssid, key} from './secure'

export default startAP()

const http = require('http')

const requestHandler = async (request, response) => {
  console.log(request.url)
  response.end('Ending AP')
  await stopAP()
  setTimeout(() => defineNetwork(ssid, key), 3000)
}

const server = http.createServer(requestHandler)
server.listen(80, '10.0.0.1', err => {
  if(err) return console.log('something bad happened', err)
  console.log('server is listening')
})
