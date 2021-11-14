import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    borderRadius: Metrics.borderRadius,
    width: Metrics.screenWidth / 2.5,
    height: Metrics.screenWidth / 2.5,
    margin: Metrics.baseMargin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Metrics.screenWidth / 2.5,
    height: Metrics.screenWidth / 2.5,
    borderRadius: Metrics.borderRadius,
  },
});
