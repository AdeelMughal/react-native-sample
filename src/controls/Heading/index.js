import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '../../components';
import {Images, Sounds, Metrics, Colors} from '../../theme';
import FastImage from 'react-native-fast-image';
import styles from './styles';

const Heading = ({
  text,
  onPress,
  bgColor,
  marginTop,
  customStyles,
  textColor,
  textSize,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          ...customStyles,
        },
      ]}>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.headingText,
            {
              fontSize: textSize
                ? Metrics.moderateRatio(textSize)
                : Metrics.moderateRatio(15),
            },
          ]}
          color={textColor}>
          {text}
        </Text>
      </View>
      {onPress ? (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={() => onPress()}>
            <View style={styles.btnTextContainer}>
              <Text style={styles.btnText}>View All</Text>
            </View>
            <View style={styles.btnIconContainer}>
              <FastImage style={styles.icon} source={Images.asset18} />
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Heading;
