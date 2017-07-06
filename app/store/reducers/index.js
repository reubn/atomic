import {combineReducers} from 'redux'

import setup from './setup'
import clock from './clock'

const reducers = {
  setup,
  clock
}

export default combineReducers(reducers)
