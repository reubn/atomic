import React from 'react'
import {Text, View, ScrollView, StatusBar} from 'react-native'
import NavigationBar from 'react-native-navbar'

import Logo from '../Logo'

import {colours} from './constants'
import {container, header, headerTitle, scroll, scrollContainer, call, message} from './styles'

const rightButtonConfig = {
  title: 'Next',
  tintColor: colours.blue.camel.toString(),
  handler: () => alert('hello!')
}

const titleConfig = {
  title: 'Atomic',
  style: headerTitle
}

export default () => (
  <View style={container}>
    <StatusBar
      barStyle="light-content"
      translucent
    />
    <NavigationBar
      style={header}
      containerStyle={header}
      title={titleConfig}
      rightButton={rightButtonConfig}
    />
    <ScrollView style={scroll} contentContainerStyle={scrollContainer}>
      <Logo />
      <Text style={call}>Welcome!</Text>
      <Text style={message}>In order to set up your new clock, we will need to walk you through a few simple steps. Press next to continue.</Text>
    </ScrollView>
  </View>
    )
