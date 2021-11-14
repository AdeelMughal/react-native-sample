// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';

import { areEqual } from '../../util/commonUtils';
import { Metrics, Colors, Fonts, Images } from '../../theme';

export default UserAvatarTickControl = React.memo((props) => {
  const { userImage, style, imageStyle, tickStyle, showTick, localImg } = props;

  renderGreenTick = () => {
    if (showTick) {
      return (
        <FastImage
          style={[styles.tickStyle, tickStyle]}
          source={Images.asset13}
        />
      );
    }

    return null;
  };

  return (
    <View style={[styles.container, style]}>
      <FastImage
        style={[styles.imageStyle, imageStyle]}
        source={
          localImg
            ? userImage
            : {
              uri: userImage,
              priority: FastImage.priority.high,
            }
        }></FastImage>
      {renderGreenTick()}
    </View>
  );
}, areEqual);

UserAvatarTickControl.propTypes = {
  userImage: PropTypes.string,
  style: PropTypes.object,
  imageStyle: PropTypes.object,
  tickStyle: PropTypes.object,
  showTick: PropTypes.bool,
  localImg: PropTypes.bool,
};

UserAvatarTickControl.defaultProps = {
  localImg: false,
  showTick: false,
  userImage:
    'https://admin.kidzlim.co.uk/mediafiles/avatar/male/1620292216.',
  style: {},
  imageStyle: {},
  tickStyle: {},
};
