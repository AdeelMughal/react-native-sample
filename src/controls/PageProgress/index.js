import React from 'react';
import {View, TouchableWithoutFeedback, Image} from 'react-native';
import {Text, ButtonView} from '../../components';
import FastImage from 'react-native-fast-image';
import Slider from '@react-native-community/slider';
import styles from './styles';
import {Images, Metrics} from '../../theme';

const PageProgress = ({
  max,
  min,
  pageNumber,
  onChangeSlide,
  isPaused,
  onPaused,
  onPlay,
}) => {
  const handleSliderChange = (value) => {
    onChangeSlide(value);
  };

  const toggleButton = () => {
    if (isPaused) {
      onPlay();
    } else {
      onPaused();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <ButtonView
          onPress={() => {
            toggleButton();
          }}
          style={styles.sub1}>
          <Image
            source={isPaused ? Images.playIcon2 : Images.pauseIcon2}
            style={styles.btnImage}
            resizeMode="stretch"
          />
        </ButtonView>
        <View style={styles.sub2}>
          <View style={styles.progressContainer}>
            <Slider
              style={{
                width: Metrics.screenWidth / Metrics.moderateRatio(1.5),
                height: Metrics.moderateRatio(10),
              }}
              value={pageNumber}
              minimumValue={min}
              maximumValue={max}
              step={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
              thumbTintColor="purple"
              onValueChange={handleSliderChange}
            />
          </View>
          <View style={styles.pages}>
            <Text color="#fff" size="xxxSmall">
              {`PAGE ${pageNumber} OF ${max}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PageProgress;
