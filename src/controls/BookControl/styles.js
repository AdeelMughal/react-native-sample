// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'row',
    borderRadius: 30,
    marginVertical: 5,
  },
  iconSm: {
    width: Metrics.ratio(25),
    height: Metrics.ratio(25),
    marginLeft: Metrics.ratio(10),
  },
  icon1: {
    flex: 0.2,
    justifyContent: 'center',
  },
  icon1Image: {
    width: Metrics.ratio(35),
    height: Metrics.ratio(35),
  },
  icon2: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  icon2Image: {
    width: Metrics.ratio(35),
    height: Metrics.ratio(35),
  },
  title: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
