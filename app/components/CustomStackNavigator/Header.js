import React from 'react'
import {Button} from 'react-native'

import {headerButton} from './styles'

export const leftButton = (propsAll, {navigation: {state: {params: {leftButton: {active, handler, props}={}}={}}={}}}=propsAll) => (
  <Button
    title="Back"
    color={active ? headerButton.color : 'transparent'}
    onPress={() => handler && active && handler(propsAll)}
    {...props}
  />
)

export const rightButton = (propsAll, {navigation: {state: {params: {rightButton: {active, handler, props}={}}={}}={}}}=propsAll) => (
  <Button
    title="Next"
    color={active ? headerButton.color : 'transparent'}
    onPress={() => handler && active && handler(propsAll)}
    {...props}
  />
)
