import moment from 'moment'

export default {
  selectedClock: '192.168.1.216',
  bonjourScan: {
    results: [
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
    ],
    lastRun: moment()
  }
}
