import initialState from '../initials/bonjourScan'

export default (state=initialState, action) => {
  if(action.type === 'BONJOUR_SCAN'){
    const {results, timestamp} = action

    return {...state, results, lastRun: timestamp}
  }

  return state
}
