// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
  },
  notificationContainer: {
    marginHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.moderateRatio(13),
  },
  subtitle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
});
