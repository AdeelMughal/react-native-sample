import React from 'react';

import _ from 'lodash';

class CommonUtils {
  roundOf = (number) => {
    return Math.round(number);
  };

  isCustomAvatar = (imageUri) => {
    if (
      imageUri?.indexOf('male') > -1 ||
      imageUri?.indexOf('female') > -1 ||
      imageUri?.indexOf('boy') > -1 ||
      imageUri?.indexOf('girl') > -1
    ) {
      return false;
    }

    return true;
  };

  getBookLikeObject = (bookObject) => {
    const {
      featuredimagemobile,
      featuredimagetablet,
      featureorder,
      id,
      image,
      name,
      ordernumber,
      overview,
      pages,
      rating,
      readcount,
      status,
    } = bookObject?.book;

    const bookLikeObject = {
      IsFeaturedImageForCategory: 0,
      IsFeaturedImageForHome: 0,
      IsPages: 1,
      IsQuiz: 0,
      catid: [bookObject.catid],
      featuredimagemobile,
      featuredimagetablet,
      featureorder,
      id,
      image,
      name,
      ordernumber,
      overeview: overview,
      pages,
      rating,
      readcount,
      status,
    };

    return bookLikeObject;
  };
}

export default new CommonUtils();

export function areEqual(prevProps, nextProps) {
  return _.isEqual(prevProps, nextProps);
}

export function prefixRemover(iconName) {
  return iconName.slice(6);
}
