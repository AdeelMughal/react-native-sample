import Immutable from 'seamless-immutable';

const initialState = Immutable({
  appState: undefined,
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case 'APP_STATE_CHANGED':
      return Immutable.merge(state, {
        appState: action.nextState,
      });

    default:
      return state;
  }
};
