import {colours} from '../../../App/constants'

export const item = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  height: 44
}

export const itemText = selected => ({
  fontSize: 17,
  color: selected ? colours.blue.dark.dachshund.toString() : colours.blue.dark.caiman.toString()
})

export const icon = {
  color: colours.orange.base.toString(),
  paddingLeft: 23,
  paddingRight: 22
}

export const iconSpacer = {
  width: 56,
  paddingLeft: 23,
  paddingRight: 22
}
