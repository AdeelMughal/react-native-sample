import {StyleSheet} from 'react-native';
import {Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'transparent',
    marginTop: Metrics.ratio(20),
    alignSelf: 'flex-start',
  },
});
