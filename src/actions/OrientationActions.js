export const MakeItTablet = () => (dispatch) => {
  dispatch({type: 'ORIENTATION_TABLET'});
};

export const MakeItMobile = () => (dispatch) => {
  dispatch({type: 'ORIENTATION_MOBILE'});
};
