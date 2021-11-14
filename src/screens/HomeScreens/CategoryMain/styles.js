import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  item: {
    width: Metrics.screenWidth,
    flex: 1,
    zIndex: 0,
  },
  bgImage: {
    width: Metrics.screenWidth,
    flex: 1,
    zIndex: 0,
  },
  subContainer: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    height: '100%',
    paddingBottom: Metrics.moderateRatio(30),
    paddingTop: Metrics.moderateRatio(20),
  },
  logoContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    height: Metrics.moderateRatio(180),
    width: Metrics.moderateRatio(270),
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: Metrics.moderateRatio(20),
    paddingHorizontal: Metrics.moderateRatio(10),
    position: 'absolute',
    bottom: 0,
  },
  textContainer: {
    flex: 0.6,
    height: Metrics.ratio(60),
    justifyContent: 'center',
  },
  text: {lineHeight: Metrics.moderateRatio(12)},
  btnContainer: {
    flex: 0.4,
    padding: Metrics.moderateRatio(10),
    justifyContent: 'center',
  },
  btn: {
    height: Metrics.moderateRatio(40),
    borderWidth: Metrics.moderateRatio(3),
    borderColor: Colors.Blue,
  },
  iconStyle: {
    width: Metrics.moderateRatio(25),
    height: Metrics.moderateRatio(25),
  },
  textStyle: {
    fontSize: Metrics.moderateRatio(13),
    marginLeft: Metrics.baseMargin,
    alignSelf: 'flex-start',
    color: '#000000',
  },
});
