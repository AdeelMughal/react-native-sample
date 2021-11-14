// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.Yellow,
    borderRadius: Metrics.ratio(30),
    marginHorizontal: Metrics.ratio(10),
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.ratio(5),
  },
  icon: {width: Metrics.ratio(40), height: Metrics.ratio(40)},
  text: {flex: 1, textAlign: 'center', marginHorizontal: Metrics.baseMargin},
});
