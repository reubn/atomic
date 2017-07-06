import {connect} from 'react-redux'

import bonjourScan from '../../../../../store/actions/setup/bonjourScan'

import Placeholder from './Placeholder'

const mapDispatchToProps = dispatch => ({
  bonjourScan: () => bonjourScan(dispatch)
})

export default connect(null, mapDispatchToProps)(Placeholder)
