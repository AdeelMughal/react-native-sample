import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../../theme';

export default StyleSheet.create({
  scene: {
    flex: 1,
  },
  searchContainer: {
    height: Metrics.moderateRatio(60),
    justifyContent: 'center',
    backgroundColor: Colors.Yellow,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: Metrics.moderateRatio(3),
    borderColor: Colors.orange,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Metrics.moderateRatio(7),
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
    height: Metrics.moderateRatio(50),
    borderRadius: Metrics.moderateRatio(50),
    marginHorizontal: Metrics.moderateRatio(10),
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: Metrics.moderateRatio(50),
    height: Metrics.moderateRatio(40),
  },
  searchIcon: {
    padding: Metrics.moderateRatio(10),
    margin: Metrics.moderateRatio(5),
    height: Metrics.moderateRatio(35),
    width: Metrics.moderateRatio(35),
  },
  tabBar: {
    backgroundColor: Colors.orange,
    minHeight: Metrics.moderateRatio(30),
  },
  heading: {
    marginVertical: Metrics.ratio(10),
    paddingHorizontal: Metrics.moderateRatio(20),
  },
  pv10: {
    paddingVertical: Metrics.moderateRatio(20),
  },
  pv20: {
    paddingVertical: Metrics.moderateRatio(20),
  },
  ph20: {
    paddingHorizontal: Metrics.moderateRatio(20),
  },
  separator: {
    width: Metrics.screenWidth - Metrics.moderateRatio(40),
  },
  scrollview: {padding: Metrics.moderateRatio(10)},
});
