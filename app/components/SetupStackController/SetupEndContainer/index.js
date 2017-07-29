import {connect} from 'react-redux'

import endSetup from '../../../store/actions/setup/endSetup'

import SetupEnd from './SetupEnd'

const mapStateToProps = state => ({
  success: !!state.setup.selectedClock.key
})

const mapDispatchToProps = {
  endSetupUnchecked: () => (dispatch, getState) => endSetup(dispatch, getState)
}

const mergeProps = ({success}, {endSetupUnchecked}, passdown) => ({
  ...passdown,
  success,
  endSetup: () => success && endSetupUnchecked()
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SetupEnd)
