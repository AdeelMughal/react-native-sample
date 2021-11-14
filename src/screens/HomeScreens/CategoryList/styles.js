import {StyleSheet} from 'react-native';
import {Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    width: Metrics.screenWidth - Metrics.ratio(40),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(10),
  },
  headerText: {
    marginLeft: Metrics.ratio(5),
  },

  catImage: {width: Metrics.ratio(30), height: Metrics.ratio(30)},
});
