import React from 'react'
import {Button} from 'react-native'

import {headerButton} from './styles'

export const leftButton = (props, {navigation: {state: {params: {leftButton: {active, handler, buttonProps}={}}={}}={}}}=props) => (
  <Button
    title="Back"
    color={active ? headerButton.color : 'transparent'}
    onPress={() => handler && active && handler(props)}
    {...buttonProps}
  />
)

export const rightButton = (props, {navigation: {state: {params: {rightButton: {active, handler, buttonProps}={}}={}}={}}}=props) => (
  <Button
    title="Next"
    color={active ? headerButton.color : 'transparent'}
    onPress={() => handler && active && handler(props)}
    {...buttonProps}
  />
)
