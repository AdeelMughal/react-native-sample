// @flow
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Image, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import {customStyles} from './styles';

import {areEqual} from '../../../util/commonUtils';
import {Metrics, Colors, Fonts, Images, Sounds} from '../../../theme';
import {Text, ButtonView, Inputs} from '../../../components';
import {ThemedNextButton, UserAvatarTickControl} from '../../../controls';
import {SoundHelper} from '../../../helpers';

const questionPopAvatar = [Images.boyThinking, Images.girlThinking];
const successPopAvatar = [
  Images.girlThumbsUp,
  Images.boyThumbsUpRight,
  Images.boyThumbsUpLeft,
];

export default CustomizedPopup = React.memo((props) => {
  const {
    doShowModal,
    onClose,
    showTick = false,
    userImage,
    type = 'base',
    children,
    buttons,
    msg1,
    msg1Color,
    msg1Size,
    msg2,
    msg2Color,
    msg2Size,
  } = props;

  useEffect(() => {
    if (props.doShowModal) {
      SoundHelper.playSound(Sounds.everypopup);
    }
  }, []);

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

  renderBtn = (i, btnText, isSuccess, onPress) => {
    return (
      <ButtonView
        key={i}
        onPress={() => {
          SoundHelper.playSound(Sounds.onEveryTap);
          if (onPress) {
            onPress();
          }
        }}
        style={[styles.btn, isSuccess ? styles.successBtn : {}]}>
        <Text color={isSuccess ? Colors.white : Colors.text.popupBlue}>
          {btnText}
        </Text>
      </ButtonView>
    );
  };

  renderButtons = () => {
    if (buttons) {
      return (
        <View style={styles.btnsContainer}>
          {buttons.map((_, i) => renderBtn(i, _[0], _[1], _[2]))}
        </View>
      );
    }
  };

  renderHead = () => {
    if (msg1) {
      return (
        <Text
          style={customStyles[`${type}`].headTxt}
          color={msg1Color || Colors.orange}
          size={msg1Size || 'medium'}
          numberOfLines={2}>
          {msg1}
        </Text>
      );
    }
  };

  renderSubHead = () => {
    if (msg2) {
      return (
        <Text
          style={customStyles[`${type}`].subHeadTxt}
          color={msg2Color || Colors.text.popupBlue}
          size={msg2Size || 'medium'}>
          {msg2}
        </Text>
      );
    }
  };

  renderAvatar = () => {
    switch (type) {
      // Question based popup
      case 'base' || 'notification':
        return questionPopAvatar[Math.floor(Math.random() * 2)];
        break;
      // Success popups
      case 'success':
        return successPopAvatar[Math.floor(Math.random() * 3)];
        break;
      default:
        return Images.boyThinking;
        break;
    }
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
            height: Metrics.ratio(400),
          }}>
          <UserAvatarTickControl
            userImage={userImage ? userImage : renderAvatar()}
            localImg={!userImage}
            showTick={showTick}
            imageStyle={
              userImage
                ? {}
                : {
                    borderRadius: Metrics.ratio(0),
                  }
            }
            style={{
              zIndex: 10,
              top: Metrics.ratio(-26),
              position: 'absolute',
              left: (Metrics.screenWidth - Metrics.ratio(280)) / 2,
            }}
            tickStyle={{
              width: Metrics.moderateRatio(35),
              height: Metrics.moderateRatio(35),
            }}
          />
          <View style={styles.blueStripe}></View>
          <View style={styles.yellowContainer}>
            {renderHead()}
            {renderSubHead()}
            {renderButtons()}
          </View>
        </View>
      </View>
    </Modal>
  );
}, areEqual);

CustomizedPopup.propTypes = {
  onClose: PropTypes.func,
  doShowModal: PropTypes.bool,
};

CustomizedPopup.defaultProps = {
  onClose: undefined,
  doShowModal: false,
};
