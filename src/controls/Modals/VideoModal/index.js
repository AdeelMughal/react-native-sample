// @flow
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, Image} from 'react-native';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';

import styles from './styles';

import {Metrics, Colors, Fonts, Images} from '../../../theme';
import {Text, ButtonView} from '../../../components';
import Modal from 'react-native-modal';
import {VideoPlayer} from '../..';
// import VideoPlayer from 'react-native-video-player';

const VideoModal = React.memo((props) => {
  useEffect(() => {
    activateKeepAwake();

    return () => {
      deactivateKeepAwake();
    };
  }, []);

  const {doShowModal, data, onClose, onCurrentVideoEnded} = props;

  return (
    <Modal
      isVisible={doShowModal}
      style={{margin: 0, padding: 0}}
      onBackdropPress={() => onClose()}
      supportedOrientations={['portrait', 'landscape']}>
      <ButtonView
        onPress={() => {
          if (onClose) {
            onClose();
          }
        }}
        style={styles.close}>
        <Image
          style={{
            flex: 1,
            width: Metrics.ratio(35),
            height: Metrics.ratio(35),
            marginTop: Metrics.ratio(28),
          }}
          resizeMethod={'resize'}
          resizeMode={'contain'}
          source={Images.asset15}
        />
      </ButtonView>
      <View style={styles.container}>
        <VideoPlayer item={data} onVideoEnd={onCurrentVideoEnded} />
      </View>
    </Modal>
  );
});

export default VideoModal;

VideoModal.propTypes = {
  onClose: PropTypes.func,
  doShowModal: PropTypes.bool,
  data: PropTypes.object,
  onCurrentVideoEnded: PropTypes.func,
};

VideoModal.defaultProps = {
  onClose: undefined,
  doShowModal: false,
  data: undefined,
  onCurrentVideoEnded: undefined,
};
