import {StackNavigator} from 'react-navigation'

import {colours} from '../App/constants'

import {headerStyle, headerTitleStyle, rightButton} from '../Header'

import Welcome, {options as welcomeOptions} from './Welcome'
import BonjourScan, {options as bonjourScanOptions} from './BonjourScan'

export default StackNavigator({
  Welcome: {screen: Welcome, navigationOptions: welcomeOptions},
  BonjourScan: {screen: BonjourScan, navigationOptions: bonjourScanOptions}
}, {
  navigationOptions: navigation => ({
    headerStyle,
    headerTitleStyle,
    headerLeft: null,
    headerRight: rightButton(navigation)
  }),
  cardStyle: {
    backgroundColor: colours.blue.dark.aardvark.toString(),
    opacity: 1
  }
})
