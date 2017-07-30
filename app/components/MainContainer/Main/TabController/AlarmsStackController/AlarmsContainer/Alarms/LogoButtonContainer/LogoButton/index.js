import React from 'react'
import {TouchableOpacity} from 'react-native'

import Logo from '../../../../../../../../Logo'

export default ({triggerButton}) => (
  <TouchableOpacity onPress={triggerButton}>
    <Logo height={32} />
  </TouchableOpacity>
)
