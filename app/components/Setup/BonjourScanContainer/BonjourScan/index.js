import React from 'react'
import {View} from 'react-native'

import {StackPage} from '../.././../CustomStackNavigator'

import PlaceholderContainer from './PlaceholderContainer'
import ClockListContainer from './ClockListContainer'

import {container} from './styles'

export default class BonjourScan extends StackPage {
  static navigationOptions = {
    title: 'Select Your Clock'
  }

  params = {
    rightButton: {
      active: this.props.clockSelected,
      handler: ({navigation: {navigate}}) => this.props.clockSelected && navigate('Auth')
    }
  }

  componentDidMount(){
    this.props.bonjourScan()
  }

  componentWillReceiveProps({clockSelected}){
    if(this.props.clockSelected !== clockSelected) this.props.navigation.setParams({...this.params, rightButton: {...this.params.rightButton, active: clockSelected}})
  }

  render(){
    return (
      <View style={container}>
        {!this.props.loading && !this.props.empty ? <ClockListContainer /> : <PlaceholderContainer empty={this.props.empty} loading={this.props.loading} />}
      </View>
    )
  }
}
