import {connect} from 'react-redux'

import LogoButton from './LogoButton'
import triggerButton from '../../../../../../../../store/actions/triggerButton'

const mapDispatchToProps = {
  triggerButton: () => (_, getState) => triggerButton(getState)
}

export default connect(null, mapDispatchToProps)(LogoButton)
