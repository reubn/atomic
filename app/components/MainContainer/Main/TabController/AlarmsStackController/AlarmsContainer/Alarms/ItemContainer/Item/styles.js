import {colours} from '../../../../../../../../App/constants'

export const item = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: 64
}

export const itemTimeContainer = {
  flexDirection: 'row',
  alignItems: 'flex-end',
  marginLeft: 18
}

export const itemTime = {
  fontSize: 28,
  color: colours.white.base.toString()
}

export const itemTimePeriod = {
  fontSize: 22,
  color: colours.blue.dark.hippo.toString()
}

export const itemName = {
  fontSize: 19,
  color: colours.blue.dark.iguana.toString(),
  marginRight: 18
}

export const itemSpacer = summary => ({
  flex: 0,
  borderBottomWidth: 1,
  borderBottomColor: summary ? colours.orange.base.toString() : colours.blue.base.toString(),
  width: 28,
  marginLeft: 20,
  marginRight: 20
})

export const itemIconContainer = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end'
}

export const itemIcon = (enabled, summary) => ({
  fontSize: 30,
  color: enabled ? summary ? colours.orange.base.toString() : colours.blue.base.toString() : colours.blue.dark.giraffe.toString(),
  marginRight: 18
})
