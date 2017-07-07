import {colours} from '../../../../../App/constants'

export const container = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

export const icon = {
  color: colours.blue.abyssinian.toString()
}

export const iconContainer = {
  alignItems: 'center',
  width: 96,
  height: 97
}

export const title = active => ({
  fontSize: 24,
  color: active ? colours.blue.dark.dachshund.toString() : colours.blue.dark.eagle.toString(),
  textAlign: 'center'
})

export const text = visible => ({
  fontSize: 18,
  color: colours.blue.dark.eagle.toString(),
  width: 235,
  textAlign: 'center',
  marginTop: 8,
  opacity: visible ? 1 : 0
})
