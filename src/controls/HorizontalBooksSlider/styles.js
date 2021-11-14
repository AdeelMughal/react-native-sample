// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: Metrics.ratio(60),
    backgroundColor: Colors.Blue,
    zIndex: 1,
    flexDirection: 'row',
  },
  switch: {
    width: Metrics.moderateRatio(100),
    marginHorizontal: Metrics.baseMargin,
    justifyContent: 'center',
  },
  backButtonView: {
    width: Metrics.ratio(44),
    height: Metrics.ratio(44),
    marginHorizontal: Metrics.smallMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImage: {
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
  },
  appLogoImage: {
    width: Metrics.screenWidth * 0.4,
    height: (Metrics.screenWidth * 0.4) / 1.97,
    marginTop: Metrics.baseMargin * 2,
  },
  userView: {
    position: 'absolute',
    top: 0,
    right: Metrics.smallMargin,
    alignItems: 'center',
  },
  userName: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.themeColors.brightYellow,
  },
  userImage: {
    width: Metrics.ratio(60),
    height: Metrics.ratio(60),
    marginTop: Metrics.ratio(0),
    borderRadius: Metrics.ratio(30),
  },
  settingView: {
    position: 'absolute',
    right: Metrics.moderateRatio(20),
  },
  emptyView: {
    width: Metrics.screenWidth,
    height: Metrics.ratio(80),
    position: 'absolute',
    backgroundColor: Colors.Blue,
    top: Metrics.ratio(-80),
  },
});
