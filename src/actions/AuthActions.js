import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {DataHelper} from '../helpers';

import {
  kApiCountryList,
  kApiCountrySearch,
  kApiAvatar,
  kApiGlossary,
  kApiAddChild,
  kApiSignup,
  kApiVerifyCode,
  kApiForgotPassword,
  kApiChangePassword,
  kApiLogin,
  kApiGetAllChild,
  kApiVerifyParentPassword,
  kApiSocialLogin,
  kApiSocialLoginSignup,
  kApiUpdateSocialProfile,
} from '../config/WebService';
import utils from '../util';

export const countryList = () => async (dispatch) => {
  const country = await AsyncStorage.getItem('country');

  if (country) {
    dispatch({type: 'GET_COUNTRY', payload: JSON.parse(country)});
    return 0;
  }

  fetch(DataHelper.getCompleteUrl(kApiCountryList))
    .then((res) => res.json())
    .then(async (data) => {
      await AsyncStorage.setItem('country', JSON.stringify(data?.data));
      dispatch({type: 'GET_COUNTRY', payload: data?.data});
    });
};

export const searchCountry = (name) => (dispatch) => {
  axios
    .post(DataHelper.getCompleteUrl(kApiCountrySearch), {name})
    .then((res) => {
      dispatch({type: 'GET_COUNTRY', payload: res.data.data});
    });
};

export const fetchUser = (user) => async (dispatch) => {
  dispatch({type: 'USER_DATA', payload: user});
};

export const fetchNav = (value) => async (dispatch) => {
  dispatch({type: 'CHANGE_NAVIGATION', payload: value});
};

export const getAllAvatars = () => (dispatch) => {
  axios
    .post(DataHelper.getCompleteUrl(kApiAvatar), {gender: 'male'})
    .then((res) => {
      dispatch({type: 'PARENTS_MALE_AVATAR', payload: res.data.data});
    });
  axios
    .post(DataHelper.getCompleteUrl(kApiAvatar), {gender: 'female'})
    .then((res) => {
      dispatch({type: 'PARENTS_FEMALE_AVATAR', payload: res.data.data});
    });
  axios
    .post(DataHelper.getCompleteUrl(kApiAvatar), {gender: 'boy'})
    .then((res) => {
      dispatch({type: 'CHILD_BOY_AVATAR', payload: res.data.data});
    });
  axios
    .post(DataHelper.getCompleteUrl(kApiAvatar), {gender: 'girl'})
    .then((res) => {
      console.log(res.data, 'CHILD_GIRL_AVATAR');
      dispatch({type: 'CHILD_GIRL_AVATAR', payload: res.data.data});
    });
};

