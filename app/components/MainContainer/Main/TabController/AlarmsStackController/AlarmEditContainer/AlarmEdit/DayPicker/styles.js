import {colours} from '../../../../../../../App/constants'

export const container = {
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottomWidth: 0.5,
  borderBottomColor: colours.blue.dark.giraffe.toString(),
  paddingLeft: 48,
  paddingRight: 48,
  height: 64
}

export const item = active => ({
  fontSize: 21,
  color: active ? colours.blue.abyssinian.toString() : colours.blue.dark.jay.toString()
})

export const itemContainer = {
  minWidth: 44,
  minHeight: 44,
  justifyContent: 'center'
}
