import axios from 'axios'

export default async (dispatch, getState) => {
  dispatch({type: 'SETUP_AUTH_LOADING'})

  const {setup: {selectedClock: {address}, authPatterns}} = getState()
  const patterns = authPatterns.map(pattern => parseInt(pattern.reduce((arr, slice) => [...arr, ...slice.map(x => (x ? '1' : '0'))], []).join(''), 2))

  const {data: {key, expires}={}} = await axios.post(`http://${address}/login`, {patterns}).catch(() => ({}))

  if(key) dispatch({type: 'SETUP_AUTH_SUCCESS', payload: {key, keyExpiration: expires}})
  else dispatch({type: 'SETUP_AUTH_FAIL'})

  dispatch({type: 'SETUP_AUTH_LOADING', payload: false})
}
