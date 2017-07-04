import {applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

export default compose(applyMiddleware(thunk))
