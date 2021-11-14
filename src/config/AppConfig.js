import {Platform} from 'react-native';

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  allowIQKeyboardManager: true,
  allowIQKeyboardManagerToolbar: true,
  pagingRecordsPerPage: 15,
  timeZone: (-1 * new Date().getTimezoneOffset()) / 60,
  appDownloadLink: '',
  gMapAPIKey: '',
};
