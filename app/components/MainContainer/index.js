import {connect} from 'react-redux'

import Main from './Main'

const mapStateToProps = state => ({
  setupMode: !state.clock.key
})

export default connect(mapStateToProps)(Main)
