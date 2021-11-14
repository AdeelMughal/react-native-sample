import {Alert} from 'react-native';
import axios from 'axios';
import {DataHelper} from '../helpers';
import {kApiAllNotifications} from '../config/WebService';

export const getAllNotifications = () => {
  return (dispatch) => {
    axios.get(DataHelper.getCompleteUrl(kApiAllNotifications)).then((res) => {
      if (res.data.status === 'success') {
        dispatch({
          type: 'ALL_NOTIFICATIONS',
          payload: res.data.data,
        });
      }
    });
  };
};
