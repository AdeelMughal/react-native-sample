// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),
    backgroundColor: Colors.Yellow,
    borderRadius: Metrics.ratio(25),

    justifyContent: 'center',
    alignItems: 'center',
  },
  expandableContainer: {
    borderRadius: Metrics.ratio(25),
    backgroundColor: Colors.Yellow,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Metrics.ratio(3),
  },
  buttonImage: {flex: 1, width: Metrics.ratio(44), height: Metrics.ratio(44)},
  childbuttonImage: {
    flex: 1,
    width: Metrics.ratio(35),
    height: Metrics.ratio(35),
  },
});
