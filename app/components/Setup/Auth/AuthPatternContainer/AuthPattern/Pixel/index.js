import React from 'react'
import {TouchableOpacity, View} from 'react-native'

import {pixel} from './styles'

export default ({state, onPress}) => (state === 'blank' || state === 'align' ? <View style={pixel(state)} /> : <TouchableOpacity style={pixel(state)} onPress={onPress} />)
