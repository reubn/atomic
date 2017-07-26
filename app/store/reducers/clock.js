import initialState from '../initials/clock'

export default (state=initialState, action) => {
  if(action.type === 'SETUP_END'){
    return {
      ...state,
      ...action.payload
    }
  }

  return state
}
