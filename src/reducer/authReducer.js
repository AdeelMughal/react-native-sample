import Immutable from 'seamless-immutable';
import _ from 'lodash';

const initialState = Immutable({
  orientation: 'mobile',
  user: {},
  countryList: [],
  error: false,
  firstChild: {name: 'NAME'},
  secondChild: {name: 'NAME'},
  thirdChild: {name: 'NAME'},
  firstChildSuccess: false,
  secondChildSuccess: false,
  thirdChildSuccess: false,
  topics: [],
  temp_user: {},
  fatherAvatar: [],
  motherAvatar: [],
  boyAvatar: [],
  girlAvatar: [],
  navigation: '',
  sneakpeak: false,
  fromsneakpeak: false,
  isAppInitialized: false,
  userSelected: false,
  allUsersData: {},
  rateTimestamp: null,
  parent: {},
  showConfirmParentModal: true,
  isSignupCompleted: false,
});

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case 'SNEAK_PEAK':
      return Immutable.merge(state, {
        sneakpeak: true,
        fromsneakpeak: false,
      });

    case 'NOT_SNEAK_PEAK':
      return Immutable.merge(state, {
        sneakpeak: false,
        fromsneakpeak: true,
      });

    case 'APP_INITIALIZED':
      return Immutable.merge(state, {
        isAppInitialized: true,
      });

    case 'ADD_CHILD_IN_ARRAY':
      var stateAllUsersData = _.clone(state.allUsersData);
      var childToAdd = action.child;

      if (stateAllUsersData && stateAllUsersData.child) {
        const findIndex = stateAllUsersData.child.findIndex(
          (thisEl) => thisEl.id === childToAdd.id,
        );

        if (findIndex === -1) {
          stateAllUsersData.child = [...stateAllUsersData.child, childToAdd];
        }
      } else {
        stateAllUsersData.child = [childToAdd];
      }

      return Immutable.merge(state, {
        allUsersData: stateAllUsersData,
      });

    case 'DELETE_CHILD_IN_ARRAY':
      var stateAllUsersData = _.cloneDeep(state.allUsersData);
      var childIdToDelete = action.childId;

      if (stateAllUsersData?.child && stateAllUsersData?.child.length > 0) {
        stateAllUsersData.child.splice(
          stateAllUsersData.child.findIndex((i) => i.id === childIdToDelete),
          1,
        );
      }

      return Immutable.merge(state, {
        allUsersData: stateAllUsersData,
      });
    case 'ALL_USERS_DATA':
      return Immutable.merge(state, {
        allUsersData: payload,
      });

    case 'USER_SELECTED':
      return Immutable.merge(state, {
        userSelected: payload,
      });

    case 'CHANGE_USER_ROLE':
      return Immutable.merge(state, {
        user: state.temp_user,
      });

    case 'PARENTS_MALE_AVATAR':
      return Immutable.merge(state, {
        fatherAvatar: payload,
      });

    case 'PARENTS_FEMALE_AVATAR':
      return Immutable.merge(state, {
        motherAvatar: payload,
      });

    case 'CHILD_BOY_AVATAR':
      return Immutable.merge(state, {
        boyAvatar: payload,
      });

    case 'CHILD_GIRL_AVATAR':
      return Immutable.merge(state, {
        girlAvatar: payload,
      });

    case 'GET_TOPICS':
      return Immutable.merge(state, {
        topics: payload,
      });

    case 'ADD_TOPICS':
      return Immutable.merge(state, {
        topicsSelected: payload,
      });
    case 'ADD_CHILD':
      if (Object.keys(state.firstChild).length < 2) {
        return Immutable.merge(state, {
          firstChild: payload,
          firstChildSuccess: true,
          secondChildSuccess: false,
          thirdChildSuccess: false,
        });
      }

      if (Object.keys(state.secondChild).length < 2) {
        return Immutable.merge(state, {
          secondChild: payload,
          secondChildSuccess: true,
          firstChildSuccess: false,
          thirdChildSuccess: false,
        });
      }

      if (Object.keys(state.thirdChild).length < 2) {
        return Immutable.merge(state, {
          thirdChild: payload,
          thirdChildSuccess: true,
          firstChildSuccess: false,
          secondChildSuccess: false,
        });
      }
    case 'ERROR':
      return Immutable.merge(state, {
        error: true,
      });

    case 'SIGNUP_DATA':
      return Immutable.merge(state, {
        temp_user: payload,
        user: payload,
        error: false,
        firstChild: {name: 'NAME'},
        secondChild: {name: 'NAME'},
        thirdChild: {name: 'NAME'},
      });

    case 'TOGGLE_RATE_POPUP':
      return Immutable.merge(state, {
        rateTimestamp: payload,
      });

    case 'USER_DATA':
      return Immutable.merge(state, {
        temp_user: payload,
        user: payload,
        error: false,
      });

    case 'CHANGE_NAVIGATION':
      return Immutable.merge(state, {
        navigation: payload,
        error: false,
      });
    case 'LOGOUT':
      return Immutable.merge(state, {
        allUsersData: {},
        parent: {},
        sneakpeak: false,
        fromsneakpeak: true,
        user: null,
        error: false,
        userSelected: false,
        allUsersData: {},
        rateTimestamp: null,
      });
    case 'RESET_STATE':
      return Immutable.merge(state, {
        user: null,
        error: false,
        userSelected: false,
        allUsersData: {},
        firstChild: {name: 'NAME'},
        secondChild: {name: 'NAME'},
        thirdChild: {name: 'NAME'},
        firstChildSuccess: false,
        secondChildSuccess: false,
        thirdChildSuccess: false,
        temp_user: {},
      });

    case 'GET_COUNTRY':
      return Immutable.merge(state, {
        countryList: payload,
      });
    case 'ORIENTATION_TABLET':
      return Immutable.merge(state, {
        orientation: 'tablet',
        size: 1.5,
      });
    case 'ORIENTATION_MOBILE':
      return Immutable.merge(state, {
        orientation: 'mobile',
        size: 1,
      });

    case 'SET_PARENT_DATA':
      return Immutable.merge(state, {
        parent: payload,
      });

    case 'SET_SHOW_CONFIRM_PARENT_MODAL':
      return Immutable.merge(state, {
        showConfirmParentModal: action.doShow,
      });

    case 'SET_SIGNUP_COMPLETED':
      return Immutable.merge(state, {
        isSignupCompleted: true,
      });
    case 'MARK_SUBSCRIPTION_VALIDATED':
      var stateParent = _.cloneDeep(state.parent);

      if (stateParent && stateParent.id) {
        stateParent.subscription = 'completed';
      }

      return Immutable.merge(state, {
        parent: stateParent,
      });

    default:
      return state;
  }
}
