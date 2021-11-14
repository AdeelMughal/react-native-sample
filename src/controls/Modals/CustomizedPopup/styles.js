// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {},
  closeBtn: {
    width: Metrics.ratio(44),
    height: Metrics.ratio(44),
    position: 'absolute',
    top: -Metrics.ratio(60),
    right: Metrics.ratio(50),
  },
  btn: {
    height: Metrics.moderateRatio(45),
    borderRadius: Metrics.ratio(22),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Metrics.doubleBaseMargin,
    marginBottom: Metrics.moderateRatio(10),
    color: Colors.text.BLUE,
    backgroundColor: Colors.white,
  },
  successBtn: {
    backgroundColor: Colors.green,
    color: Colors.white,
  },
  btnsContainer: {
    // marginTop: Metrics.moderateRatio(5),
  },
  blueStripe: {
    marginHorizontal: 0,
    height: Metrics.ratio(50),
    backgroundColor: Colors.Blue,
    borderTopLeftRadius: Metrics.ratio(25),
    borderTopRightRadius: Metrics.ratio(25),
  },
  yellowContainer: {
    flex: 1,
    backgroundColor: '#ffe001',
    justifyContent: 'center',
    borderBottomLeftRadius: Metrics.ratio(25),
    borderBottomRightRadius: Metrics.ratio(25),
  },
});

export const customStyles = {
  success: {
    headTxt: {
      marginHorizontal: Metrics.doubleBaseMargin,
      textAlign: 'center',
      marginTop: Metrics.doubleBaseMargin + 2 * Metrics.baseMargin,
    },
    subHeadTxt: {
      marginHorizontal: Metrics.doubleBaseMargin,
      textAlign: 'center',
      marginTop: Metrics.doubleBaseMargin + Metrics.baseMargin,
      marginBottom: Metrics.baseMargin,
      fontSize: Fonts.size.xLarge,
    },
  },
  base: {
    headTxt: {
      marginHorizontal: Metrics.doubleBaseMargin,
      textAlign: 'center',
      marginTop: Metrics.doubleBaseMargin + 2 * Metrics.baseMargin,
    },
    subHeadTxt: {
      marginHorizontal: Metrics.doubleBaseMargin,
      textAlign: 'center',
      marginTop: Metrics.doubleBaseMargin + Metrics.baseMargin,
      marginBottom: Metrics.baseMargin,
      fontSize: Fonts.size.xLarge,
    },
  },
  notification: {
    headTxt: {
      marginHorizontal: Metrics.doubleBaseMargin,
      textAlign: 'center',
      marginTop: Metrics.doubleBaseMargin + 2 * Metrics.baseMargin,
      fontSize: Fonts.size.large,
    },
    subHeadTxt: {
      marginHorizontal: Metrics.doubleBaseMargin,
      textAlign: 'center',
      marginVertical: Metrics.baseMargin,
      fontSize: Fonts.size.xSmall,
      color: Colors.text.black,
    },
  },
  logout: {
    headTxt: {
      marginHorizontal: Metrics.doubleBaseMargin,
      textAlign: 'center',
      marginTop: Metrics.doubleBaseMargin + 2 * Metrics.baseMargin,
    },
    subHeadTxt: {
      marginHorizontal: Metrics.doubleBaseMargin,
      textAlign: 'center',
      marginTop: Metrics.doubleBaseMargin,
    },
  },
};
