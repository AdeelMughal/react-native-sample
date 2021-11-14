// @flow
import {StyleSheet} from 'react-native';
import fonts from '../../common/fonts';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: Colors.Yellow,
    height: 50,
    borderRadius: 50,
  },
  ImageStyle: {
    margin: 5,
    height: 35,
    width: 35,
  },
  inputStyle: {
    flex: 1,
    fontFamily: fonts.CARTERONE,
    fontWeight: '200',
    fontSize: Metrics.ratio(16),
    color: Colors.black,
  },
});
