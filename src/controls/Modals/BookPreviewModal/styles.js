// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  carousel: {
    width: Metrics.screenWidth - 4 * Metrics.baseMargin,
    height: (Metrics.screenWidth - 4 * Metrics.baseMargin) / 0.667,
    borderWidth: Metrics.moderateRatio(3),
    borderColor: Colors.Yellow,
    borderRadius: Metrics.moderateRatio(20),
    overflow: 'hidden',
  },
  close: {
    width: Metrics.moderateRatio(44),
    height: Metrics.moderateRatio(44),
    justifyContent: 'flex-end',
    alignItems: 'center',

    zIndex: 10,
  },
  pagination: {position: 'absolute', bottom: Metrics.moderateRatio(50)},
  dotStyle: {
    width: Metrics.moderateRatio(8),
    height: Metrics.moderateRatio(8),
    borderRadius: Metrics.moderateRatio(5),
    marginHorizontal: 0,
    backgroundColor: Colors.Yellow,
  },
  inactiveDotStyle: {
    width: Metrics.moderateRatio(8),
    height: Metrics.moderateRatio(8),
    borderRadius: Metrics.moderateRatio(5),
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  carouselItem: {
    flex: 1,
  },
});
