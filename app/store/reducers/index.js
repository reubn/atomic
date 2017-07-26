import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import {AsyncStorage} from 'react-native'

import setup from './setup'
import clock from './clock'

const config = {
  key: 'root', // key is required
  storage: AsyncStorage // storage is now required
}

const reducers = {
  setup,
  clock
}

export default persistReducer(config, combineReducers(reducers))
