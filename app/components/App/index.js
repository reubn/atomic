import React from 'react'
import {StatusBar} from 'react-native'
import {Provider} from 'react-redux'

import store from '../../store'

import MainContainer from '../MainContainer'

// Set StatusBar to light
StatusBar.setBarStyle('light-content', true)

export default () => (
  <Provider store={store}>
    <MainContainer />
  </Provider>
)
