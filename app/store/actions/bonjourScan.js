import moment from 'moment'

export default dispatch => {
  // Placeholder for proper Bonjour scanning
  setTimeout(() => dispatch({
    action: 'BONJOUR_SCAN',
    timestamp: moment(),
    results: [{host: '192.168.1.216'}]
  }), 1000)
}
