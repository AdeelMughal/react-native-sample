import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isLoading: false,
  isBookAudioLoading: false,
  appSound: true,
  bookReaderSound: true,
  isAutoPlay: false,
  showIsChildLoggedInModal: false,
});

export default function (state = initialState, action) {
  const {data} = action;
  switch (action.type) {
    case 'SET_LOADER':
      return Immutable.merge(state, {
        isLoading: data.isLoading,
      });
    case 'SET_BOOK_AUDIO_LOADER':
      return Immutable.merge(state, {
        isBookAudioLoading: data.isLoading,
      });
    case 'SET_APP_SOUND':
      return Immutable.merge(state, {
        appSound: data.appSound,
      });
    case 'SET_AUTO_PLAY':
      return Immutable.merge(state, {
        isAutoPlay: data.isAutoPlay,
      });
    case 'SET_SHOW_IS_CHILD_LOGGED_IN':
      return Immutable.merge(state, {
        showIsChildLoggedInModal: data.doShow,
      });
    case 'SET_BOOK_READER_SOUND':
      return Immutable.merge(state, {
        bookReaderSound: data.doPlay,
      });
    default:
      return state;
  }
}
