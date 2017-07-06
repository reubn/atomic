import initialState from '../initials/setup'

export default (state=initialState, action) => {
  if(action.type === 'SETUP_BONJOUR_SCAN'){
    const {results, timestamp} = action.payload

    return {
      ...state,
      bonjourScan: {
        ...state.bonjourScan,
        results,
        lastRun: timestamp
      }
    }
  }

  if(action.type === 'SETUP_BONJOUR_LOADING'){
    const {payload=true} = action

    return {
      ...state,
      bonjourScan: {
        ...state.bonjourScan,
        loading: payload
      }
    }
  }

  if(action.type === 'SETUP_PICK_CLOCK'){
    return {
      ...state,
      selectedClock: action.payload
    }
  }

  return state
}
