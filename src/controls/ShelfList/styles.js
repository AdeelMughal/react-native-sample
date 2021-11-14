// @flow
import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    flex: 1,
  },
  renderItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics.moderateRatio(10),
  },
  renderImage: {
    width: Metrics.screenWidth / 2 - Metrics.moderateRatio(30),
    height: Metrics.moderateRatio(240),
    borderTopRightRadius: Metrics.moderateRatio(5),
    borderTopLeftRadius: Metrics.moderateRatio(5),
    zIndex: 2,
  },
  separator: {
    width: Metrics.screenWidth - 2 * Metrics.baseMargin,
    height: (Metrics.screenWidth - 2 * Metrics.baseMargin) / 9.3,
    alignItems: 'center',
    bottom: Metrics.moderateRatio(5),
    zIndex: -1,
  },
  separatorImage: {
    flex: 1,
    width: Metrics.screenWidth - 2 * Metrics.baseMargin,
    height: (Metrics.screenWidth - 2 * Metrics.baseMargin) / 9.3,
  },
  footer: {
    width: Metrics.screenWidth - 2 * Metrics.baseMargin,
    height: (Metrics.screenWidth - 2 * Metrics.baseMargin) / 12,
    alignItems: 'center',
    bottom: Metrics.moderateRatio(10),
    backfaceVisibility: 'hidden',
    zIndex: -3,
  },
  footerImage: {
    flex: 1,
    width: Metrics.screenWidth - 2 * Metrics.baseMargin,
    height: (Metrics.screenWidth - 2 * Metrics.baseMargin) / 12,
  },
});
