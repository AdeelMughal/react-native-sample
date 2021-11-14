import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Metrics} from '../../theme';
import FastImage from 'react-native-fast-image';

const HomeBanner = ({image, icon, position, onPress, route}) => {
  return (
    <View style={styles.container}>
      <FastImage style={styles.image} source={image} resizeMode="contain" />
      <TouchableOpacity
        onPress={() => {
          if (onPress) {
            onPress(route);
          }
        }}
        style={[
          styles.btn,
          {
            bottom: position == 'bottom' ? Metrics.ratio(10) : null,
            top: position == 'top' ? Metrics.ratio(10) : null,
          },
        ]}>
        <Image
          resizeMethod="auto"
          resizeMode="contain"
          style={styles.btnIcon}
          source={icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeBanner;
