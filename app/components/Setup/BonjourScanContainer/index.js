import {connect} from 'react-redux'

import bonjourScan from '../../../store/actions/setup/bonjourScan'

import BonjourScan from './BonjourScan'

const mapStateToProps = state => ({
  clockSelected: state.setup.selectedClock !== null,
  empty: !state.setup.bonjourScan.results.length,
  loading: state.setup.bonjourScan.loading
})

const mapDispatchToProps = dispatch => ({
  bonjourScan: () => bonjourScan(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BonjourScan)
