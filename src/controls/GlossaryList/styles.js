// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    height: Metrics.ratio(68),
    flexDirection: 'row',
  },
  subContainer: {flex: 1},

  scrollview: {
    padding: Metrics.ratio(10),
  },
  scrollItem: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.ratio(25),
    margin: Metrics.ratio(10),
  },
  itemImage: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),
  },
  filterBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterImage: {
    width: Metrics.ratio(60),
    height: Metrics.ratio(60),
  },
});
