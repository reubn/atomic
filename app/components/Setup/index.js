import {StackNavigator} from 'react-navigation'

import {colours} from '../App/constants'

import {headerStyle, headerTitleStyle, rightButton} from '../Header'

import Welcome from './Welcome'
import BonjourScanContainer from './BonjourScanContainer'

export default StackNavigator({
  Welcome: {screen: Welcome},
  BonjourScan: {screen: BonjourScanContainer}
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
