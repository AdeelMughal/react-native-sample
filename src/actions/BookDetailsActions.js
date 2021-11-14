import axios from 'axios';
var qs = require('qs');
import {DataHelper} from '../helpers';
import {kApiBookPages} from '../config/WebService';
import utils from '../util';

export const getBookDetails = (id) => (dispatch) => {
  DataHelper.showLoader();

  dispatch({type: 'SET_REQUEST_BOOK_DETAILS'});

  axios
    .post(`${DataHelper.getCompleteUrl(kApiBookPages)}?id=${id}`)
    .then((res) => {
      DataHelper.hideLoader();

      dispatch({type: 'SET_SUCCESS_BOOK_DETAILS', data: res?.data?.data[0]});
    })
    .catch((err) => {
      DataHelper.hideLoader();

      utils.showToast('Error loading the book');

      dispatch({type: 'SET_FAILURE_BOOK_DETAILS', data: error});
    });
};
