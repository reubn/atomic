import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import {item as itemStyle, itemText, icon, iconSpacer} from './styles'

export default ({item, selected=item[0] === 'N'}) => (
  <TouchableOpacity onPress={() => 4}>
    <View style={itemStyle}>
      {selected ? <Ionicons name="ios-checkmark" size={32} style={icon} /> : <View style={iconSpacer} />}
      <Text style={itemText(selected)}>{item}</Text>
    </View>
  </TouchableOpacity>
)
