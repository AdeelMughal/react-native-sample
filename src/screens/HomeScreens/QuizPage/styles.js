import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../../theme';
import fonts from '../../../common/fonts';
import {Yellow, Blue, orange, lightblue, green} from '../../../common/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  selectOptionContainer: {width: '100%', justifyContent: 'center'},
  selectOptionBtn: {
    width: '100%',
    padding: Metrics.ratio(10),
    paddingLeft: Metrics.ratio(30),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Metrics.ratio(30),

    borderWidth: Metrics.ratio(2),
    marginTop: Metrics.ratio(10),
  },
  selectOptionBtnText: {
    fontSize: Metrics.ratio(14),
    color: 'white',
  },
  rightWrongAnswerIconContainer: {
    width: '100%',
    position: 'absolute',
    padding: 0,

    justifyContent: 'center',
    marginLeft: Metrics.ratio(-30),
  },
  iconImage: {
    width: Metrics.ratio(45),
    height: Metrics.ratio(45),
  },
  headerContainer: {
    width: '80%',
    padding: Metrics.ratio(10),
    backgroundColor: orange,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Metrics.ratio(20),
    borderWidth: Metrics.ratio(2),
    borderColor: Yellow,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Metrics.ratio(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: Metrics.ratio(20),
  },
  headerText: {
    fontSize: Metrics.ratio(18),
    color: 'white',
  },
  nextBtnStyle: {
    width: Metrics.screenWidth - Metrics.moderateRatio(250),
    height: Metrics.moderateRatio(40),
    borderWidth: Metrics.moderateRatio(3),
    borderColor: Colors.Blue,
  },
  nextIconStyle: {
    width: Metrics.moderateRatio(25),
    height: Metrics.moderateRatio(25),
  },
  nextTextStyle: {
    fontSize: Metrics.moderateRatio(13),
    marginLeft: Metrics.baseMargin,
    alignSelf: 'flex-start',
    color: '#000000',
  },
  nextBtnContainer: {
    flex: 1,
    marginTop: Metrics.ratio(20),
    alignItems: 'center',
  },
  questionContainer: {width: '80%', marginTop: 10, alignItems: 'flex-start'},
  question: {
    fontSize: Metrics.ratio(16),
    color: 'white',
  },
});
