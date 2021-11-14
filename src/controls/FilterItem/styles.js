// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.ratio(20),
    backgroundColor: 'rgba(0, 172, 238, 0.5)',
  },
  subContainer1: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Metrics.ratio(10),
  },
  subContainer2: {
    flex: 0.9,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  image: {width: Metrics.ratio(25), height: Metrics.ratio(25)},
});
