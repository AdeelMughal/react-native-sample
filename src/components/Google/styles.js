// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    elevation: 2,
    alignItems: 'center',
    padding: Metrics.ratio * 12,
    backgroundColor: Colors.facebook,
    borderRadius: Metrics.borderRadius,
  },
  button: {},
  socialIcon: {
    width: Metrics.moderateRatio(40),
    height: Metrics.moderateRatio(40),
    top: Metrics.moderateRatio(5),
  },
});
