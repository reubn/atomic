import React from 'react'
import {Text, View, ScrollView} from 'react-native'

import Logo from '../../Logo'

import {container, scroll, scrollContainer, call, message} from './styles'

export default ({navigation}) => (
  <View style={container}>
    <ScrollView style={scroll} contentContainerStyle={scrollContainer}>
      <Logo />
      <Text style={call}>Welcome!</Text>
      <Text style={message}>In order to set up your new clock, we will need to walk you through a few simple steps. Press next to continue.</Text>
    </ScrollView>
  </View>
)

export const options = navigation => {
  return {
    title: 'Welcome'
  }
}
