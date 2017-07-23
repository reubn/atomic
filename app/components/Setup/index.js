import {StackNavigator} from 'react-navigation'

import {colours} from '../App/constants'

import {headerStyle, headerTitleStyle, rightButton} from '../Header'

import Welcome from './Welcome'
import BonjourScanContainer from './BonjourScanContainer'
import Auth from './Auth'

export default StackNavigator({
  Welcome: {screen: Welcome},
  BonjourScan: {screen: BonjourScanContainer},
  Auth: {screen: Auth}
}, {
  navigationOptions: navigation => ({
    headerStyle,
    headerTitleStyle,
    headerLeft: null,
    headerRight: rightButton(navigation),
    gesturesEnabled: false
  }),
  cardStyle: {
    backgroundColor: colours.blue.dark.aardvark.toString(),
    opacity: 1
  }
})
