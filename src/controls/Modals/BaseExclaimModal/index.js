// @flow
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Image, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';

import styles from './styles';

import {areEqual} from '../../../util/commonUtils';
import {Metrics, Colors, Fonts, Images} from '../../../theme';
import {Text, ButtonView, Inputs} from '../../../components';
import {ThemedNextButton, UserAvatarTickControl} from '../../../controls';
import {render} from 'react-dom';

export default BaseExclaimModal = React.memo((props) => {
  const [password, setPassword] = useState('');

  const {doShowModal, onClose, text1, text2, onSignupTap} = props;

  renderCloseButton = () => {
    return (
      <ButtonView
        onPress={() => {
          if (onClose) {
            onClose();
          }
        }}
        style={styles.closeBtn}>
        <Image
          style={{flex: 1}}
          resizeMethod={'resize'}
          resizeMode={'contain'}
          source={Images.asset15}
        />
      </ButtonView>
    );
  };

  return (
    <Modal
      style={{backgroundColor: 'transparent'}}
      onBackdropPress={() => {
        if (onClose) {
          onClose();
        }
      }}
      backdropOpacity={0.9}
      backdropColor={'black'}
      animated
      useNativeDriver="true"
      animationType="slide"
      isVisible={doShowModal}
      onRequestClose={() => {
        const {onClose} = props;

        if (onClose) {
          onClose();
        }
      }}>
      <View>
        {renderCloseButton()}
        <View
          style={{
            marginHorizontal: Metrics.doubleBaseMargin,
            height: Metrics.ratio(380),
          }}>
          <UserAvatarTickControl
            showTick={false}
            style={{
              zIndex: 10,
              top: Metrics.ratio(-20),
              position: 'absolute',
              left: (Metrics.screenWidth - Metrics.ratio(280)) / 2,
            }}
          />
          <View
            style={{
              marginHorizontal: 0,
              height: Metrics.ratio(50),
              backgroundColor: Colors.Blue,
              borderTopLeftRadius: Metrics.ratio(25),
              borderTopRightRadius: Metrics.ratio(25),
            }}></View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffe001',
              justifyContent: 'center',
              borderBottomLeftRadius: Metrics.ratio(25),
              borderBottomRightRadius: Metrics.ratio(25),
            }}>
            <Text
              style={{
                marginHorizontal: Metrics.doubleBaseMargin,
                textAlign: 'center',
                color: '#f89a00',
                marginTop: Metrics.doubleBaseMargin + 2 * Metrics.baseMargin,
              }}
              numberOfLines={2}>
              {text1}
            </Text>

            <Text
              style={{
                marginHorizontal: Metrics.doubleBaseMargin,
                textAlign: 'center',
                color: '#54b7bd',
                marginVertical: Metrics.baseMargin,
              }}>
              {text2}
            </Text>

            <ButtonView
              onPress={() => {
                if (onSignupTap) {
                  onSignupTap();
                }
              }}
              style={{
                backgroundColor: '#8ec653',
                height: Metrics.ratio(35),
                borderRadius: Metrics.ratio(22),
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: Metrics.doubleBaseMargin,
                marginBottom: Metrics.baseMargin,
              }}>
              <Text color="light">SIGNUP</Text>
            </ButtonView>
          </View>
        </View>
      </View>
    </Modal>
  );
}, areEqual);

BaseExclaimModal.propTypes = {
  onClose: PropTypes.func,
  doShowModal: PropTypes.bool,
  text1: PropTypes.text,
  text2: PropTypes.text,
};

BaseExclaimModal.defaultProps = {
  onClose: undefined,
  doShowModal: false,
  text1: '',
  text2: '',
};
