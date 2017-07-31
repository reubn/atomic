import React from 'react'
import {ScrollView, Text} from 'react-native'

import {StackPage} from '../../../../../../CustomStackNavigator'



export default class AlarmEdit extends StackPage {
  constructor({navigation: {state: {params: {alarm: {scheduleDescriptor: {hour=4, minute=20, days={3: true, 5: true}}}}}}}){
    super()

    this.state = {
      hour,
      minute,
      days,
      period: 'am'
    }
  }
  static navigationOptions = {
    title: 'Edit'
  }

  params = {
    leftButton: {
      active: true,
      handler: ({navigation: {goBack}}) => goBack(),
      props: {
        title: 'Cancel'
      }
    },
    rightButton: {
      active: false,
      handler: ({navigation: {navigate}}) => console.log('Send')
    }
  }

  get scheduleDescriptor(){
    return {
      hour: (this.state.hour % 12) + (this.state.period === 'am' ? 0 : 12),
      minute: this.state.minute,
      days: Object.entries(this.state.days).reduce((done, [day, value]) => value ? [...done, +day] : done, [])
    }
  }

  render(){
    return (
      <ScrollView>
        <Text>{JSON.stringify(this.scheduleDescriptor, null, 2)}</Text>
      </ScrollView>
    )
  }
}
