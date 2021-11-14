// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
  },
  notificationContainer: {
    marginHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.moderateRatio(13),
  },
  subtitle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  feedbackForm: {
    width: '80%',
    fontFamily: Fonts.type.base,
    fontWeight: '200',
    height: Metrics.moderateRatio(300),
    backgroundColor: Colors.white,
    padding: Metrics.ratio(25),
    borderRadius: Metrics.ratio(40),
    fontSize: Metrics.ratio(16),
    borderColor: Colors.Yellow,
    borderWidth: Metrics.ratio(3),
    textAlignVertical: 'top',
  },
  btnText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: Fonts.type.base,
    right: -10,
  },
  btn: {
    width: '100%',
    padding: Metrics.moderateRatio(9),
    backgroundColor: Colors.Yellow,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Metrics.ratio(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnContainer: {
    width: '65%',
    marginTop: 20,
    alignItems: 'center',
  },
  forwardBtn: {
    width: Metrics.moderateRatio(30),
    height: Metrics.moderateRatio(30),
  },
  prefixBtn: {
    width: Metrics.moderateRatio(30),
    height: Metrics.moderateRatio(30),
    right: Metrics.moderateRatio(-10),
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 1000,
    alignItems: 'center',
  },
});
