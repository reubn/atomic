import {connect} from 'react-redux'

import Item from './Item'

const mergeProps = (_, _2, {navigation: {navigate}, item: alarm, ...passdown}) => ({
  ...passdown,
  item: alarm,
  editAlarm: () => navigate('AlarmEdit', {alarm})
})

export default connect(null, null, mergeProps)(Item)
