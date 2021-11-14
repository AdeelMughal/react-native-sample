import {Alert} from 'react-native';

export const setLoader = (isLoading) => (dispatch) => {
  dispatch({type: 'SET_LOADER', data: {isLoading}});
};

export const setBookAudioLoader = (isLoading) => (dispatch) => {
  dispatch({type: 'SET_BOOK_AUDIO_LOADER', data: {isLoading}});
};

export const setSound = (appSound) => (dispatch) => {
  dispatch({type: 'SET_APP_SOUND', data: {appSound}});
};

export const setAutoPlay = (isAutoPlay) => (dispatch) => {
  dispatch({type: 'SET_AUTO_PLAY', data: {isAutoPlay}});
};

export const setShowIsChildLoggedInModal = (doShow) => (dispatch) => {
  dispatch({type: 'SET_SHOW_IS_CHILD_LOGGED_IN', data: {doShow}});
};

export const setBookReaderSound = (doPlay) => (dispatch) => {
  dispatch({type: 'SET_BOOK_READER_SOUND', data: {doPlay}});
};
