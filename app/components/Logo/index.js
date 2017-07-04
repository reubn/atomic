import React from 'react'
import Svg, {Rect} from 'react-native-svg'

import {colours} from '../App/constants'

export default () =>
  (
    <Svg width="186" height="254" viewBox="0 0 186 254">
      <Rect id="Rectangle" fill={colours.white.base.toString()} x="68" y="136" width="50" height="50" rx="8" />
      <Rect id="Rectangle" fill={colours.blue.dark.baboon.toString()} x="68" y="68" width="50" height="50" rx="8" />
      <Rect id="Rectangle" fill={colours.white.base.toString()} x="136" y="136" width="50" height="50" rx="8" />
      <Rect id="Rectangle" fill={colours.white.base.toString()} x="0" y="204" width="50" height="50" rx="8" />
      <Rect id="Rectangle" fill={colours.blue.badger.toString()} x="136" y="204" width="50" height="50" rx="8" />
      <Rect id="Rectangle" fill={colours.white.base.toString()} x="136" y="68" width="50" height="50" rx="8" />
      <Rect id="Rectangle" fill={colours.white.base.toString()} x="0" y="68" width="50" height="50" rx="8" />
      <Rect id="Rectangle" fill={colours.white.base.toString()} x="68" y="0" width="50" height="50" rx="8" />
      <Rect id="Rectangle" fill={colours.blue.badger.toString()} x="0" y="0" width="50" height="50" rx="8" />
      <Rect id="Rectangle" fill={colours.blue.abyssinian.toString()} x="0" y="136" width="50" height="50" rx="8" />
      <Rect id="Rectangle" fill={colours.blue.base.toString()} x="136" y="0" width="50" height="50" rx="8" />
      <Rect id="Rectangle" fill={colours.blue.dark.baboon.toString()} x="68" y="204" width="50" height="50" rx="8" />
    </Svg>
)
