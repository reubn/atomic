import {Dimensions} from 'react-native'

import {colours} from '../../../App/constants'

const {width, height} = Dimensions.get('window')
const minDimension = Math.min(width, height)

export const container = {
  flex: 1
}

export const scroll = {
  backgroundColor: colours.blue.dark.aardvark.toString()
}

export const scrollContainer = {
  flex: 1,
  backgroundColor: colours.blue.dark.aardvark.toString(),
  alignItems: 'center',
  justifyContent: 'center'
}

export const carousel = {
  width: minDimension,
  height: minDimension
}

const bulletSize = 7
export const bulletsContainer = {
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  zIndex: 2,
  height: bulletSize * 3,
  backgroundColor: colours.white.base.toString(),
  borderRadius: 100,
  paddingLeft: bulletSize * 0.6,
  paddingRight: bulletSize * 0.6
}

export const bullet = {
  margin: 4,
  marginTop: bulletSize,
  marginBottom: bulletSize,
  width: bulletSize,
  height: bulletSize,
  borderRadius: 100,
  backgroundColor: colours.blue.dark.hippo.toString(),
  borderWidth: 0
}

export const chosenBullet = {
  ...bullet,
  backgroundColor: colours.blue.dark.baboon.toString()
}

const authPageMargin = 30
export const authPage = {
  width: carousel.width - (authPageMargin * 2),
  height: (carousel.height - (authPageMargin * 2)) + bulletsContainer.height,
  margin: authPageMargin,
  zIndex: 1
}

export const message = {
  fontSize: 18,
  color: colours.blue.dark.eagle.toString(),
  width: 235,
  textAlign: 'center',
  marginTop: 8
}
