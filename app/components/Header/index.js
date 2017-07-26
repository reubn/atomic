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

export const leftButton = (props, {navigation: {state: {params: {leftButtonActive, leftButtonHandler, leftButtonProps}={}}={}}}=props) => <Button title="Back" color={leftButtonActive ? colours.blue.abyssinian.toString() : 'transparent'} onPress={() => leftButtonHandler && leftButtonActive && leftButtonHandler(props)} {...leftButtonProps} />
export const rightButton = (props, {navigation: {state: {params: {rightButtonActive, rightButtonHandler, rightButtonProps}={}}={}}}=props) => <Button title="Next" color={rightButtonActive ? colours.blue.abyssinian.toString() : 'transparent'} onPress={() => rightButtonHandler && rightButtonActive && rightButtonHandler(props)} {...rightButtonProps} />
