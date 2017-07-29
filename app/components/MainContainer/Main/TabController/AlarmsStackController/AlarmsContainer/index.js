import {connect} from 'react-redux'

import Alarms from './Alarms'

import getAlarms from '../../../../../../store/actions/getAlarms'

const mapStateToProps = state => ({
  alarms: Object.values(state.alarms)
})

const mapDispatchToProps = {
  getAlarms: () => (dispatch, getState) => getAlarms(dispatch, getState)
}

export default connect(mapStateToProps, mapDispatchToProps)(Alarms)
