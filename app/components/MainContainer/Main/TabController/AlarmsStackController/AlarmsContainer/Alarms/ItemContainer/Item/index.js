import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import {item, itemTimeContainer, itemTime, itemTimePeriod, itemName, itemSpacer, itemIconContainer, itemIcon} from './styles'

export default ({editAlarm, item: {name, scheduleDescriptor: {hour, minute}, summary, enabled}}) => (
  <TouchableOpacity onPress={editAlarm}>
    <View style={item}>
      <View style={itemTimeContainer}>
        <Text style={itemTime}>{`${hour % 12}:${`${minute}`.padStart(2, '0')}`}</Text>
        <Text style={itemTimePeriod}>{hour < 12 ? 'am' : 'pm'}</Text>
      </View>
      <View style={itemSpacer(summary)} />
      <Text style={itemName}>{name}</Text>
      <View style={itemIconContainer}>
        <Ionicons name={enabled ? 'ios-flash' : 'ios-flash-outline'} style={itemIcon(enabled, summary)} />
      </View>
    </View>
  </TouchableOpacity>
)
