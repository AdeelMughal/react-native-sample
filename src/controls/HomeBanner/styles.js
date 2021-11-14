// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    height: Metrics.screenWidth / 3.1,
    marginBottom: Metrics.smallMargin,
  },
  image: {
    flex: 1,
    height: Metrics.screenWidth / 3.1,
    width: Metrics.screenWidth,
  },
  btn: {position: 'absolute', right: Metrics.moderateRatio(10)},
  btnIcon: {
    width: Metrics.moderateRatio(30),
    height: Metrics.moderateRatio(30),
  },
});
