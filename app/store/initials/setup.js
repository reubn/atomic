import clockInitial from './clock'

export default {
  selectedClock: clockInitial,
  bonjourScan: {
    results: [],
    lastRun: null
  },
  authPatterns: Array(4).fill().map(() => Array(4).fill().map(() => Array(4).fill(false))),
  authLoading: null
}
