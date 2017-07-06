import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {View as AnimatedView} from 'react-native-animatable'

import {item, itemText, icon, iconContainer} from './styles'

export default ({name, selected, pickClock}) => (
  <TouchableOpacity onPress={pickClock}>
    <View style={item}>
      <AnimatedView style={iconContainer} animation="fadeIn" iterationCount={1} duration={300}>
        {selected && <Ionicons name="ios-checkmark" size={iconContainer.width} style={icon} />}
      </AnimatedView>
      <Text style={itemText(selected)}>{name}</Text>
    </View>
  </TouchableOpacity>
)
