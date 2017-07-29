import {TabNavigator} from 'react-navigation'

import {colours} from '../../../App/constants'

import AlarmsStackController from './AlarmsStackController'

import {style} from './styles'

export default TabNavigator({
  Alarms: {screen: AlarmsStackController}
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
