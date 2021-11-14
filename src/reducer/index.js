import {combineReducers} from 'redux';
import authReducer from './authReducer';
import booksReducer from './BooksReducer';
import SignUpReducer from './SignUpReducer';
import contentReducer from './contentReducer';
import generalReducer from './generalReducer';
import navigation from './navigation';
import notification from './notificationReducer';
import relatedBooksReducer from './relatedBooksReducer';
import searchBooksReducer from './searchBooksReducer';
import bookDetailsReducer from './bookDetailsReducer';
import glossaryReducer from './glossaryReducer';
import inAppReducer from './inAppReducer';

export default combineReducers({
  auth: authReducer,
  books: booksReducer,
  signup: SignUpReducer,
  content: contentReducer,
  general: generalReducer,
  navigation,
  notification,
  relatedBooks: relatedBooksReducer,
  searchBooks: searchBooksReducer,
  bookDetails: bookDetailsReducer,
  glossary: glossaryReducer,
  inApp: inAppReducer,
});
