import React from 'react'
import {View, Picker} from 'react-native'

import {container, item, picker} from './styles'

export default ({hour=0, minute=0, period='am', onChange}) => (
  <View style={container}>
    <Picker itemStyle={item} style={picker} selectedValue={hour} onValueChange={hourNew => onChange('hour', hourNew)}>
      {Array(12).fill().map((_, i) => <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />)}
    </Picker>
    <Picker itemStyle={item} style={picker} selectedValue={minute} onValueChange={minuteNew => onChange('minute', minuteNew)}>
      {Array(60).fill().map((_, i) => <Picker.Item key={i} label={`${i}`.padStart(2, '0')} value={i} />)}
    </Picker>
    <Picker itemStyle={item} style={picker} selectedValue={period} onValueChange={periodNew => onChange('period', periodNew)}>
      <Picker.Item label="am" value="am" />
      <Picker.Item label="pm" value="pm" />
    </Picker>
  </View>
)
