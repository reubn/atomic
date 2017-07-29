import React from 'react'
import {Text, ScrollView} from 'react-native'

import {Ionicons} from '@expo/vector-icons'

import {StackPage} from '../.././../CustomStackNavigator'

import {container, text as textStyle, success as successStyle, fail as failStyle} from './styles'

export default class SetupEnd extends StackPage {
  static navigationOptions = {
    title: ''
  }

  params = {
    leftButton: {
      active: !this.props.success,
      handler: ({navigation: {goBack}}) => goBack()
    },
    rightButton: {
      active: this.props.success,
      handler: () => this.props.endSetup(),
      props: {
        title: 'Finish'
      }
    }
  }

  componentWillReceiveProps({success}){
    if(this.props.success !== success){
      this.props.navigation.setParams({
        ...this.params,
        rightButton: {
          ...this.params.rightButton,
          active: success
        },
        leftButton: {
          ...this.params.leftButton,
          active: !success
        }
      })
    }
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
