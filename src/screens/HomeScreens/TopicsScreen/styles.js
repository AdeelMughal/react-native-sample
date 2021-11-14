import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.moderateRatio(20),
    paddingTop: Metrics.moderateRatio(20),
  },
  textContainer: {flex: 1, justifyContent: 'center'},
  text: {
    fontSize: Metrics.moderateRatio(15),
    textTransform: 'uppercase',
  },
  topicList: {flex: 1, alignItems: 'center'},
  emptyList: {
    flex: 1,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.Blue,
  },
});
