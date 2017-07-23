import {connect} from 'react-redux'
import {defaultMemoize} from 'reselect'
import {upad, dpad, lpad, rpad} from 'array2d'

import savePattern from '../../../../store/actions/setup/savePattern'

import AuthPattern from './AuthPattern'

const pad = (grid, value, times=1) => upad(dpad(lpad(rpad(grid, times, value), times, value), times, value), times, value)

const memoisedPaddedPattern = defaultMemoize(
  pattern => (console.log(pattern), pad(pad(pattern, 'blank'), 'align'))
)

const mapStateToProps = state => ({
  authPatterns: state.setup.authPatterns
})

const mapDispatchToProps = dispatch => ({
  savePatternUnbound: (index, pattern) => savePattern(dispatch, index, pattern)
})

const mergeProps = ({authPatterns}, {savePatternUnbound}, {index, ...passdown}) => ({
  ...passdown,
  pattern: authPatterns[index],
  paddedPattern: memoisedPaddedPattern(authPatterns[index]),
  savePattern: pattern => savePatternUnbound(index, pattern)
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AuthPattern)
