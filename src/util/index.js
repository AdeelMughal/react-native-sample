// @flow
import {Platform, Alert, ToastAndroid, NativeModules} from 'react-native';
import moment from 'moment';
import VersionNumber from 'react-native-version-number';
import _ from 'lodash';

import {timeZone} from '../config/AppConfig';
// import DeviceInfo from "react-native-device-info";

const {RNNativeIOSToast} = NativeModules;

class Util {
  checkVersionUpdate = (data) => {
    const appVer = this.getAppVersion();

    if (parseFloat(appVer) < parseFloat(data.minAppVersion)) {
      return true;
    } else return false;
  };

  getAppVersion = () => {
    return VersionNumber.appVersion;
  };

  getBuildVersion = () => {
    return VersionNumber.buildVersion;
  };

  keyExtractor = (item: Object, index: number) => index;

  getPlatform = () => Platform.OS;

  isPlatformAndroid() {
    return Platform.OS === 'android';
  }

  isValidURL(url: 'string') {
    const re = /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }

  isEmailValid(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isPasswordValid(password: string) {
    return password.length > 5;
  }

  getValidImage(image: any) {
    if (typeof image === 'string' && this.isValidURL(image)) {
      return {uri: image};
    }
    // if (typeof image === "string" && !this.isValidURL(image)) {
    //   return require(image);
    // }
    return image;
  }

  shortenString = (str, limit = 8) => {
    if (str.length > limit) {
      return str.substring(0, limit) + '..';
    }

    return str;
  };

  stringCapitalize(str) {
    if (str && str.length > 0)
      return str.charAt(0).toUpperCase() + str.slice(1);

    return '';
  }

  isJSDebugMode() {
    return typeof atob !== 'undefined';
  }

  isRelease() {
    return !(this.isJSDebugMode() || __DEV__);
  }

  showAlertWithDelay(title, message, delay = 500) {
    setTimeout(() => {
      Alert.alert(
        title,
        message,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }, delay);
  }

  showYesNoMessageForObject(messageObject, onYes, onNo) {
    setTimeout(() => {
      Alert.alert(
        messageObject.title,
        messageObject.message,
        [
          {
            text: 'Yes',
            onPress: onYes,
          },
          {
            text: 'No',
            onPress: onNo,
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }, 500);
  }

  showYesNoMessage(title, message, onYes, onNo) {
    setTimeout(() => {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'Yes',
            onPress: onYes,
          },
          {
            text: 'No',
            onPress: onNo,
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }, 500);
  }

  getDateFrom(givenDate: string) {
    return moment(givenDate).add(timeZone, 'hours').fromNow();
  }

  getFloat(value) {
    let converted = parseFloat(value);

    if (converted && typeof converted == 'number') return converted;

    return 0.0;
  }

  // isTablet() {
  //   return DeviceInfo.isTablet();
  // }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  showToast(message: String) {
    if (this.isPlatformAndroid()) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      RNNativeIOSToast.showToast(message);
    }
  }

  isObjectEmpty(objectToCheck) {
    return Object.keys(objectToCheck).length === 0;
  }

  extractIntegers(text) {
    if (/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(text) || text == '') {
      return text;
    }

    return '';
  }
  secondsToTime(time) {
    return ~~(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + (time % 60);
  }

  getUpdatedGlossary = (sneakpeak, books) => {
    if (sneakpeak) {
      let list = !_.isEmpty(books.letterGlossary) ? books.letterGlossary : [];
      const size = 1;
      return list.slice(0, size);
    } else {
      return !_.isEmpty(books.letterGlossary) ? books.letterGlossary : [];
    }
  };

  checkSneakPeak = (sneakpeak, glossaryList) => {
    if (sneakpeak && glossaryList.length < 2 && glossaryList.length != 0) {
      return true;
    } else {
      return false;
    }
  };

  truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  consoleLog = (data) => {
    if (!this.isRelease()) {
      console.log(data);
    }
  };
}

export default new Util();
