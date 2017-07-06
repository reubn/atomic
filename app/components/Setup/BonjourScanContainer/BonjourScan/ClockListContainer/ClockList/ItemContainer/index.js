import {connect} from 'react-redux'

import pickClock from '../../../../../../../store/actions/setup/pickClock'

import Item from './Item'

const mapStateToProps = state => ({
  selectedClock: state.setup.selectedClock
})

const mapDispatchToProps = dispatch => ({
  pickClockUnbound: ({host}) => pickClock(dispatch, host)
})

const mergeProps = ({selectedClock}, {pickClockUnbound}, {item}) => ({
  ...item,
  selected: selectedClock === item.host,
  pickClock: () => pickClockUnbound(item)
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Item)
