// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeColors.lemonYellow,
  },
  topView: {
    flex: 1,
  },

  gradientBtnContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    top: Metrics.ratio(-20),
    height: Metrics.ratio(36),
    marginHorizontal: Metrics.baseMargin,
  },
  carouselContainer: {
    width: Metrics.screenWidth,
    // height: Metrics.screenHeight - Metrics.ratio(100),
    height: Metrics.screenHeight - Metrics.ratio(120),
    // paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.baseMargin,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoBtn: {
    position: 'absolute',
    width: Metrics.ratio(44),
    height: Metrics.ratio(44),
    right: Metrics.ratio(0),
    top: Metrics.ratio(-20),
  },
  videoBtnNew: {
    position: 'absolute',
    width: Metrics.ratio(44),
    bottom: Platform.OS == 'ios' ? Metrics.ratio(78) : Metrics.ratio(150),
    right: Metrics.ratio(15),
    // top: Metrics.ratio(80),
  },
  footerViewContainer: {
    // flexDirection: 'row',
    justifyContent: 'center',
    height: Metrics.ratio(100),
    paddingBottom: Metrics.ratio(20),
    alignItems: 'center',
  },
  footerButton: {
    flexDirection: 'row',

    marginHorizontal: Metrics.moderateRatio(2),
    paddingHorizontal: Metrics.moderateRatio(5),
    height: Metrics.ratio(28),
    // marginTop: Metrics.baseMargin, //+ Metrics.smallMargin,
    borderRadius: Metrics.ratio(14),
    borderColor: 'black',
    borderWidth: Metrics.hairLineWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.ratio(30),
  },
  footerButton2: {
    flexDirection: 'row',
    marginHorizontal: Metrics.moderateRatio(2),
    paddingHorizontal: Metrics.moderateRatio(5),
    height: Metrics.ratio(28),
    // marginTop: Metrics.baseMargin, //+ Metrics.smallMargin,
    marginTop: Metrics.ratio(6),
    // borderRadius: Metrics.ratio(14),
    // borderColor: 'black',
    // borderWidth: Metrics.hairLineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonText: {
    marginHorizontal: Metrics.ratio(2),
  },
  footerButtonText2: {
    marginHorizontal: Metrics.moderateRatio(1),
  },
  socialIcon: {
    width: Metrics.moderateRatio(40),
    height: Metrics.moderateRatio(40),
    top: Metrics.moderateRatio(5),
  },
});
