export default (dispatch, getState) => {
  const {setup: {selectedClock}} = getState()

  dispatch({type: 'SETUP_END', payload: selectedClock})
}
