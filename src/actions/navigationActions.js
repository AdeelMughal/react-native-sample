export const onAppStateChanged = (nextState) => (dispatch) => {
  dispatch({type: 'APP_STATE_CHANGED', nextState});
};
