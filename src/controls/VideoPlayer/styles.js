// @flow
import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

const {width} = Dimensions.get('window');
const height = width * Metrics.moderateRatio(0.5625);

export default StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: Metrics.moderateRatio(10),
  },
  video: {width: '100%', height, backgroundColor: 'black'},
  backgroundVideo: {
    width: width * 1,
    height: height * Metrics.moderateRatio(0.3),
  },
  controls: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: Metrics.moderateRatio(48),
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Metrics.moderateRatio(10),
  },
  duration: {
    color: '#fff',
    marginLeft: Metrics.moderateRatio(15),
  },
  buttonContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnImage: {
    width: Metrics.moderateRatio(60),
    height: Metrics.moderateRatio(60),
  },
});
