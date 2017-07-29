import CustomStackNavigator from '../CustomStackNavigator'

import Welcome from './Welcome'
import BonjourScanContainer from './BonjourScanContainer'
import AuthContainer from './AuthContainer'
import SetupEndContainer from './SetupEndContainer'

export default CustomStackNavigator({
  Welcome: {screen: Welcome},
  BonjourScan: {screen: BonjourScanContainer},
  Auth: {screen: AuthContainer},
  SetupEnd: {screen: SetupEndContainer}
})
