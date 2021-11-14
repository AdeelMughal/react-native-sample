import Immutable from 'seamless-immutable';

const initialState = Immutable({
  video: null,
  privacyPolicy: null,
  launchContent: null,
});

export default function (state = initialState, action) {
  const {payload} = action;
  switch (action.type) {
    case 'LAUNCH_VIDEO':
      return Immutable.merge(state, {
        video: payload,
      });
    case 'PRIVACY_POLICY':
      return Immutable.merge(state, {
        privacyPolicy: payload,
      });
    case 'LAUNCH_CONTENT':
      return Immutable.merge(state, {
        launchContent: payload,
      });

    default:
      return state;
  }
}
