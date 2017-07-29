import {connect} from 'react-redux'
import {defaultMemoize} from 'reselect'

import ClockList from './ClockList'

const mapStateToProps = defaultMemoize(state => state.setup.bonjourScan.results.reduce((sections, clock) => {
  const section = clock.paired ? 'paired' : 'unpaired'

  return {
    ...sections,
    [section]: [...sections[section], clock]
  }
}, {paired: [], unpaired: []}))

export default connect(mapStateToProps)(ClockList)
