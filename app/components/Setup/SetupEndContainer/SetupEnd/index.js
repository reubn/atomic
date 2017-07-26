import React from 'react'
import {Text, ScrollView} from 'react-native'

import {Ionicons} from '@expo/vector-icons'

import SetupPage from '../../SetupPage'

import {container, text as textStyle, success as successStyle, fail as failStyle} from './styles'

export default class SetupEnd extends SetupPage {
  static navigationOptions = {
    title: ''
  }

  params = {
    leftButtonActive: !this.props.success,
    rightButtonActive: this.props.success,
    leftButtonHandler: ({navigation: {goBack}}) => goBack(),
    rightButtonHandler: () => this.props.endSetup(),
    rightButtonProps: {
      title: 'Finish'
    }
  }

  componentWillReceiveProps({success}){
    if(this.props.success !== success) this.props.navigation.setParams({...this.params, rightButtonActive: success, leftButtonActive: !success})
  }

  render(){
    const text = this.props.success
      ? 'Success, you may now configure your clock. Press Next.'
      : 'Something went wrong. Make sure you copy the code exactly. Press Back to reenter the code.'

    const Icon = this.props.success
      ? <Ionicons name="ios-checkmark" style={successStyle} />
      : <Ionicons name="ios-close" style={failStyle} />

    return (
      <ScrollView contentContainerStyle={container}>
        {Icon}
        <Text style={textStyle}>{text}</Text>
      </ScrollView>
    )
  }
}
