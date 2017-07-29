import React from 'react'
import {View, Text} from 'react-native'

import Logo from '../../../../../../Logo'

import {StackPage} from '../../../../../../CustomStackNavigator'

export default class Alarms extends StackPage {
  static navigationOptions = {
    title: <Logo height={32} />
  }
  componentWillMount(){
    this.props.getAlarms()
  }
  render(){
    return (
      <View>
        <Text>{JSON.stringify(this.props.alarms, null, 2)}</Text>
      </View>
    )
  }
}
