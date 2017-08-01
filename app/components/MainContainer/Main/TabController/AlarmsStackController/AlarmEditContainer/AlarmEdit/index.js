import React from 'react'
import {ScrollView, Text} from 'react-native'

import {StackPage} from '../../../../../../CustomStackNavigator'

import TimePicker from './TimePicker'
import DayPicker from './DayPicker'
import InputField from './InputField'
import ToggleField from './ToggleField'

import {} from './styles'

export default class AlarmEdit extends StackPage {
  constructor({navigation: {state: {params: {alarm: {name, enabled, scheduleDescriptor: {hour=4, minute=20, days={3: true, 5: true}}}}}}}){
    super()

    this.state = {
      name,
      enabled,
      hour: (hour % 12) || 12,
      minute,
      days,
      period: hour < 12 ? 'am' : 'pm'
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

  // componentWillReceiveProps({clockSelected}){
  //   if(this.props.clockSelected !== clockSelected) this.props.navigation.setParams({...this.params, rightButton: {...this.params.rightButton, active: clockSelected}})
  // }
  render(){
    return (
      <ScrollView>
        <TimePicker hour={this.state.hour} minute={this.state.minute} period={this.state.period} onChange={(field, value) => this.setState({[field]: value})} />
        <DayPicker days={this.state.days} onChange={(day, value) => this.setState(({days}) => ({days: {...days, [day]: value}}))} />
        <InputField title="Name" value={this.state.name} onChange={name => this.setState({name})} />
        <ToggleField title="Enabled" value={this.state.enabled} onChange={enabled => this.setState({enabled})} />
        <Text>{JSON.stringify(this.scheduleDescriptor, null, 2)}</Text>
      </ScrollView>
    )
  }
}
