// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.Yellow,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
