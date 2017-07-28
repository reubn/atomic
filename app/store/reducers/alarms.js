import initialState from '../initials/clock'

export default (state=initialState, action) => {
  if(action.type === 'ALARMS_FROM_CLOCK') return {...state, ...action.payload}

  return state
}
