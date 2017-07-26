import {createStore} from 'redux'
import {persistStore} from 'redux-persist'

import reducers from './reducers'
import initials from './initials'
import middleware from './middleware'

const store = createStore(
  reducers,
  initials,
  middleware
)
persistStore(store)

export default store
