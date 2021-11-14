// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {flex: 1, marginBottom: Metrics.smallMargin},
  scrollItem: {width: Metrics.screenWidth},
  bgImage: {
    borderTopRightRadius: Metrics.moderateRatio(30),
    borderTopLeftRadius: Metrics.moderateRatio(30),
  },
  detailContainer: {flex: 1, flexDirection: 'row'},
  detailLeft: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.smallMargin,
  },
  detailMiddle: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailRight: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.smallMargin,
  },
  detailImage: {
    width: Metrics.moderateRatio(30),
    height: Metrics.moderateRatio(30),
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: Metrics.smallMargin,
  },
  descContainer: {
    width: '70%',
    marginVertical: Metrics.ratio(10),
    height: Metrics.ratio(70),
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBtn: {},
  favBtn: {},
  bookCard: {
    height: Metrics.ratio(350),
    justifyContent: 'center',
    marginBottom: Metrics.baseMargin,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Metrics.smallMargin,
  },
  separator: {
    width: Metrics.screenWidth - Metrics.ratio(40),
    backgroundColor: Colors.white,
  },
  related: {paddingHorizontal: Metrics.moderateRatio(20)},
});
