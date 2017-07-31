import React from 'react'
import {View, Text, TextInput} from 'react-native'

import {container, title, input, cursorColor} from './styles'

export default ({title: titleText, value, onChange}) => (
  <View style={container}>
    <Text style={title}>{titleText}</Text>
    <TextInput
      style={input}
      selectionColor={cursorColor}
      onChangeText={onChange}
      value={value}
      returnKeyType="done"
      clearButtonMode="while-editing"
      enablesReturnKeyAutomatically
      keyboardAppearance="dark"
    />
  </View>
)
