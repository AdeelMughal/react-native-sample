import axios from 'axios';
import {DataHelper} from '../helpers';
import {
  kApiDeleteChild,
  kApiGetChild,
  kApiParentProfile,
  kApiGetAllChild,
  kApiUpdateParent,
  kApiUpdateChild,
} from '../config/WebService';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

export const fetchChild = (childId) => {
  return (dispatch) => {
    axios
      .get(`${DataHelper.getCompleteUrl(kApiGetChild)}?childid=${childId}`)
      .then((res) => {
        // dispatch({
        //   type: 'LAUNCH_VIDEO',
        //   payload: res.data.data.video,
        // });
      });
  };
};

export const updateChild = (data) => {
  return (dispatch) => {
    axios
      .get(`${DataHelper.getCompleteUrl(kApiGetChild)}?childid=${childId}`)
      .then((res) => {
        // dispatch({
        //   type: 'LAUNCH_VIDEO',
        //   payload: res.data.data.video,
        // });
      });
  };
};

export const deleteChild = (childId, allUsersData) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${DataHelper.getCompleteUrl(kApiDeleteChild)}?id=${childId}`,
    })
      .then((res) => {
        if (res.data.status == 'success') {
          //make clone

          dispatch({type: 'DELETE_CHILD_IN_ARRAY', childId});
        }

        return {success: 'Child account deleted successfully!'};
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  };
};

export const fetchAllUsers = () => {
  return async (dispatch) => {
    let userData = DataHelper.getParentData();

    return axios
      .get(DataHelper.getCompleteUrl(kApiGetAllChild), {
        params: {id: userData.id},
      })

      .then((res) => {
        if (res.data.status === 'success') {
          const parentData = res.data.data.parent;

          dispatch({type: 'SET_PARENT_DATA', payload: parentData});

          if (parentData?.readers?.length) {
            userData.readers = parentData?.readers;

            dispatch({
              type: 'ALL_USERS_DATA',
              payload: {parent: parentData, child: parentData.readers},
            });
          } else {
            dispatch({type: 'ALL_USERS_DATA', payload: {parent: parentData}});
          }
        }
      })
      .catch((err) => {
        console.log(err, 'Error');
      });
  };
};

export const updateProfile = (data, isParent, image) => {
  return (dispatch) => {
    // Lets make the urls
    const query = new URLSearchParams(data).toString();
    const base = isParent ? kApiUpdateParent : kApiUpdateChild;

    let formData = image ? DataHelper.getImageFormData(image, 'image') : {};

    return axios({
      method: 'post',
      url: `${DataHelper.getCompleteUrl(base)}?${query}`,
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then((res) => {
        if (res.data.status === 'success') {
          // lets Grab the data here
          let user = DataHelper.getUserObject();
          let updatedData = res.data.data;

          // check if parent
          if (isParent) {
            DataHelper.updateParentData(updatedData, dispatch);
          } else {
            //if child
            DataHelper.updateChildData(updatedData, dispatch);
          }

          //check if the current user has done update
          if (user.id === updatedData.id) {
            dispatch({type: 'USER_DATA', payload: updatedData});
          }

          return {status: 'success', reason: 'Profile Updated successfully'};
        } else {
          return res.data;
        }
      })
      .catch((err) => {
        console.log(err, 'Error in update profile');
        return {status: 'failure', reason: 'Unable to update profile'};
      });
  };
};
