import {colours} from '../../../../App/constants'

export const page = {
  padding: 20,
  backgroundColor: colours.white.base.toString(),
  borderRadius: 12,
  overflow: 'hidden',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between'
}

export const col = parentHeight => ({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: parentHeight
})
