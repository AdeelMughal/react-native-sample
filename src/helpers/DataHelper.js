import {LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
// import { Actions } from "react-native-router-flux";

// import { logout, request as userRequest } from "../actions/UserActions";
import {betaServerURL, newServerURL} from '../config/WebService';
import utils from '../util';
import {
  setLoader,
  setBookAudioLoader,
  setBookReaderSound,
} from '../actions/generalActions';
import {showConfirmParentModal} from '../actions/AuthActions';
import {
  setUserRateStamp,
  setUserSession,
  logout,
  removeSneakPeak,
  getAllChildren,
} from '../actions/AuthActions';
import {getAllNotifications} from '../actions/NotificationActions';
import {getPrivacyPolicy} from '../actions/contentAction';
import {
  updateBookReadCount,
  updateChildBookReadStatus,
} from '../actions/BooksActions';

import AsyncStorage from '@react-native-community/async-storage';
import {Linking} from 'react-native';
import _ from 'lodash';
import {searchGlossary} from '../actions/GlossaryActions';

class DataHelper {
  store = undefined;

  setStore(store) {
    this.store = store;
  }

  getStore() {
    return this.store;
  }

  getAuthState = () => {
    return this.store && this.store.getState()
      ? this.store.getState().auth
      : undefined;
  };

  getBookState = () => {
    return this.store && this.store.getState()
      ? this.store.getState().books
      : undefined;
  };

  getAccessToken = () => {
    // const user =
    //   this.store && this.store.getState()
    //     ? this.store.getState().user
    //     : undefined;

    // if (user && user.data && user.data.accessToken) {
    //   return user.data.accessToken;
    // }

    return undefined;
  };

  isUserAuthenticated = () => {
    const auth = this.getAuthState();

    return auth?.user?.id !== undefined;
  };

  isProfileComplete = () => {
    const parent = this.getParentData();

    if (parent && (parent.countrycode || parent.countryid)) {
      return true;
    }

    return false;
  };

  getUserObject = () => {
    const auth = this.getAuthState();

    if (auth && auth.user && !utils.isObjectEmpty(auth.user)) {
      return auth.user;
    }

    return undefined;
  };

  setUserRateStamp = (rateStamp) => {
    const auth = this.getAuthState();
    if (auth?.user?.id && auth?.userSelected) {
      this.store.dispatch(setUserRateStamp(rateStamp));
    }
  };

  setUserSession = (user, userSelected, updateUser) => {
    this.store.dispatch(setUserSession(user, userSelected, updateUser));
  };

  isChildLoggedIn = () => this.store?.getState()?.auth?.user?.parent;

  isChildrenAdded = () => {
    return this.store?.getState()?.auth?.allUsersData?.child?.length > 0;
  };

  getAllUsersArray = () => {
    const auth = this.getAuthState();

    if (auth?.allUsersData) {
      let clone = _.clone(auth.allUsersData);

      if (!clone.parent) {
        clone.parent = this.getParentData();
      }

      const temp = Object.values(clone).flat();

      return temp;
    }

    return undefined;
  };

  getAllUsersData = () => {
    const auth = this.getAuthState();

    if (auth?.allUsersData) {
      let clone = _.cloneDeep(auth.allUsersData);

      if (!clone.parent) {
        clone.parent = this.getParentData();
      }

      return clone;
    }

    return undefined;
  };

  getParentData = () => {
    const auth = this.getAuthState();

    return auth?.parent;
  };

  getChildData = () => {
    const auth = this.getAuthState();

    if (auth?.allUsersData?.child) {
      let clone = _.clone(auth?.allUsersData?.child);
      return clone;
    }

    return undefined;
  };

  updateParentData = (data, dispatch) => {
    let allUsersData = this.getAllUsersData();
    let user = this.getUserObject();

    allUsersData.parent = data;
    dispatch({type: 'ALL_USERS_DATA', payload: allUsersData});
  };

  updateChildData = (data, dispatch) => {
    let allUsersData = this.getAllUsersData();
    let allChild = this.getChildData();

    allChild[allChild.findIndex((el) => el.id === data.id)] = data;
    allUsersData.child = allChild;

    dispatch({type: 'ALL_USERS_DATA', payload: allUsersData});
  };

  logoutUser = async () => {
    AsyncStorage.removeItem('user');

    this.store.dispatch(logout());
    this.store.dispatch(removeSneakPeak());

    LoginManager.logOut();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  };

  showLoader = () => {
    this.store.dispatch(setLoader(true));
  };

  hideLoader = () => {
    this.store.dispatch(setLoader(false));
  };

  showAudioLoader = () => {
    this.store.dispatch(setBookAudioLoader(true));
  };

  hideAudioLoader = () => {
    this.store.dispatch(setBookAudioLoader(false));
  };

  setBookReaderSound = (doPlay) => {
    this.store.dispatch(setBookReaderSound(doPlay));
  };

  setShowConfirmParentModal = (doShow) => {
    this.store.dispatch(showConfirmParentModal(doShow));
  };

  getServiceUrl = () => {
    return newServerURL;
  };

  getCompleteUrl = (route) => {
    return this.getServiceUrl() + route;
  };

  getProfileImage = (img) => {
    return typeof img === 'string' ? img : img.uri;
  };

  getImageFormData = (img, keyName, file = true) => {
    let imgFile = _.clone(img);
    // console.log('Img file', imgFile, file);
    // if (file) {
    // let imageType = this.getImageType(imgFile.name);
    //   imgFile.type = imageType;
    // }
    // const formData = new FormData();
    // formData.append(keyName, imgFile);
    // return formData;
  };

  getImageFormDataSocial = (data, imgFile, keyName, file = true) => {
    if (file) {
      let imageType = this.getImageType(imgFile.name);
      imgFile.type = imageType;
    }
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  };

  getImageType = (file) => {
    let ext = file.slice(((file.lastIndexOf('.') - 1) >>> 0) + 2);
    return 'image/' + ext;
  };

  getAllNotifications = () => async (dispatch) => {
    try {
      dispatch(getAllNotifications());
    } catch (error) {
      console.log(error, 'error');
    }
  };

  getPrivacyPolicy = () => async (dispatch) => {
    try {
      dispatch(getPrivacyPolicy());
    } catch (error) {
      console.log(error, 'error');
    }
  };

  urlRedirecter = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert('Unable to open URI: ' + url);
      }
    });
  };

  invokeGetAllChildren = (parentData, navigation, navigateTo) => {
    this.store.dispatch(getAllChildren(parentData, navigation, navigateTo));
  };

  avatarsWithUserImage = (img, avatarStateName) => {
    const auth = this.getAuthState();

    if (auth[avatarStateName]) {
      return img
        ? [{image: img, selected: img, id: -1}, ...auth[avatarStateName]]
        : [...auth[avatarStateName]];
    }
    return null;
  };

  isCustomImg = (img) => img && img.search('custom') > -1;

  getAvatarId = (url, userType) => {
    let checkCustomImg = this.isCustomImg(url);
    if (checkCustomImg) return -1;

    const auth = this.getAuthState();

    let avatars =
      userType === 'parent'
        ? [...auth?.fatherAvatar, ...auth?.motherAvatar]
        : [...auth?.girlAvatar, ...auth?.boyAvatar];
    return avatars.find((_) => _.selected === url)?.id;
  };

  getAutoPlayMode = () => {
    const general =
      this.store && this.store.getState()
        ? this.store.getState().general
        : undefined;

    if (general) {
      return general.isAutoPlay;
    }

    return false;
  };

  // isChildLoggedIn = () => {
  //   const auth =
  //     this.store && this.store.getState()
  //       ? this.store.getState().auth
  //       : undefined;

  //   if (auth && auth.user && auth.user.parent) {
  //     return true;
  //   }

  //   return false;
  // };

  onBookFinish = (data) => {
    let books = this.getBookState();
    let checkBook = books.childBookStats.findIndex(
      (el) => el.bookid === data.bookid,
    );
    if (checkBook < 0) {
      data.isbookread = 1;
      this.store.dispatch(updateChildBookReadStatus(data));
    }
  };

  onBookOpen = ({bookid, readcount, childid}) => {
    this.store.dispatch(updateBookReadCount({bookid, readcount}));
  };

  isBookFavorite = (bookObject) => {
    const favBooks = this.store.getState()?.books?.favourites;

    if (favBooks && favBooks.length > 0) {
      const foundIndex = favBooks.findIndex(
        (thisEl) => thisEl.id === bookObject.id,
      );

      return foundIndex > -1;
    }

    return false;
  };

  // isGlossaryFavorite = (glossaryObject) => {
  //   const favGlossary = this.store.getState()?.glossary?.favorites;

  //   if (favGlossary && favGlossary.length > 0) {
  //     const foundIndex = favGlossary.findIndex(
  //       (thisEl) => thisEl.glossaryid === glossaryObject.id,
  //     );

  //     return foundIndex > -1;
  //   }

  //   return false;
  // };

  isSignupCompleted = () => {
    const auth = this.getAuthState();

    return auth?.isSignupCompleted;
  };

  getCategoryIconForCategoryId = (categoryId) => {
    categoryId =
      Array.isArray(categoryId) && categoryId.length > 0
        ? categoryId[0]
        : categoryId;

    const categories = this.store.getState()?.books?.categories;

    const searchIndex = categories.findIndex(
      (thisEl) => thisEl.categoryinfo.id === categoryId,
    );

    if (searchIndex > -1) {
      return {
        icon: categories[searchIndex].categoryinfo.icon,
        name: categories[searchIndex].categoryinfo.name,
      };
    }

    return undefined;
  };

  getCategoryIconFromCategoryObect = (categoryObject) => {
    if (categoryObject && categoryObject.length > 0) {
      return categoryObject[0]?.categoryinfo?.icon;
    }

    return undefined;
  };

  getPageSound = (pageId) => {
    const bookPages = this.store.getState()?.books?.pages;

    const filterRecord = bookPages.filter((thisEl) => {
      return thisEl.pageid === pageId; //&& thisEl.pagenumber === pageNumber;
    });

    if (filterRecord && filterRecord.length > 0) {
      if (
        filterRecord[0] &&
        filterRecord[0].content &&
        filterRecord[0].content.length > 0 &&
        filterRecord[0].content[0].audio
      ) {
        return filterRecord[0].content[0].audio;
      }
    }

    return undefined;
  };

  isTopicSelectedForChild = () => {
    const children = this.getChildData();

    if (children && children.length > 0) {
      const child = children[0];

      if (child && child.favoritetopics && child.favoritetopics.length > 0) {
        return true;
      }
    }

    return false;
  };

  isSubscribed = () => {
    // return true; // todo:
    const parentData = this.getParentData();

    // if (parentData?.email === 'firdous.ali.tp@gmail.com') {
    //   return true;
    // }

    if (
      parentData?.subscription &&
      parentData?.subscription.length > 0 &&
      parentData?.subscription !== 'pending'
    ) {
      return true;
    }

    return false;
  };

  getGlossaryObjectFromId = (glossaryId) => {
    const glossaryList = this.store.getState()?.glossary?.data;

    if (glossaryList && glossaryList.length > 0) {
      const searchResult = glossaryList.find(
        (thisEl) => thisEl.id === glossaryId,
      );

      return searchResult;
    }

    return undefined;
  };

  isAppSoundEnabled = () => {
    const generalSettings = this.store?.getState()?.general;

    return generalSettings?.appSound;
  };

  isSneakPeek = () => {
    const authState = this.getAuthState();

    return authState.sneakpeak;
  };
}

export default new DataHelper();
