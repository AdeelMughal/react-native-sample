// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: Metrics.ratio(160),
    height: Metrics.ratio(160),
    marginHorizontal: Metrics.ratio(10),
    borderRadius: Metrics.ratio(100),
    marginTop: Metrics.ratio(-30),
  },
  tickStyle: {
    width: '25%',
    height: '25%',
    position: 'absolute',
    bottom: Metrics.ratio(0),
  },
});
