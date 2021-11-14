// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    borderRadius: Metrics.ratio(30),
    width: '90%',
    overflow: 'hidden',
  },
  gradientStyle: {
    zIndex: 1,
    width: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    backgroundColor: Colors.Blue,
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
  },
});
