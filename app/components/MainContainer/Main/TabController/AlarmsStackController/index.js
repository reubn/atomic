import React from 'react'
import {Ionicons} from '@expo/vector-icons'

import CustomStackNavigator from '../../../../CustomStackNavigator'

import AlarmsContainer from './AlarmsContainer'

export default class extends CustomStackNavigator({
  Alarms: {screen: AlarmsContainer},
}) {
  static navigationOptions = {
    tabBarLabel: 'Alarms',
    tabBarIcon: ({focused, tintColor}) => (
      <Ionicons name={focused ? 'ios-notifications' : 'ios-notifications-outline'} style={{fontSize: 30, color: tintColor, marginTop: 6}} />
    )
  }
}
