import Immutable from 'seamless-immutable';

const initialState = Immutable({
  allNotifications: null,
});

export default function (state = initialState, action) {
  const {payload} = action;
  switch (action.type) {
    case 'ALL_NOTIFICATIONS':
      return Immutable.merge(state, {
        allNotifications: payload,
      });

    default:
      return state;
  }
}
