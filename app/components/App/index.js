import React from 'react'
import {Provider} from 'react-redux'

import store from '../../store'

import Setup from '../Setup'

export default () => (
  <Provider store={store}>
    <Setup />
  </Provider>
)
