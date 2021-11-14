// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../../theme';

export default StyleSheet.create({
  modal: {flex: 1, alignItems: 'center', justifyContent: 'flex-end'},
  container: {
    flexDirection: 'row',
    width: Metrics.screenWidth / Metrics.moderateRatio(1.1),
    height: Metrics.moderateRatio(70),
    backgroundColor: Colors.Blue,
    borderRadius: Metrics.moderateRatio(50),
    borderWidth: Metrics.moderateRatio(3),
    borderColor: Colors.Yellow,
    marginBottom: Metrics.moderateRatio(80),
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  kidImage: {
    width: Metrics.moderateRatio(60),
    height: Metrics.moderateRatio(60),
  },
  cancel: {width: Metrics.moderateRatio(30), height: Metrics.moderateRatio(30)},
  centerContainer: {
    flex: 0.6,
    justifyContent: 'center',
  },
});
