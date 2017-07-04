import React from 'react'
import {Text, View, ScrollView, Button} from 'react-native'

import Logo from '../../Logo'

import {container, scroll, scrollContainer, call, message} from './styles'

export default ({navigation}) => (
  <View style={container}>
    <ScrollView style={scroll} contentContainerStyle={scrollContainer}>
      <Text style={call}>Sacn!</Text>
      <Text style={message}>Dpo it!</Text>
    </ScrollView>
  </View>
)

export const options = ({navigation: {navigate}}) => {
  return {
    title: 'Select Your Clock',
    headerLeft: null
  }
}
