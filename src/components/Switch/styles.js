import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  btnContainer: {flex: 1, justifyContent: 'center'},
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.ratio(100),
    borderColor: Colors.Yellow,
    borderStyle: 'solid',
    borderWidth: Metrics.ratio(3),
    backgroundColor: Colors.Blue,
    paddingVertical: 2,
  },
  btnTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
  },
  btnText: {
    textTransform: 'uppercase',
    marginRight: Metrics.smallMargin,
  },
  btnIconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: Metrics.ratio(2),
    flex: 0.6,
  },
  switchIcon: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
  },
});
