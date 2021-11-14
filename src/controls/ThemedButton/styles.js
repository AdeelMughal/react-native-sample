// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  btnContainer: {flex: 0.34, justifyContent: 'center'},
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.ratio(13),
    backgroundColor: Colors.Yellow,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
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
    flex: 1,
  },
  icon: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),
    marginRight: Metrics.ratio(15),
  },
});
