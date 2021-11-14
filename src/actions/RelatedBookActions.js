import axios from 'axios';
var qs = require('qs');
import {DataHelper} from '../helpers';
import {kApiGetRelatedBooks} from '../config/WebService';

export const getRelatedBooks = (bookid) => (dispatch) => {
  dispatch({type: 'SET_REQUEST_RBOOKS'});

  axios
    .get(DataHelper.getCompleteUrl(kApiGetRelatedBooks), {
      params: {bookid},
    })
    .then((res) => {
      dispatch({type: 'SET_SUCCESS_RBOOKS', data: res?.data?.data});
    })
    .catch((err) => {
      dispatch({type: 'SET_FAILURE_RBOOKS', data: error});
    });
};
