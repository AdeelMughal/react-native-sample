// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, Image} from 'react-native';

import styles from './styles';

import {Metrics, Colors, Fonts, Images} from '../../../theme';
import {Text, ButtonView} from '../../../components';
import Modal from 'react-native-modal';
import GlossaryCard from '../../GlossaryCard';
import FastImage from 'react-native-fast-image';
import fonts from '../../../common/fonts';

const GlossaryModal = React.memo((props) => {
  const {
    doShowModal,
    data,
    onClose,
    onLikePress,
    isLiked,
    onMutePress,
    isMuted,
  } = props;

  return (
    <Modal isVisible={doShowModal} onBackdropPress={() => onClose()}>
      <View style={styles.modal}>
        <ButtonView
          onPress={() => {
            if (onClose) {
              onClose();
            }
          }}
          style={styles.close}>
          <Image
            style={{flex: 1}}
            resizeMethod={'resize'}
            resizeMode={'contain'}
            source={Images.asset15}
          />
        </ButtonView>
        <View style={styles.imageContainer}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={styles.image}
            source={{uri: data.image, priority: FastImage.priority.high}}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.word}>{data.word}</Text>
          <Text style={styles.meaning}>{data.meaning}</Text>
        </View>
        <View style={styles.btnContainer}>
          <ButtonView
            onPress={() => {
              if (onLikePress) {
                onLikePress(data);
              }
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.btn}
              source={isLiked ? Images.heartFull : Images.heartEmpty}
            />
          </ButtonView>
          <ButtonView
            onPress={() => {
              onMutePress();
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.btn}
              source={isMuted ? Images.muteSound : Images.sound}
            />
          </ButtonView>
        </View>
      </View>
    </Modal>
  );
});

export default GlossaryModal;

GlossaryModal.propTypes = {
  onClose: PropTypes.func,
  onLikePress: PropTypes.func,
  onMutePress: PropTypes.func,
  doShowModal: PropTypes.bool,
  data: PropTypes.object,
  isLiked: PropTypes.bool,
  isMuted: PropTypes.bool,
};

GlossaryModal.defaultProps = {
  onClose: undefined,
  onLikePress: undefined,
  onMutePress: undefined,
  doShowModal: false,
  data: undefined,
  isLiked: false,
  isMuted: false,
};
