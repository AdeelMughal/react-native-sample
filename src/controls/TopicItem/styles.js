// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    width: Metrics.ratio(100),
    height: Metrics.ratio(100),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.ratio(50),
    marginVertical: Metrics.ratio(5),
  },
  image: {width: Metrics.ratio(100), height: Metrics.ratio(100)},
});
