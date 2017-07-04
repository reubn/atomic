import React from 'react'
import {StatusBar} from 'react-native'
import {Provider} from 'react-redux'

import store from '../../store'

import Setup from '../Setup'

export default () => {
  StatusBar.setBarStyle('light-content', true)
  return (
    <Provider store={store}>
      <Setup />
    </Provider>
  )
}
