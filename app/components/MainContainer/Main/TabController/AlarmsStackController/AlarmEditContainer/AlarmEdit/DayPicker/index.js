import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'

import {container, item, itemContainer} from './styles'

const week = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default ({days={}, onChange}) => (
  <View style={container}>
    {week.map((display, index) => {
      const number = index + 1
      const active = days[number]

      return (
        <TouchableOpacity key={index} onPress={() => onChange(number, !active)} style={itemContainer}>
          <Text style={item(active)}>
            {display}
          </Text>
        </TouchableOpacity>
      )
    })}
  </View>
)
