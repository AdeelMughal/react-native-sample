import axios from 'axios';
var qs = require('qs');
import {DataHelper} from '../helpers';
import {kApiSearchBook} from '../config/WebService';

export const searchBook = (word) => (dispatch) => {
  if (word.length > 3) {
    dispatch({type: 'SET_REQUEST_SEARCH_BOOKS'});

    axios
      .get(DataHelper.getCompleteUrl(kApiSearchBook), {
        params: {word},
      })
      .then((res) => {
        dispatch({type: 'SET_SUCCESS_SEARCH_BOOKS', data: res?.data?.data});
      })
      .catch((err) => {
        dispatch({type: 'SET_FAILURE_SEARCH_BOOKS', data: error});
      });
  }
};
