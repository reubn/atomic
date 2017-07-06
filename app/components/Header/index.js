import React from 'react'
import {Button} from 'react-native'

import {colours} from '../App/constants'

export const headerStyle = {
  backgroundColor: colours.blue.dark.base.toString(),
  borderBottomWidth: 0.5,
  borderBottomColor: colours.blue.dark.baboon.toString()
}

export const headerTitleStyle = {
  color: colours.blue.dark.caiman.toString()
}

export const rightButton = (props, {navigation: {state: {params: {rightButtonActive, rightButtonHandler}={}}={}}}=props) => <Button title="Next" color={rightButtonActive ? colours.blue.abyssinian.toString() : colours.blue.dark.eagle.toString()} onPress={() => rightButtonHandler && rightButtonHandler(props)} />
