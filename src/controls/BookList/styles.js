// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  nextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Metrics.ratio(20),
  },
  scrollview: {padding: Metrics.ratio(10)},
  image: {width: Metrics.ratio(50), height: Metrics.ratio(50)},
});
