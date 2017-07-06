import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import {item, itemText, icon, iconSpacer} from './styles'

export default ({name, selected, pickClock}) => (
  <TouchableOpacity onPress={pickClock}>
    <View style={item}>
      {selected ? <Ionicons name="ios-checkmark" size={32} style={icon} /> : <View style={iconSpacer} />}
      <Text style={itemText(selected)}>{name}</Text>
    </View>
  </TouchableOpacity>
)
