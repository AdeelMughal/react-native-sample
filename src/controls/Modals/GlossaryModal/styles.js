// @flow
import {StyleSheet, Platform} from 'react-native';
import fonts from '../../../common/fonts';
import {Colors, Metrics, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    marginHorizontal: Metrics.smallMargin,
    height: Metrics.screenHeight * Metrics.moderateRatio(0.7),
    borderWidth: Metrics.moderateRatio(3),
    borderColor: Colors.Yellow,
    borderRadius: Metrics.moderateRatio(20),
    backgroundColor: '#fff',
    padding: Metrics.moderateRatio(20),
  },
  imageContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Metrics.moderateRatio(170),
    height: Metrics.moderateRatio(170),
  },
  textContainer: {flex: 4.5},
  word: {
    color: Colors.Yellow,
    fontSize: Metrics.moderateRatio(20),
    marginVertical: Metrics.moderateRatio(5),
  },
  meaning: {
    color: Colors.black,
    fontFamily: fonts.GOTHAM_LIGHT,
    fontSize: Metrics.moderateRatio(12),
    textAlign: 'justify',
  },
  btnContainer: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  btn: {
    width: Metrics.moderateRatio(50),
    height: Metrics.moderateRatio(50),
    margin: Metrics.moderateRatio(5),
  },
  close: {
    width: Metrics.moderateRatio(30),
    height: Metrics.moderateRatio(30),
    position: 'absolute',
    top: -Metrics.moderateRatio(40),
    right: Metrics.moderateRatio(30),
  },
});
