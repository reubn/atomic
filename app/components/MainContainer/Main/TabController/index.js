import {TabNavigator} from 'react-navigation'

import {colours} from '../../../App/constants'

import AlarmsContainer from './AlarmsContainer'

import {style} from './styles'

export default TabNavigator({
  Alarms: {screen: AlarmsContainer}
}, {
  swipeEnabled: true,
  animationEnabled: true,
  lazy: true,
  tabBarOptions: {
    activeTintColor: colours.blue.abyssinian.toString(),
    inactiveTintColor: colours.white.base.toString(),
    style
  }
})
