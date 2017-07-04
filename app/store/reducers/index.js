import {combineReducers} from 'redux'

import bonjourScan from './bonjourScan'
import clock from './clock'

const reducers = {
  bonjourScan,
  clock
}

export default combineReducers(reducers)
