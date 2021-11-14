import {StyleSheet} from 'react-native';
import {Metrics, Images, Colors} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    width: Metrics.screenWidth,
    flex: 1,
  },
  subContainer: {
    width: Metrics.screenWidth,
    flex: 1,
    zIndex: 0,
  },
  bgImage: {
    width: Metrics.screenWidth,
    flex: 1,
    zIndex: 0,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: Metrics.moderateRatio(20),
    position: 'absolute',
    bottom: 0,
  },
  textContainer: {
    flex: 0.6,
    height: 60,
    justifyContent: 'center',
  },
  btnContainer: {
    flex: 0.4,
    padding: Metrics.moderateRatio(10),
    justifyContent: 'center',
  },
  btn: {
    borderRadius: Metrics.ratio(25),
    height: Metrics.moderateRatio(35),
    backgroundColor: Colors.Yellow,
    borderWidth: Metrics.moderateRatio(3),
    borderColor: Colors.Blue,
    flexDirection: 'row',
    paddingHorizontal: Metrics.moderateRatio(5),
  },
  btnText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Metrics.smallMargin,
  },
  text: {lineHeight: Metrics.moderateRatio(12)},
  btnImage: {
    flex: 0.3,
  },
  image: {
    flex: 1,
    height: Metrics.moderateRatio(25),
    width: Metrics.moderateRatio(25),
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
  logoContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
  },
  logo: {
    height: Metrics.moderateRatio(180),
    width: Metrics.moderateRatio(270),
  },
});
