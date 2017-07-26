import {connect} from 'react-redux'

import sendAuth from '../../../store/actions/setup/sendAuth'

import Auth from './Auth'

const mapStateToProps = state => ({
  patternsValid: state.setup.authPatterns.every(pattern => pattern.every(col => col.some(pixel => pixel)))
})

const mapDispatchToProps = {
  sendAuthUnchecked: () => sendAuth
}

const mergeProps = ({patternsValid}, {sendAuthUnchecked}, passdown) => ({
  ...passdown,
  patternsValid,
  sendAuth: () => patternsValid && sendAuthUnchecked()
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Auth)
