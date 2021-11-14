// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: Metrics.moderateRatio(30),
  },
  starImageStyle: {
    resizeMode: 'cover',
  },
});
