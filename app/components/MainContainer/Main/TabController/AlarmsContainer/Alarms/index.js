import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class Alarms extends Component {
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
