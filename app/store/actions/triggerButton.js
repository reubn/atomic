import axios from 'axios'

export default getState => {
  const {clock: {address, key}} = getState()

  axios({
    method: 'post',
    url: `http://${address}/api/button`,
    params: {key}
  })
}
