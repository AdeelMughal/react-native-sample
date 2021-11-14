// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: Metrics.moderateRatio(80),
    padding: Metrics.moderateRatio(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    padding: Metrics.moderateRatio(5),
    flexDirection: 'row',
    backgroundColor: Colors.Blue,
    borderRadius: Metrics.moderateRatio(50),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  sub1: {
    flex: 0.2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  btnImage: {
    width: Metrics.moderateRatio(50),
    height: Metrics.moderateRatio(50),
  },
  sub2: {flex: 0.8},
  progressContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
