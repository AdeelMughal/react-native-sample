// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
  },
  custBtn: {
    backgroundColor: Colors.themeColors.brightYellow,
    height: Metrics.ratio(30),
    justifyContent: 'center',
    alignItems: 'center',
    margin: Metrics.baseMargin,
    borderRadius: Metrics.ratio(15),
  },
  inputLabel: {
    marginBottom: Metrics.ratio(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '92%',
  },
  genderParent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.ratio(10),
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: Metrics.ratio(25),
  },
  updateBtnContainer: {
    width: Metrics.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.themeColors.darkBlue,
  },
  subsBtn: {
    height: Metrics.ratio(44),
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.Yellow,
    borderRadius: Metrics.ratio(15),
    width: '100%',
  },
  miniBtn: {
    height: Metrics.moderateRatio(30),
    backgroundColor: Colors.Yellow,
    borderRadius: Metrics.ratio(12),
  },
  miniBtnTextRate: {
    fontSize: Fonts.size.xxxxSmall,
  },
  miniBtnText: {color: Colors.text.black, fontSize: Fonts.size.small},
  miniBtnIcon: {
    position: 'relative',
    width: Metrics.moderateRatio(20),
    height: Metrics.moderateRatio(20),
  },
  updateBtn: {
    height: Metrics.ratio(44),
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.Yellow,
    borderRadius: Metrics.ratio(15),
    width: Metrics.ratio(170),
  },
  updateBtnIcon: {
    position: 'relative',
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
  },
  headerStyle: {
    marginHorizontal: Metrics.baseMargin,
    borderRadius: Metrics.ratio(12),
    height: Metrics.ratio(150),
    backgroundColor: Colors.themeColors.brightYellow,
    flexDirection: 'row',

    alignItems: 'center',
  },
  headerImg: {
    width: Metrics.screenWidth * 0.32,
    height: Metrics.screenWidth * 0.32,

    marginTop: 0,
  },
  headerImgLocal: {
    width: Metrics.screenWidth * 0.4,
    height: Metrics.screenWidth * 0.4,

    marginTop: 0,
  },
  sectionHeadChild: {
    marginHorizontal: Metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHead: {
    marginVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    color: Colors.white,
    flex: 0.7,
  },
  infoText: {
    color: Colors.white,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.xxxSmall,
    textAlign: 'right',
  },
  subHead: {
    color: Colors.white,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.small,
    width: '75%',
  },
  btnTitle: {
    fontSize: Metrics.moderateRatio(10),
  },
  btnSubTitle: {
    color: Colors.text.light,
    fontSize: Metrics.moderateRatio(20),
  },
  gradBtn: {
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: Metrics.moderateRatio(10),
    height: Metrics.moderateRatio(80),
    width: Metrics.moderateRatio(150),
  },
  blngSubSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blngSection: {
    marginBottom: Metrics.moderateRatio(12),
    marginTop: Metrics.moderateRatio(20),
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  infoIcon: {
    height: Metrics.ratio(20),
    width: Metrics.ratio(20),
  },
  blngSecBottom: {
    flexDirection: 'row',
    marginTop: Metrics.ratio(10),
  },
  code: {
    color: Colors.text.Yellow,
    fontSize: Fonts.size.medium,
    marginHorizontal: Metrics.doubleBaseMargin,
  },

  //********Carousel styling
  carouselBox: {
    alignItems: 'center',

    paddingTop: Metrics.ratio(5),
    paddingBottom: Metrics.ratio(12),
    width: Metrics.ratio(120),
    borderRadius: Metrics.ratio(15),
    marginBottom: Metrics.ratio(15),
  },
  carouselImg: {
    width: Metrics.screenWidth * 0.2,
    height: Metrics.screenWidth * 0.2,

    marginTop: 0,
  },
  tickStyle: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(22),

    marginTop: 0,
  },
  carouselBtnText: {
    color: Colors.text.light,
    fontSize: Fonts.size.xxxxSmall,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  carouselBtn: {
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.smallMargin,
    height: Metrics.ratio(20),
    width: '80%',
    backgroundColor: Colors.Blue,
  },
  rowMargin: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  socialIcon: {
    width: Metrics.moderateRatio(52),
    height: Metrics.moderateRatio(52),
  },
  tickSize: {
    width: Metrics.moderateRatio(35),
    height: Metrics.moderateRatio(35),
  },
  carouselItemStyle: {
    color: Colors.orange,
    textAlign: 'center',
    lineHeight: Metrics.ratio(18),
    marginVertical: Metrics.smallMargin,
  },
});
