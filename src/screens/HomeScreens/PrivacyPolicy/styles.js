// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
  },
  notificationContainer: {
    marginHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.moderateRatio(13),
    marginTop: Metrics.moderateRatio(15),
    alignItems: 'center',
    flex: 1,
  },
  subtitle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  webViewContainer: {
    height: '90%',
    width: '100%',
    fontFamily: Fonts.type.base,
    fontWeight: '200',
    backgroundColor: Colors.white,
    padding: Metrics.ratio(25),
    borderRadius: Metrics.ratio(40),
    fontSize: Metrics.ratio(16),
    borderColor: Colors.Yellow,
    borderWidth: Metrics.ratio(3),
  },
  imgBackgroundContainer: {width: '100%', flex: 1},
});