export const registerChild = (user, navigation, allUsersData) => (dispatch) => {
  let data = {};

  if (user.fromCamera) {
    data = DataHelper.getImageFormData(user.image, 'image');
    delete user.image;
  }
  let queryString = new URLSearchParams(user).toString();

  axios({
    method: 'post',
    url: DataHelper.getCompleteUrl(kApiAddChild) + '?' + queryString,
    data,
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then((res) => {
      if (res?.data?.status == 'success') {
        let child = res?.data?.data;

        // dispatch({type: 'ADD_CHILD', payload: child});

        // if (allUsersData) {
        //   if (allUsersData?.child) {
        //     allUsersData.child = [...allUsersData.child, child];
        //   } else {
        //     allUsersData.child = [child];
        //   }

        //   dispatch({type: 'ALL_USERS_DATA', payload: allUsersData});
        // }

        dispatch({type: 'ADD_CHILD_IN_ARRAY', child});

        navigation(child.id); //res.data.data.id ==> customerid
      } else {
        dispatch({type: 'ERROR'});
        alert(res.data.reason);
      }
    })
    .catch((e) => {
      dispatch({type: 'ERROR'});
      alert('unable to add please try again later');
    });
};

export const registerUser = (user, navigation, navItems) => (dispatch) => {
  DataHelper.showLoader();

  let data = user.camera
    ? DataHelper.getImageFormData(navItems.image, 'image')
    : DataHelper.getImageFormData(
        navItems.selectedImage,
        'selectedImage',
        false,
      );

  let queryString = new URLSearchParams(user).toString();
  console.log('data in api: ', queryString);
  axios({
    method: 'post',
    url:
      DataHelper.getCompleteUrl(
        kApiSignup,
        // user.isSocialMediaSignup ? kApiSocialLoginSignup : kApiSignup,
      ) +
      '?' +
      queryString,
    data,
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then(async (data) => {
      DataHelper.hideLoader();
      if (data.data.status == 'success') {
        await AsyncStorage.setItem('user', JSON.stringify(data.data.data));

        // dispatch({type: 'SIGNUP_DATA', payload: data.data.data});

        //If user came from social media then he should not go to verify screen
        if (user.isSocialMediaSignup) {
        } else {
          navigation.navigate('verifyCode', data.data.data);
        }
      } else {
        dispatch({type: 'ERROR'});
        alert(data.data.reason);
      }
    })
    .catch((e) => {
      DataHelper.hideLoader();
      dispatch({type: 'ERROR'});
      alert('unable to add you please try again later');
    });
};

export const codeVerified = (user, navigation, navItems) => (dispatch) => {
  DataHelper.showLoader();

  axios
    .post(DataHelper.getCompleteUrl(kApiVerifyCode), user)
    .then(async (data) => {
      DataHelper.hideLoader();

      if (data.data.status == 'success') {
        const parentData = data.data.data;

        dispatch({type: 'SET_PARENT_DATA', payload: parentData});

        dispatch({type: 'SIGNUP_DATA', payload: parentData});
        navigation.navigate('confirmVerification', navItems);
      } else {
        dispatch({type: 'ERROR'});
        alert(data.data.reason);
      }
    })
    .catch((e) => {
      DataHelper.hideLoader();

      dispatch({type: 'ERROR'});
      alert('unable to add you please try again later');
    });
};

export const forgotPassword = (data, navigation) => (dispatch) => {
  DataHelper.showLoader();

  return axios
    .post(DataHelper.getCompleteUrl(kApiForgotPassword), data)
    .then((data) => {
      DataHelper.hideLoader();

      if (data.data.status == 'success') {
        utils.showToast('Reset email sent successfully.');

        navigation.navigate('Login');
        // return data.data;
      } else {
        dispatch({type: 'ERROR'});
        alert(data.data);
      }
    })
    .catch((e) => {
      DataHelper.hideLoader();

      dispatch({type: 'ERROR'});
      alert('unable to send your password.Please try again later');
    });
};

export const resetPassword = (email, navigation) => (dispatch) => {
  DataHelper.showLoader();
  console.log(email, 'email');
  return axios
    .post(DataHelper.getCompleteUrl(kApiChangePassword), email)
    .then(async (data) => {
      console.log(data, 'data');

      DataHelper.hideLoader();

      if (data.data.status == 'success' || data.data.status == 200) {
        return data.data;
      } else {
        dispatch({type: 'ERROR'});
        alert(data.data);
      }
    })
    .catch((e) => {
      DataHelper.hideLoader();

      dispatch({type: 'ERROR'});
      alert('unable to update your password.Please try again later');
    });
};

export const setUserSession = (user, userSelected, updateUser) => (
  dispatch,
) => {
  if (updateUser) {
    dispatch({type: 'USER_DATA', payload: user});
  }
};

export const setUserRateStamp = (data) => (dispatch) => {
  dispatch({type: 'TOGGLE_RATE_POPUP', payload: data});
};

export const loginUser = (user, navigation) => (dispatch) => {
  DataHelper.showLoader();

  axios
    .post(DataHelper.getCompleteUrl(kApiLogin), user)
    .then((pData) => {
      DataHelper.hideLoader();

      if (pData.data.status == 'success') {
        const parentData = pData.data.data;

        dispatch({type: 'SET_PARENT_DATA', payload: parentData});

        DataHelper.showLoader();

        DataHelper.invokeGetAllChildren(
          parentData,
          navigation,
          'SelectUserProfile',
        );
      } else {
        alert(data.data.reason);
      }
    })
    .catch((e) => {
      DataHelper.hideLoader();

      alert('unable to add you please try again later');
    });
};

export const getAllChildren = (parentData, navigation, navigateTo) => (
  dispatch,
) => {
  DataHelper.showLoader();

  axios
    .get(`${DataHelper.getCompleteUrl(kApiGetAllChild)}?id=${parentData.id}`)
    .then((data) => {
      DataHelper.hideLoader();

      if (data.data.status == 'success') {
        if (data.data.data.parent?.readers?.length) {
          const allUserData = data.data.data.parent;

          DataHelper.setUserSession(allUserData, false, true);

          dispatch({
            type: 'ALL_USERS_DATA',
            payload: {
              parent: data.data.data.parent,
              child: allUserData.readers,
            },
          });

          navigation.navigate(navigateTo);
        } else {
          DataHelper.setUserSession(parentData, true, true);
        }
      } else {
        alert('Some error occoured please try again later');
      }
    })
    .catch((e) => {
      DataHelper.hideLoader();

      alert('unable to add you please try again later');
    });
};

export const logout = () => (dispatch) => {
  dispatch({type: 'LOGOUT'});
};

export const verifyParent = (data) => (dispatch) => {
  let queryString = new URLSearchParams(data).toString();

  return axios({
    method: 'get',
    url:
      DataHelper.getCompleteUrl(kApiVerifyParentPassword) + '?' + queryString,
  })
    .then(async (data) => {
      return data.data.status;
    })
    .catch((e) => {
      console.log(e, '::::ERROR::::');
    });
};

//temperary methods

export const changeUserRole = () => (dispatch) => {
  dispatch({type: 'CHANGE_USER_ROLE'});
};

export const SneakPeakTheUser = () => (dispatch) => {
  dispatch({type: 'SNEAK_PEAK'});
};

export const removeSneakPeak = () => (dispatch) => {
  dispatch({type: 'NOT_SNEAK_PEAK'});
};

export const appInitialized = () => (dispatch) => {
  dispatch({type: 'APP_INITIALIZED'});
};

export const socialLogin = (smObject, platform, navigation) => (dispatch) => {
  DataHelper.showLoader();

  var data = {};

  data.apiobject = JSON.stringify(smObject);
  data.accessToken = smObject.accessToken || smObject.idToken;
  data.externalSource = platform;

  axios({
    method: 'post',
    url: DataHelper.getCompleteUrl(kApiSocialLogin),
    data,
  })
    .then(function (response) {
      DataHelper.hideLoader();

      const {data} = response;

      if (
        data &&
        data.data &&
        (data.data.status === 1 || data.data.status == 'success')
      ) {
        const userObject = data.data;

        dispatch({type: 'SET_PARENT_DATA', payload: userObject});

        dispatch({type: 'SIGNUP_DATA', payload: userObject});

        if (userObject.countrycode && userObject.gender) {
          DataHelper.invokeGetAllChildren(
            userObject,
            navigation,
            'SelectUserProfile',
          );
        } else {
          navigation.navigate('chooseAvatar', {
            isSocialMediaSignup: true,
            userObject,
          });
        }

        // navigation.navigate('confirmVerification', navItems);
      } else {
        dispatch({type: 'ERROR'});
        alert(data.data.reason);
      }
    })
    .catch((err) => {
      DataHelper.hideLoader();
      dispatch({type: 'ERROR'});
      alert('unable to add you please try again later');
    });
};

export const socialRegister = (smObject, platform, navigation) => (
  dispatch,
) => {
  console.log('data got in api function :', smObject, platform);

  // DataHelper.showLoader();

  // var data = {};

  // data.apiobject = JSON.stringify(smObject);
  // data.accessToken = smObject.accessToken || smObject.idToken;
  // data.externalSource = platform;

  // axios({
  //   method: 'post',
  //   url: DataHelper.getCompleteUrl(kApiSocialLogin),
  //   data,
  // })
  //   .then(function (response) {
  //     DataHelper.hideLoader();

  //     const {data} = response;

  //     if (
  //       data &&
  //       data.data &&
  //       (data.data.status === 1 || data.data.status == 'success')
  //     ) {
  //       const userObject = data.data;

  //       dispatch({type: 'SET_PARENT_DATA', payload: userObject});

  //       dispatch({type: 'SIGNUP_DATA', payload: userObject});

  //       if (userObject.countrycode && userObject.gender) {
  //         DataHelper.invokeGetAllChildren(
  //           userObject,
  //           navigation,
  //           'SelectUserProfile',
  //         );
  //       } else {
  //         navigation.navigate('chooseAvatar', {
  //           isSocialMediaSignup: true,
  //           userObject,
  //         });
  //       }

  //       // navigation.navigate('confirmVerification', navItems);
  //     } else {
  //       dispatch({type: 'ERROR'});
  //       alert(data.data.reason);
  //     }
  //   })
  //   .catch((err) => {
  //     DataHelper.hideLoader();
  //     dispatch({type: 'ERROR'});
  //     alert('unable to add you please try again later');
  //   });
};

export const updateSocialProfile = (user, navigation, imageData) => (
  dispatch,
) => {
  DataHelper.showLoader();

  var data;

  if (user.camera) {
    data = DataHelper.getImageFormDataSocial(
      imageData,
      imageData.image,
      'image',
    );
  } else {
    data = {};
    user.image = imageData.image;
    user.selectedImage = imageData.selectedImage;
  }

  delete user.secure;

  const query = new URLSearchParams(user).toString();

  axios({
    method: 'post',
    url: `${DataHelper.getCompleteUrl(kApiUpdateSocialProfile)}?${query}`,
    data: data,
  })
    .then((response) => {
      DataHelper.hideLoader();

      const {data} = response;

      if (
        data &&
        data.data &&
        (data.data.status === 1 || data.data.status == 'success')
      ) {
        const userObject = data.data;

        dispatch({type: 'SET_PARENT_DATA', payload: userObject});
        dispatch({type: 'SIGNUP_DATA', payload: userObject});

        DataHelper.invokeGetAllChildren(
          userObject,
          navigation,
          'SelectUserProfile',
        );
      }
    })
    .catch((err) => {
      DataHelper.hideLoader();
      dispatch({type: 'ERROR'});
      alert('unable to add you please try again later');
    });
};

export const resetUser = () => (dispatch) => {
  dispatch({type: 'RESET_STATE'});
};

export const setParentData = () => (dispatch) => {
  dispatch({type: 'SET_PARENT_DATA'});
};

export const showConfirmParentModal = (doShow) => (dispatch) => {
  dispatch({type: 'SET_SHOW_CONFIRM_PARENT_MODAL', doShow});
};

export const setSignupCompleted = () => (dispatch) => {
  dispatch({type: 'SET_SIGNUP_COMPLETED'});
};

export const setUserSelected = (userSelected) => (dispatch) => {
  dispatch({type: 'USER_SELECTED', payload: userSelected});
};
