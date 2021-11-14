// @flow
import {StyleSheet} from 'react-native';
import fonts from '../../../common/fonts';
import {Colors, Fonts, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBg: {width: '100%', flex: 1},
  scrollview: {
    width: '100%',
    flex: 1,
  },
  imageContainer: {flex: 0.4},
  titleImage: {
    width: Metrics.moderateRatio(280),
    height: Metrics.moderateRatio(190),
  },
  actionContainer: {
    flex: 0.6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bookContainer: {alignItems: 'center', justifyContent: 'center'},
  bookImage: {
    width: Metrics.moderateRatio(150),
    height: Metrics.moderateRatio(250),
    zIndex: 1,
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    marginHorizontal: Metrics.moderateRatio(20),
  },
  btnImage: {
    width: Metrics.moderateRatio(60),
    height: Metrics.moderateRatio(60),
    marginVertical: Metrics.moderateRatio(10),
    zIndex: 1,
  },
  bottomContainer: {
    width: '70%',
    marginTop: Metrics.moderateRatio(10),
    alignItems: 'center',
  },
  text: {
    fontSize: Metrics.moderateRatio(15),
    color: 'rgba(255,0,0,0.6)',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: fonts.CARTERONE,
    lineHeight: Metrics.moderateRatio(18),
  },
});
