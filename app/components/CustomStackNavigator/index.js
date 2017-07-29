import {StackNavigator} from 'react-navigation'

import {rightButton, leftButton} from './Header'

import {header as headerStyle, headerTitle as headerTitleStyle, card as cardStyle} from './styles'

export default (screens, options={}) => StackNavigator(screens, {
  navigationOptions: navigation => ({
    headerStyle,
    headerTitleStyle,
    headerLeft: leftButton(navigation),
    headerRight: rightButton(navigation),
    gesturesEnabled: false
  }),
  cardStyle,
  ...options
})

export {default as StackPage} from './StackPage'
