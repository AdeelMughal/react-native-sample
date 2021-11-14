// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    width: Metrics.moderateRatio(160),
    height: Metrics.moderateRatio(300),
    margin: Metrics.moderateRatio(2),

    padding: Metrics.smallMargin,
    borderRadius: Metrics.ratio(5),
  },
  subContainer1: {
    flex: 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Metrics.ratio(5),
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    backgroundColor: '#000',
    elevation: 10,
  },
  titleImage: {
    height: '100%',
    width: '100%',
    borderRadius: Metrics.ratio(10),
  },
  titleText: {
    marginLeft: Metrics.moderateRatio(5),

    textAlignVertical: 'center',
    textAlign: 'center',
  },
  subContainer2: {
    flex: 0.2,
    flexDirection: 'row',
  },
  itemLeft: {
    // flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemRight: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLeftImage: {
    width: Metrics.moderateRatio(30),
    height: Metrics.moderateRatio(30),
  },
  itemRightImage: {
    width: Metrics.moderateRatio(20),
    height: Metrics.moderateRatio(20),
    marginTop: Metrics.moderateRatio(3),
  },
  lh10: {},
  titleContainer: {
    flex: 0.7,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  heartFul: {
    width: Metrics.moderateRatio(40),
    height: Metrics.moderateRatio(40),
    position: 'absolute',
    bottom: Metrics.moderateRatio(10),
    right: Metrics.moderateRatio(10),
  },
  showBookmark: {
    width: Metrics.moderateRatio(40),
    height: Metrics.moderateRatio(40),
    position: 'absolute',
    bottom: Metrics.moderateRatio(10),
    right: Metrics.moderateRatio(10),
  },
  favIconContainer: {
    position: 'absolute',
    width: Metrics.ratio(44),
    height: Metrics.ratio(44),
    bottom: Metrics.smallMargin,
    right: Metrics.smallMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favIcon: {
    flex: 1,

    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
  },
});
