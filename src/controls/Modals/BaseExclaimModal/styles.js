// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {},
  closeBtn: {
    width: Metrics.ratio(44),
    height: Metrics.ratio(44),
    position: 'absolute',
    top: -Metrics.ratio(60),
    right: Metrics.ratio(50),
  },
});
