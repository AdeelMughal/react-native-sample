import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isLoading: false,
  data: [],
  error: undefined,
});

export default function (state = initialState, action) {
  const {data} = action;

  switch (action.type) {
    case 'SET_REQUEST_RBOOKS':
      return Immutable.merge(state, {
        isLoading: true,
        data: [],
        error: undefined,
      });

    case 'SET_SUCCESS_RBOOKS':
      return Immutable.merge(state, {
        data,
        isLoading: false,
      });

    case 'SET_FAILURE_RBOOKS':
      return Immutable.merge(state, {
        error: data?.data?.error,
        isLoading: false,
        data: [],
      });

    default:
      return state;
  }
}
