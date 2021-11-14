// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    borderRadius: Metrics.ratio(25),

    height: Metrics.ratio(50),

    overflow: 'hidden',
  },

  commonContent: {
    flex: 1,
    zIndex: 1,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Metrics.ratio(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
  },

  gradient: {
    backfaceVisibility: 'hidden',
  },
  icon: {
    flex: 1,
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Metrics.smallMargin,
  },
  text: {
    textAlign: 'center',
    fontSize: Metrics.moderateRatio(20),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Metrics.moderateRatio(2),
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.1,
  },
});
