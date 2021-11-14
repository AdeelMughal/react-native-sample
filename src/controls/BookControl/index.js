import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text} from '../../components';
import {Images, Colors} from '../../theme';
import styles from './styles';

const BookControl = ({
  text,
  image,
  disabled,
  image2,
  isMain,
  onPress,
  route,
  secondBtnPress,
  sound,
  data,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        if (onPress && data) {
          onPress(route, {type: text, bookId: data.id, itemData: data});
        }
      }}
      style={[
        styles.container,
        {
          backgroundColor: isMain ? Colors.Yellow : Colors.white,
          padding: isMain ? 10 : 5,
        },
      ]}>
      <View style={styles.icon1}>
        <FastImage
          style={[isMain ? styles.iconSm : styles.icon1Image]}
          resizeMode={FastImage.resizeMode.contain}
          source={image}
        />
      </View>
      <View style={styles.title}>
        <Text color={isMain ? Colors.white : Colors.Blue}>{text}</Text>
      </View>
      {isMain && (
        <TouchableOpacity
          onPress={() => {
            if (secondBtnPress) {
              secondBtnPress(sound);
            }
          }}
          style={styles.icon2}>
          <FastImage
            style={styles.iconSm}
            resizeMode={FastImage.resizeMode.contain}
            source={image2}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default BookControl;
BookControl.propTypes = {
  disabled: PropTypes.bool,
};

BookControl.defaultProps = {
  disabled: false,
};
