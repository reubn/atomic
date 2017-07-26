import React from 'react'
import {Text} from 'react-native'

import Setup from '../../Setup'

export default ({setupMode}) => {
  if(setupMode) return <Setup />

  return <Text>Ayyyyy!</Text>
}
