import React from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {View as AnimatedView} from 'react-native-animatable'
import {Ionicons} from '@expo/vector-icons'

import {container, icon, iconContainer, title, text} from './styles'

export default ({empty, loading, bonjourScan}) => (
  <ScrollView contentContainerStyle={container}>
    <TouchableOpacity style={container} onPress={(empty && !loading) ? bonjourScan : () => 0} activeOpacity={(empty && !loading) ? 0.2 : 1}>
      {loading
        ? <AnimatedView style={iconContainer} animation="rotate" iterationCount="infinite" duration={1000} easing="linear">
          <Ionicons name="ios-refresh" size={iconContainer.width} style={icon} />
        </AnimatedView>
        : <View style={iconContainer}>
          <Ionicons name="ios-refresh" size={iconContainer.width} style={icon} />
        </View>
      }
      <Text style={title(empty && !loading)}>{(empty && !loading) ? 'No Clocks Found' : 'Searching...'}</Text>
      <Text style={text(empty && !loading)}>No clocks were found on your network. Make sure the clock has successfully connected to your network, or you are connected via the clock's internal wifi. Press to try again.</Text>
    </TouchableOpacity>
  </ScrollView>
)
