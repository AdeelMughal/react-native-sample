// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Yellow,
  },
  scrollview: {flex: 1},
  subcontainer1: {
    height: Metrics.moderateRatio(300),
    backgroundColor: Colors.Yellow,
  },
  headingContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionContainer: {
    flex: 0.8,
    flexDirection: 'row',
  },
  bookImage: {
    flex: 1,
    marginVertical: Metrics.baseMargin,
    marginLeft: Metrics.moderateRatio(40),
  },
  bookContainer: {
    flex: 0.4,
  },
  btnContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {marginVertical: Metrics.moderateRatio(5), width: '80%'},
  iconStyle: {
    width: Metrics.moderateRatio(30),
    height: Metrics.moderateRatio(30),
  },
  textStyle: {
    fontSize: Metrics.moderateRatio(13),
    marginLeft: Metrics.baseMargin,
    alignSelf: 'flex-start',
  },
  ratings: {
    flexDirection: 'row',
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: Metrics.moderateRatio(30),
  },
  starImageStyle: {
    width: Metrics.moderateRatio(40),
    height: Metrics.moderateRatio(40),
    resizeMode: 'cover',
    marginHorizontal: Metrics.moderateRatio(2),
  },
  flatlist: {
    paddingHorizontal: Metrics.moderateRatio(20),
  },
});
