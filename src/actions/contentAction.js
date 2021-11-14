import {Alert} from 'react-native';
import axios from 'axios';
import {
  kApiPrivacyPolicy,
  kApiSendFeedback,
  kApiLaunchContent,
  kApiSpeakPeekContent,
} from '../config/WebService';
import {DataHelper} from '../helpers';

export const getContent = () => {
  return (dispatch) => {
    axios.get(DataHelper.getCompleteUrl(kApiSpeakPeekContent)).then((res) => {
      console.log('welcom screen content: ', res);
      dispatch({
        type: 'LAUNCH_VIDEO',
        payload: res?.data?.data?.video,
      });
    });
  };
};

export const getPrivacyPolicy = () => {
  return (dispatch) => {
    axios.get(DataHelper.getCompleteUrl(kApiPrivacyPolicy)).then((res) => {
      if (res.data.status === 'success') {
        dispatch({
          type: 'PRIVACY_POLICY',
          payload: res.data.data,
        });
      }
    });
  };
};

export const sendFeedback = (data) => {
  return (dispatch) => {
    let queryString = new URLSearchParams(data).toString();

    let query = DataHelper.getCompleteUrl(kApiSendFeedback) + '?' + queryString;
    return axios({
      method: 'post',
      url: query,
    })
      .then((res) => {
        if (res.data.status === 'success') return res.data.status;
        else return {error: 'Could not send feedback'};
      })
      .catch((e) => {
        return {error: 'Could not send feedback'};
      });
  };
};

export const getLaunchContent = () => {
  return (dispatch) => {
    return axios({
      method: 'get',
      // url: DataHelper.getCompleteUrl(kApiLaunchContent), //old strategy
      url: DataHelper.getCompleteUrl(kApiSpeakPeekContent),
    })
      .then((res) => {
        if (res.data.status === 'success') {
          dispatch({
            type: 'LAUNCH_CONTENT',
            payload: res.data.data,
          });
        } else return {error: 'Unable to load launch content'};
      })
      .catch((e) => {
        return {error: 'Unable to load launch content'};
      });
  };
};
