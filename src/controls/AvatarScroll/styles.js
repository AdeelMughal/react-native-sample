// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {},
  roundImg: {
    width: Metrics.ratio(105),
    height: Metrics.ratio(105),
    borderRadius: Metrics.ratio(55),
    overflow: 'hidden',
    marginHorizontal: Metrics.smallMargin,
    marginTop: Metrics.smallMargin / 2,
  },
});
