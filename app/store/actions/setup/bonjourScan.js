import moment from 'moment'

const results = [
  {
    host: '192.168.1.216',
    name: 'New Clock 1',
    paired: false
  },
  {
    host: '192.168.1.217',
    name: 'Bedroom',
    paired: true
  },
  {
    host: '192.168.1.218',
    name: 'Kitchen',
    paired: true
  },
  {
    host: '192.168.1.219',
    name: 'Living Room',
    paired: true
  }
]

export default dispatch => {
  // Placeholder for proper Bonjour scanning
  setTimeout(() => dispatch({
    action: 'SETUP_BONJOUR_SCAN',
    payload: {
      timestamp: moment(),
      results
    }
  }), 1000)
}
