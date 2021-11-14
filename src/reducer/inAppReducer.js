import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isLoading: false,
  data: undefined,
  error: undefined,
});

export default function (state = initialState, action) {
  const {data} = action;
  switch (action.type) {
    case 'SET_REQUEST_IAP':
      return Immutable.merge(state, {
        isLoading: true,
      });
    case 'SET_SUCCESS_IAP':
      return Immutable.merge(state, {
        isLoading: false,
        data: data,
      });
    case 'SET_FAILURE_IAP':
      return Immutable.merge(state, {
        isLoading: false,
      });

    default:
      return state;
  }
}
