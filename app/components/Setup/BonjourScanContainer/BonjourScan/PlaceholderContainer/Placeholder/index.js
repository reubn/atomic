import React from 'react'
import {ScrollView, Text, TouchableOpacity} from 'react-native'
import {View as AnimatedView} from 'react-native-animatable'
import {Ionicons} from '@expo/vector-icons'

import {container, icon, iconContainer, text} from './styles'

export default ({empty, loading, bonjourScan}) => (
  <ScrollView contentContainerStyle={container}>
    {loading
      ? <AnimatedView style={iconContainer} animation="rotate" iterationCount="infinite" duration={1000} easing="linear">
        <Ionicons name="ios-refresh" size={iconContainer.width} style={icon} />
      </AnimatedView>
      : <TouchableOpacity style={iconContainer} onPress={empty ? bonjourScan : () => 0}>
        <Ionicons name="ios-refresh" size={iconContainer.width} style={icon} />
      </TouchableOpacity>
    }
    <Text style={text(empty && !loading)}>No clocks were found on your network. Make sure you are connected via the clock's internal wifi</Text>
  </ScrollView>
)
