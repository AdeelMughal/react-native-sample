// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.grey,
  },
  subContainer1: {flex: 0.8},
  subContainer2: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollview: {
    paddingHorizontal: Metrics.moderateRatio(10),
    paddingVertical: Metrics.moderateRatio(5),
  },
  scrollItem: {
    width: Metrics.moderateRatio(50),
    alignItems: 'center',
  },
  itemImage: {
    width: Metrics.moderateRatio(40),
    height: Metrics.moderateRatio(40),
  },
  filterBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterImage: {
    width: Metrics.moderateRatio(50),
    height: Metrics.moderateRatio(50),
  },
  categoryText: {
    lineHeight: Metrics.moderateRatio(12),
    marginTop: Metrics.moderateRatio(5),
    textAlign: 'center',
  },
});
