export default {
  selectedClock: null,
  bonjourScan: {
    results: [],
    lastRun: null
  },
  authPatterns: Array(4).fill().map(() => Array(4).fill().map(() => Array(4).fill(false)))
}
