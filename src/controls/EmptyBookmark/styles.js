// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1},
  imageContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  image: {
    width: Metrics.ratio(250),
    height: Metrics.ratio(250),
    marginTop: Metrics.ratio(10),
  },
  textContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
});
