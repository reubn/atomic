import React from 'react'
import {Text, View} from 'react-native'

import {header, headerTitle} from './styles'

export default ({section}) => (
  <View style={header}>
    <Text style={headerTitle}>{section.title}</Text>
  </View>
)
