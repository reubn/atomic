import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import {AsyncStorage} from 'react-native'

import setup from './setup'
import clock from './clock'
import alarms from './alarms'

const config = {
  key: 'root',
  storage: AsyncStorage
}

const reducers = {
  setup,
  clock,
  alarms
}

export default persistReducer(config, combineReducers(reducers))
