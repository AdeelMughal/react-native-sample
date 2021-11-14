// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    width: '90%',
    // height: Metrics.doubleBaseMargin * 3.5,
    borderRadius: Metrics.ratio(10),
    marginHorizontal: Metrics.ratio(5),
    marginTop: Metrics.ratio(10),
    flexDirection: 'row',

    padding: Metrics.ratio(5),
    alignItems: 'center',
    // justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Metrics.ratio(1),
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  rememberMeIcon: {
    width: Metrics.ratio(35),
    height: Metrics.ratio(35),
  },
  rememberMeContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: Metrics.ratio(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text1: {
    color: 'black',
    textAlign: 'center',
  },
  titleView: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {color: 'black', textTransform: 'uppercase'},
  priceView: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    color: 'white',
    marginTop: Metrics.ratio(7),
    textAlign: 'center',
  },
});
