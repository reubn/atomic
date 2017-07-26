import {StackNavigator} from 'react-navigation'

import {colours} from '../App/constants'

import {headerStyle, headerTitleStyle, rightButton, leftButton} from '../Header'

import Welcome from './Welcome'
import BonjourScanContainer from './BonjourScanContainer'
import AuthContainer from './AuthContainer'
import SetupEndContainer from './SetupEndContainer'

export default StackNavigator({
  Welcome: {screen: Welcome},
  BonjourScan: {screen: BonjourScanContainer},
  Auth: {screen: AuthContainer},
  SetupEnd: {screen: SetupEndContainer}
}, {
  navigationOptions: navigation => ({
    headerStyle,
    headerTitleStyle,
    headerLeft: leftButton(navigation),
    headerRight: rightButton(navigation),
    gesturesEnabled: false
  }),
  cardStyle: {
    backgroundColor: colours.blue.dark.aardvark.toString(),
    opacity: 1
  }
})
