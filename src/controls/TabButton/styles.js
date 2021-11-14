// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';
import Utils from '../../util';

export default StyleSheet.create({
  container: {
    // flex: 1,
    width: Metrics.screenWidth / 5,
    height: Metrics.screenWidth / Metrics.moderateRatio(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
