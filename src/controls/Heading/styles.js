import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
    flexDirection: 'row',
    paddingHorizontal: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(10),
  },
  textContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  headingText: {
    fontSize: Metrics.moderateRatio(15),
    textTransform: 'uppercase',
  },
  btnContainer: {flex: 0.3, justifyContent: 'center'},
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.ratio(100),
    backgroundColor: Colors.Yellow,
    borderStyle: 'solid',
    borderWidth: Metrics.ratio(3),
    borderColor: Colors.Blue,
  },
  btnTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8,
  },
  btnText: {
    fontSize: Metrics.moderateRatio(12),
    textTransform: 'uppercase',
  },
  btnIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.ratio(30),
    flex: 2,
  },
  icon: {
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
    marginRight: Metrics.ratio(5),
  },
});
