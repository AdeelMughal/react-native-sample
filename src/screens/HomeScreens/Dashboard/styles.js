// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Yellow,
  },
  tab: {
    width: Metrics.screenWidth,
    height: Metrics.ratio(60),
    backgroundColor: Colors.Yellow,
    flexDirection: 'row',
  },
});
