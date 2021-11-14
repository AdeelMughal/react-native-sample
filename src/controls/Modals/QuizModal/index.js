// @flow
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Image, ImageBackground} from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';

import styles from './styles';

import {Metrics, Colors, Fonts, Images} from '../../../theme';
import {Text} from '../../../components';
import {ThemedNextButton} from '../../../controls';
import NumberTicker from '../../NumberTicker';
import quizReacts from '../../../common/quizReacts';

const QuizModal = (props) => {
  const {doShowModal, data, onClose, resetQuiz} = props;

  const renderStartoverButton = () => {
    return (
      <View style={styles.btnContainer}>
        <ThemedNextButton
          coloredText={Colors.Yellow}
          coloredButton={Images.asset41}
          style={styles.btn}
          text={'STARTOVER'}
          text2={'QUIZ'}
          iconStyle={styles.iconStyles}
          textStyle={styles.textStyles}
          onPress={() => {
            if (resetQuiz) {
              resetQuiz();
              onClose();
            }
          }}
        />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.btnContainer2}>
        <ThemedNextButton
          gradient={Colors.yellowGradient}
          coloredButton={Images.asset54}
          style={styles.doneBtn}
          text={'DONE'}
          iconStyle={styles.doneIcon}
          textStyle={styles.doneText}
          onPress={() => {
            onClose();
          }}
        />
      </View>
    );
  };

  return (
    <Modal
      style={styles.modal}
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
      <View style={styles.container}>
        <View style={styles.topContainer}>{renderStartoverButton()}</View>
        <View style={styles.middleContainer}>
          <ImageBackground
            resizeMode={'cover'}
            style={styles.scoreImage}
            source={Images.quizAsset9}>
            <View style={{flex: 0.55}}></View>
            <View style={{flex: 0.35}}>
              <View style={styles.scoreTextContainer}>
                <Text style={styles.yourScore}>Your Score</Text>
                <NumberTicker
                  end={Math.floor(
                    (data.totalPoints / data.totalQuestion) *
                      data.AllAnswerStatus,
                  )}
                  start={0}
                  time={2000}
                  digits={0}
                  easing="linear"
                  onComplete={() => console.log('completed')}
                  style={styles.numberTicker}
                />
              </View>
              <View style={styles.answerContainer}>
                <Text style={styles.answerText1}>You Correctly Answered</Text>
                <Text style={styles.answerText2}>
                  {data.AllAnswerStatus} out of {data.totalQuestion}
                </Text>
                <Text style={styles.answerText3}>Questions</Text>
              </View>
            </View>
            {renderDoneButton()}
          </ImageBackground>
        </View>
        <View style={styles.bottomContainer}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.bottomImage}
            source={data && quizReacts[data.AllAnswerStatus]?.image}
          />
        </View>
      </View>
    </Modal>
  );
};

export default QuizModal;

QuizModal.propTypes = {
  onClose: PropTypes.func,
  doShowModal: PropTypes.bool,
  data: PropTypes.object,
};

QuizModal.defaultProps = {
  onClose: undefined,
  doShowModal: false,
  data: undefined,
};
