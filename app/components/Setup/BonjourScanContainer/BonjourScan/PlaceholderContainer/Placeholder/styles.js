import {colours} from '../../../../../App/constants'

export const container = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

export const icon = {
  color: colours.orange.base.toString()
}

export const iconContainer = {
  alignItems: 'center',
  width: 96
}

export const text = visible => ({
  fontSize: 18,
  color: colours.blue.dark.hippo.toString(),
  width: 235,
  textAlign: 'center',
  marginTop: 4,
  opacity: visible ? 1 : 0
})
