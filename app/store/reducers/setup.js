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
      selectedClock: {
        ...state.selectedClock,
        address: action.payload
      }
    }
  }

  if(action.type === 'SETUP_SAVE_PATTERN'){
    return {
      ...state,
      authPatterns: state.authPatterns.map((pattern, index) => (index === action.payload.index ? action.payload.pattern : pattern))
    }
  }

  if(action.type === 'SETUP_AUTH_LOADING'){
    const {payload=true} = action

    return {
      ...state,
      authLoading: payload
    }
  }

  if(action.type === 'SETUP_AUTH_SUCCESS'){
    return {
      ...state,
      selectedClock: {
        ...state.selectedClock,
        ...action.payload
      }
    }
  }

  if(action.type === 'SETUP_AUTH_FAIL'){
    return {
      ...state,
      authPatterns: initialState.authPatterns
    }
  }

  if(action.type === 'SETUP_END') return initialState

  return state
}
