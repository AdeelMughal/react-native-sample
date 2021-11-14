import axios from 'axios';
var qs = require('qs');
import {DataHelper} from '../helpers';
import {kApiPostInAppPurchase} from '../config/WebService';

export const postIap = (data, callback) => (dispatch) => {
  dispatch({type: 'SET_REQUEST_IAP'});

  axios({
    method: 'post',
    url: DataHelper.getCompleteUrl(kApiPostInAppPurchase),
    data: data,
  })
    .then((response) => {
      if (response?.data?.reason === 'Receipt is validated successfully') {
        if (callback) {
          callback();
        }

        dispatch({type: 'MARK_SUBSCRIPTION_VALIDATED', data: {}});

        dispatch({type: 'SET_SUCCESS_IAP', data: response?.data?.reason});
      }
    })
    .catch((err) => {
      dispatch({type: 'SET_FAILURE_IAP', data: error});
    });
};
