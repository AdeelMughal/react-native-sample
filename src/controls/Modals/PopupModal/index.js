// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Modal, TouchableOpacity, ScrollView, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';

import {Metrics, Colors, Fonts, Images} from '../../../theme';
import {Text, ButtonView} from '../../../components';
import fonts from '../../../common/fonts';

const PopupModal = React.memo((props) => {
  const {
    doShowModal,
    data,
    onClose,
    favourite,
    bookmark,
    isAdded,
    text,
  } = props;
  const TitleText = (isAdded, type) => {
    let str1;
    let str2;
    let color1;
    let color2;
    if (type == 'favourite') {
      str1 = isAdded ? 'Added to' : 'Removed from';
      str2 = 'Favourites!';
      color1 = Colors.white;
      color2 = Colors.Yellow;
    } else if (type == 'bookmark') {
      str1 = 'Bookmark';
      str1 = isAdded ? 'Added!' : 'Removed!';
      color1 = Colors.Yellow;
      color2 = Colors.white;
    }
    return (
      <Text size="xSmall" color={color1}>
        {str1} <Text color={color2}>{str2}</Text>
      </Text>
    );
  };
  return (
    <Modal
      transparent
      animated
      useNativeDriver="true"
      animationType="fade"
      visible={doShowModal}
      onRequestClose={() => {
        if (onClose) {
          onClose();
        }
      }}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={[styles.center, {flex: 0.2}]}>
            <FastImage
              style={styles.kidImage}
              resizeMode={FastImage.resizeMode.contain}
              source={Images.kid1}
            />
          </View>
          <View style={styles.centerContainer}>
            {favourite && (
              <>
                {TitleText(isAdded, 'favourite')}
                <Text
                  style={{fontFamily: fonts.GOTHAM_BOLD}}
                  color={Colors.white}
                  size="xxxSmall">
                  {text}
                </Text>
              </>
            )}
            {bookmark && (
              <>
                {TitleText(isAdded, 'bookmark')}
                <Text
                  style={{fontFamily: fonts.GOTHAM_BOLD}}
                  color="white"
                  size="xxxSmall">
                  {text}
                </Text>
              </>
            )}
          </View>
          <View style={[styles.center, {flex: 0.2}]}>
            <ButtonView
              onPress={() => {
                if (onClose) {
                  onClose();
                }
              }}>
              <FastImage
                style={styles.cancel}
                resizeMode={FastImage.resizeMode.contain}
                source={Images.asset15}
              />
            </ButtonView>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default PopupModal;

PopupModal.propTypes = {
  onClose: PropTypes.func,
  doShowModal: PropTypes.bool,
  data: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

PopupModal.defaultProps = {
  onClose: undefined,
  doShowModal: false,
  data: undefined,
  title: '',
  subTitle: '',
};
