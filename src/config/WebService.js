// export const betaServerURL = 'https://staging-admin.kidzlim.co.uk/';
export const betaServerURL = 'https://admin.kidzlim.co.uk/';
export const newServerURL = 'https://admin.kidzlim.co.uk/';

export const API_TIMEOUT = 60000;

// export const API = '/api';
export const API = '/api/v2';

export const kApiLogin = `${API}/login`;
export const kApiSignup = `${API}/signup`;
export const kApiVerifyCode = `${API}/verifycode`;
export const kApiForgotPassword = `${API}/forget-password`;
export const kApiChangePassword = `${API}/changepassword`;
export const kApiVerifyEmail = `${API}/verifyemail`;
export const kApiVerifyParentPassword = `${API}/verifyparentpassword`;

export const kApiSocialLoginSignup = `${API}/social-signup-login`;
export const kApiSocialLogin = `${API}/externalsignuplogin`;
export const kApiUpdateSocialProfile = `${API}/modifyexternalprofile`;

export const kApiCountrySearch = `${API}/countrysearch`;
export const kApiCountryList = `${API}/countrylist`;

export const kApiAvatar = `${API}/avatar`;
export const kApiGlossary = `${API}/glossary`;

export const kApiAddChild = `${API}/addchild`;
export const kApiGetAllChild = `${API}/getallchild`;
export const kApiGetChild = `${API}/getchild`;
export const kApiDeleteChild = `${API}/delchild`;
export const kApiParentProfile = `${API}/myprofile`;
export const kApiUpdateParent = `${API}/updateprofile`;
export const kApiUpdateChild = `${API}/updatechild`;

export const kApiGetHomeData = `${API}/home`;
export const kApiGetCategory = `${API}/category`;
export const kApiGetBooksByCatId = `${API}/booklistcatwise`;
export const kApiGetBooksByTopicId = `${API}/booklisttopicwise`;
export const kApiGetVideoList = `${API}/videolist`;
export const kApiBooksRead = `${API}/booksread`;
export const kApiGlossaryByLetter = `${API}/glossarybyletter`;
export const kApiGetAllBooks = `${API}/allbooks`;
export const kApiGetFeatured = `${API}/featured`;
export const kApiGetBooks = `${API}/getbooks`;
export const kApiBookPages = `${API}/bookpages2`;
export const kApiBookInside = `${API}/bookinside`;
export const kApiQuizList = `${API}/quizlist`;
export const kApiShowQuiz = `${API}/showquiz`;
export const kApiAddScore = `${API}/addscore`;
export const kApiSort = `${API}/sort`;
export const kApiQuickNavigation = `${API}/quicknavigation`;
// export const kApiSpeakPeekContent = `${API}/speakpeekcontent`;
export const kApiSpeakPeekContent = `${API}/welcome-screen-content`;
export const kApiAddUserFavTopics = `${API}/adduserfavouritetopics`;
export const kApiFavTopics = `${API}/favouritetopics`;

export const kApiAddFavBooks = `${API}/adduserfavouritebooks`;
export const kApiRemoveFavBooks = `${API}/delfavbooks`;

export const kApiGetRelatedBooks = `${API}/getrelatedbooksbyid`;

export const kApiGetFavBooks = `${API}/getfavouritebooks`;
export const kApiSearchBook = `${API}/booksearchbyname`;

export const kApiAddBookmarkBook = `${API}/bookmark`;
export const kApiGetBookmarkBooks = `${API}/getbookmark`;
export const kApiDeleteBookmark = `${API}/delbookmark`;

export const kApiGetBookFilters = `${API}/bookfilters`;
export const kApiPostBookRating = `${API}/addrating`;
export const kApiGetBookRating = `${API}/getrating`;

export const kApiGetStat = `${API}/getstat`;
export const kApiUpdateChildBookStats = `${API}/updatechildbookreadstatus`;
export const kApiChildBookStats = `${API}/getchildbookreadstatus`;
export const kApiAddBookReadCount = `${API}/bookreadcount`;
export const kApiAddBookStat = `${API}/addupdatestat`;
export const kApiGetGoodDeeds = `${API}/gooddeeds`;

export const kApiAllNotifications = `${API}/getnotifications`;

export const kApiSendFeedback = `${API}/sendhelpandfeedbackemail`;

// Content based
export const kApiPrivacyPolicy = `${API}/getprivacypolicy`;
export const kApiLaunchContent = `${API}/speakpeekcontent`;

export const kApiAddGlossaryFav = `${API}/addglossaryfav`;
export const kApiGetGlossaryFav = `${API}/getglossaryfav`;
export const kApiDeleteGlossaryFav = `${API}/delglossaryfav`;

export const kApiPostInAppPurchase = `${API}/inappreceiptvalidation`;

// export const kFBLogin = `${API}/auth/facebook/token`;
// export const kGoogleLogin = `${API}/auth/google/token`;

// export const kApiLogout = (accessToken) => {
//   return `${API}/users/logout?access_token=${accessToken}`;
// };

export const API_LOG = false;

export const ERROR_SOMETHING_WENT_WRONG = {
  title: 'Oh Shucks!',
  message: 'Unexpected error! Looks like we really need to look into this.',
  error: 1,
};

export const ERROR_NETWORK_NOT_AVAILABLE = {
  title: 'Oh Shucks!',
  message:
    'Slow or no internet connection. Please check your internet settings.',
  error: 1,
};

export const ERROR_UNAUTHORIZED = {
  title: 'Oops!',
  message: 'Never mind, but you are not authorized for this service.',
  error: 1,
};

export const ERROR_REQUEST_TIMEOUT = {
  title: 'Server coming slow!',
  message:
    'Looks like the server is taking too long to respond, please try again after a while.',
  error: 1,
};
