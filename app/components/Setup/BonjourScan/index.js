import React, {Component} from 'react'
import {Text, View, ScrollView} from 'react-native'

import Logo from '../../Logo'

import {container, scroll, scrollContainer, call, message} from './styles'

export default class Welcome extends Component {
  static navigationOptions = {
    title: 'Select Your Clock'
  }

  componentDidMount(){
    this.props.navigation.setParams(this.params)
  }

  params = {
    next: 'Welcome'
  }

  render(){
    return (
      <View style={container}>
        <ScrollView style={scroll} contentContainerStyle={scrollContainer}>
          <Text style={call}>Scan!</Text>
          <Text style={message}>Scan!!!</Text>
        </ScrollView>
      </View>
    )
  }
}
