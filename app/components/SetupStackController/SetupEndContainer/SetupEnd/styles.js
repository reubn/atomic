import {colours} from '../../../App/constants'

export const container = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

const icon = {
  alignItems: 'center',
  fontSize: 256
}

export const success = {
  ...icon,
  color: colours.blue.abyssinian.toString()
}

export const fail = {
  ...icon,
  color: colours.orange.base.toString()
}

export const text = {
  fontSize: 18,
  color: colours.blue.dark.eagle.toString(),
  width: 235,
  textAlign: 'center',
  marginTop: -80
}
