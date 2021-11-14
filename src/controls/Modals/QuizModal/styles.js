// @flow
import {StyleSheet, Platform} from 'react-native';
import fonts from '../../../common/fonts';
import {Colors, Metrics, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
  },
  topContainer: {
    flex: 0.1,
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    width: Metrics.screenWidth / 2 - Metrics.moderateRatio(20),
    height: Metrics.moderateRatio(40),
  },
  iconStyles: {
    width: Metrics.moderateRatio(30),
    height: Metrics.moderateRatio(30),
  },
  textStyles: {
    fontSize: Metrics.moderateRatio(12),
    marginLeft: Metrics.moderateRatio(16),
    alignSelf: 'flex-start',
  },
  middleContainer: {flex: 0.6},
  scoreImage: {
    width: '100%',
    height: '100%',
  },
  scoreTextContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  yourScore: {
    fontSize: Metrics.moderateRatio(12),
    color: '#ece325',
  },
  scoreValue: {
    fontSize: Metrics.moderateRatio(50),
    color: 'white',
    marginTop: Metrics.moderateRatio(-10),
  },
  answerContainer: {
    flex: 0.4,
    alignItems: 'center',
  },
  answerText1: {
    fontSize: Metrics.moderateRatio(10),
    color: 'white',
    textTransform: 'uppercase',
  },
  answerText2: {
    fontSize: Metrics.moderateRatio(26),
    color: '#ece325',
    marginTop: Metrics.moderateRatio(-10),
  },
  answerText3: {
    fontSize: Metrics.moderateRatio(10),
    color: 'white',
    textTransform: 'uppercase',
    marginTop: Metrics.moderateRatio(-10),
  },
  btnContainer2: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneBtn: {
    width: Metrics.screenWidth - Metrics.moderateRatio(250),
    height: Metrics.moderateRatio(40),
  },
  doneIcon: {
    width: Metrics.moderateRatio(25),
    height: Metrics.moderateRatio(25),
  },
  doneText: {
    fontSize: Metrics.moderateRatio(13),
    marginLeft: Metrics.baseMargin,
    alignSelf: 'flex-start',
    color: Colors.Blue,
  },
  bottomContainer: {flex: 0.3},
  bottomImage: {
    width: '100%',
    height: '100%',
  },
  numberTicker: {
    fontSize: Metrics.moderateRatio(40),
    fontFamily: fonts.CARTERONE,
    color: '#FFFFFF',
  },
});
