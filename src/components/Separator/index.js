// @flow
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Metrics, Images} from '../../theme';

export default ({styles}) => {
  return (
    <View
      style={[
        {
          width: Metrics.screenWidth,
          height: StyleSheet.hairlineWidth,
          backgroundColor: Colors.Blue,
          alignSelf: 'center',
        },
        {...styles},
      ]}
    />
  );
};
