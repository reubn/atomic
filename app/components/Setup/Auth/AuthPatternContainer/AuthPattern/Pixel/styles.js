import {colours} from '../../../../../App/constants'

export const pixel = state => ({
  backgroundColor: state === 'blank' ? 'transparent' : (state ? colours.blue.abyssinian.toString() : colours.blue.dark.hippo.toString()),
  width: 26,
  height: 26,
  borderRadius: 6
})
