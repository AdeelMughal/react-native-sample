import {Alert} from 'react-native';
import axios from 'axios';
import {
  kApiAddGlossaryFav,
  kApiDeleteGlossaryFav,
  kApiGetGlossaryFav,
  kApiGlossary,
  kApiGlossaryByLetter,
} from '../config/WebService';
import {DataHelper} from '../helpers';

export const getAllGlossary = () => (dispatch) => {
  fetch(DataHelper.getCompleteUrl(kApiGlossary))
    .then((res) => res.json())
    .then((res) => {
      dispatch({type: 'SET_SUCCESS_GLOSSARY', payload: res.data});
    });
};

export const searchGlossary = (letter) => (dispatch) => {
  axios
    .get(DataHelper.getCompleteUrl(`${kApiGlossaryByLetter}?letter=${letter}`))
    .then((res) => {
      dispatch({type: 'SET_SUCCESS_SEARCH', payload: res.data.data});
    });
};

export const markGlossaryFavorite = (data, navigation) => (dispatch) => {
  DataHelper.showLoader();

  dispatch({type: 'SET_REQUEST_GLOSSARY'});

  axios({
    method: 'post',
    url: DataHelper.getCompleteUrl(kApiAddGlossaryFav),
    data,
  })
    .then((response) => {
      DataHelper.hideLoader();

      const {data} = response;
    })
    .catch((err) => {
      DataHelper.hideLoader();

      dispatch({type: 'SET_FAILURE_GLOSSARY', data: error});
    });
};

export const deleteGlossaryFavorite = (data, navigation) => (dispatch) => {
  DataHelper.showLoader();

  dispatch({type: 'SET_REQUEST_GLOSSARY'});

  axios({
    method: 'post',
    url: DataHelper.getCompleteUrl(kApiDeleteGlossaryFav),
    data,
  })
    .then((response) => {
      DataHelper.hideLoader();

      const {data} = response;
    })
    .catch((err) => {
      DataHelper.hideLoader();

      dispatch({type: 'SET_FAILURE_GLOSSARY', data: error});
    });
};

export const getGlossaryFavorite = (data, navigation) => (dispatch) => {
  DataHelper.showLoader();

  dispatch({type: 'SET_REQUEST_GLOSSARY'});

  axios
    .post(
      DataHelper.getCompleteUrl(
        `${kApiGetGlossaryFav}?childid=${data.childid}`,
      ),
    )
    .then((response) => {
      DataHelper.hideLoader();

      dispatch({type: 'SET_SUCCESS_GLOSSARY_FAVS', data: response?.data?.data});
    })
    .catch((err) => {
      DataHelper.hideLoader();

      dispatch({type: 'SET_FAILURE_GLOSSARY', data: error});
    });
};

export const glossaryAddToFavsLocal = (glossaryObject, userId) => (
  dispatch,
) => {
  dispatch({
    type: 'GLOSSARY_ADD_TO_FAVORITES_LOCAL',
    data: {glossaryObject, userId},
  });
};

export const glossaryRemoveFromFavsLocal = (glossaryObject) => (dispatch) => {
  dispatch({
    type: 'GLOSSARY_REMOVE_FROM_FAVORITES_LOCAL',
    data: {glossaryObject},
  });
};
