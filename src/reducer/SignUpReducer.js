import Immutable from 'seamless-immutable';

const initialState = Immutable({
  femaleAvatar: [],
  maleAvatar: [],
});

export default function (state = initialState, action) {
  const {payload} = action;
  switch (action.type) {
    case 'FEMALE_AVATAR':
      return Immutable.merge(state, {
        femaleAvatar: payload,
      });

    case 'MALE_AVATAR':
      return Immutable.merge(state, {
        maleAvatar: payload,
      });
    default:
      return state;
  }
}
