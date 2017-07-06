import React from 'react'
import {View} from 'react-native'

import SetupPage from '../SetupPage'
import ClockListContainer from './ClockListContainer'

import {container} from './styles'

export default class Welcome extends SetupPage {
  static navigationOptions = {
    title: 'Select Your Clock'
  }

  params = {
    next: 'Welcome'
  }

  render(){
    return (
      <View style={container}>
        <ClockListContainer />
      </View>
    )
  }
}
