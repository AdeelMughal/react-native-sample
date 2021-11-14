// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  close: {
    width: Metrics.moderateRatio(50),
    height: Metrics.moderateRatio(80),
    position: 'absolute',
    top: -Metrics.moderateRatio(25),
    right: Metrics.moderateRatio(0),

    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 999,
  },
});
