import React from 'react'
import {View, Text, Switch} from 'react-native'

import {container, title, toggle, toggleColor, toggleBorderColor} from './styles'

export default ({title: titleText, value, onChange}) => (
  <View style={container}>
    <Text style={title}>{titleText}</Text>
    <Switch
      style={toggle}
      tintColor={toggleBorderColor}
      onTintColor={toggleColor}
      onValueChange={onChange}
      value={value}
    />
  </View>
)
