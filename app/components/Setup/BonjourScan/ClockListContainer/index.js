import {connect} from 'react-redux'

import ClockList from './ClockList'

const mapStateToProps = state => state.setup.bonjourScan.results.reduce((sections, clock) => {
  const section = clock.paired ? 'paired' : 'unpaired'
  console.log('A')
  return {
    ...sections,
    [section]: [...sections[section], clock]
  }
}, {paired: [], unpaired: []})

export default connect(mapStateToProps)(ClockList)
