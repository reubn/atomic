import {colours} from '../../../../../../../App/constants'

export const item = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  height: 44
}

export const itemText = selected => ({
  fontSize: 17,
  color: selected ? colours.blue.dark.hippo.toString() : colours.blue.dark.frog.toString()
})

export const icon = {
  color: colours.orange.base.toString()
}

export const iconContainer = {
  alignItems: 'center',
  width: 32
}
