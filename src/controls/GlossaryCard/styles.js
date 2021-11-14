// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: Metrics.moderateRatio(30),
    flexDirection: 'row',
    paddingVertical: Metrics.moderateRatio(5),
  },
  cardSub1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: Metrics.moderateRatio(130),
    height: Metrics.moderateRatio(130),
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: Metrics.moderateRatio(10),
    flexDirection: 'row',
  },
  actionBtn: {
    width: Metrics.moderateRatio(50),
    height: Metrics.moderateRatio(50),
    margin: Metrics.moderateRatio(5),
  },
  cardSub2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.moderateRatio(10),
  },
  heading: {
    color: Colors.Yellow,
    fontSize: Metrics.moderateRatio(20),
    textTransform: 'uppercase',
  },
  scrollContainer: {height: Metrics.moderateRatio(200)},
});
