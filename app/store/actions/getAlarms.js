import axios from 'axios'

export default async (dispatch, getState) => {
  const {clock: {address, key}} = getState()

  const {data=[]} = await axios.get(`http://${address}/api/alarms`, {params: {key}}).catch(() => ({}))

  dispatch({type: 'ALARMS_FROM_CLOCK', payload: data.reduce((hash, alarm) => ({...hash, [alarm.id]: alarm}), {})})
}
