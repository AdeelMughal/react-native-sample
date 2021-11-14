import {StyleSheet} from 'react-native';
import fonts from '../../../common/fonts';
import {Metrics, Colors} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {width: '100%', flex: 1},
  background: {width: '100%', flex: 1},
  topContainer: {
    flex: 0.25,
    paddingTop: Metrics.moderateRatio(30),
    backgroundColor: '#D15202',
  },
  search: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'flex-end',
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
      height: 7,
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
  charList: {flex: 0.4},
  item: {borderRightColor: '#333', borderRightWidth: 1},
  itemBtn: {
    flex: 1,
    paddingHorizontal: Metrics.moderateRatio(20),
  },
  itemText: {
    color: 'white',
    fontSize: Metrics.moderateRatio(22),
    textTransform: 'uppercase',
  },

  cardContainer: {flex: 1, padding: Metrics.moderateRatio(20)},
  card: {
    backgroundColor: 'white',
    flex: 1,
    height: Metrics.moderateRatio(200),
    borderRadius: Metrics.moderateRatio(30),
    flexDirection: 'row',
    paddingVertical: Metrics.moderateRatio(5),
  },
  cardSub1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Metrics.moderateRatio(15),
  },
  cardImage: {
    width: Metrics.moderateRatio(140),
    height: Metrics.moderateRatio(140),
  },
  btnContainer: {
    flex: 0.3,
    flexDirection: 'row',
  },
  actionBtn: {
    width: Metrics.moderateRatio(40),
    height: Metrics.moderateRatio(40),
    marginRight: Metrics.moderateRatio(5),
    marginVertical: Metrics.moderateRatio(5),
  },
  cardSub2: {
    flex: 1,
    paddingRight: Metrics.moderateRatio(15),
  },
  heading: {
    color: Colors.Yellow,
    fontSize: Metrics.moderateRatio(20),
    textTransform: 'uppercase',
    marginBottom: Metrics.moderateRatio(5),
  },
  meaning: {
    fontFamily: fonts.GOTHAM_LIGHT,
    color: 'black',
    fontSize: Metrics.moderateRatio(12),
  },
  btn: {
    width: Metrics.screenWidth - Metrics.moderateRatio(250),
    height: Metrics.moderateRatio(40),
    borderWidth: Metrics.moderateRatio(3),
    borderColor: Colors.Blue,
  },
  iconStyle: {
    width: Metrics.moderateRatio(25),
    height: Metrics.moderateRatio(25),
  },
  textStyle: {
    fontSize: Metrics.moderateRatio(13),
    marginLeft: Metrics.baseMargin,
    alignSelf: 'flex-start',
    color: '#000000',
  },
});
