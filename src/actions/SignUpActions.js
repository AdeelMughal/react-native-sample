import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {DataHelper} from '../helpers';
import {
  kApiAvatar,
  kApiAddUserFavTopics,
  kApiFavTopics,
} from '../config/WebService';
import _ from 'lodash';

const qs = require('qs');

export const getAvatarMale = () => {
  return (dispatch) => {
    axios
      .post(
        DataHelper.getCompleteUrl(kApiAvatar),
        qs.stringify({
          gender: 'male',
        }),
      )
      .then((data) => {
        dispatch({
          type: 'MALE_AVATAR',
          payload: data.data.data,
        });
      })
      .catch((err) => {});
  };
};
export const getAvatarFemale = () => {
  return (dispatch) => {
    axios
      .post(
        DataHelper.getCompleteUrl(kApiAvatar),
        qs.stringify({
          gender: 'female',
        }),
      )
      .then((data) => {
        dispatch({
          type: 'FEMALE_AVATAR',
          payload: data.data.data,
        });
      })
      .catch((err) => {});
  };
};

export const addTopics = (topics, id, navigation) => (dispatch) => {
  let query = `${DataHelper.getCompleteUrl(
    kApiAddUserFavTopics,
  )}?topicid=[${topics}]&customerid=${id}`;

  return axios({
    method: 'post',
    url: query,
  })
    .then((res) => {
      if (res.data.status === 'success') {
        let allUsersData = DataHelper.getAllUsersData();
        let allChild = allUsersData?.child;
        const topicsData = res.data.data;

        dispatch({type: 'ADD_TOPICS', payload: topicsData});

        if (allChild.length) {
          allChild.find((el) => el.id == id).favoritetopics = topicsData;

          dispatch({type: 'ALL_USERS_DATA', payload: allUsersData});
        }

        return {status: 'success', reason: 'Child has been added successfully'};
      } else {
        return res.data;
      }
      // Alert.alert('child has been added successfully', '', [
      //   {
      //     text: 'ok',
      //     onPress: () => {
      //       navigation.navigate('confirmVerification', {
      //         showAddModal: true,
      //       });
      //     },
      //   },
      // ]);
    })
    .catch((err) => {
      return {error: err};
      console.log(err, 'ERROR');
    });
};

export const getTopics = () => {
  return (dispatch) => {
    axios.get(DataHelper.getCompleteUrl(kApiFavTopics)).then((res) => {
      if (res.data.status === 'success') {
        dispatch({
          type: 'GET_TOPICS',
          payload: res.data.data,
        });
      }
    });
  };
};
