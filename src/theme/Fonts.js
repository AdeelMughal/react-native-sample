// @flow
// Android
// title 20
// Heading 16
// desc 14

// ios
// title 20
// Heading 20
// desc 17

import {Platform} from 'react-native';
import Metrics from './Metrics';

const type = {
  base: Platform.select({
    ios: 'Carter One',
    android: 'Carter One',
  }),
  book: Platform.select({
    ios: 'Gotham Book',
    android: 'Gotham Book',
  }),
  medium: Platform.select({
    ios: 'Gotham Medium',
    android: 'Gotham Medium',
  }),
  bold: Platform.select({
    ios: 'Gotham-Bold',
    android: 'Gotham-Bold',
  }),
  light: Platform.select({
    ios: 'Gotham-Light',
    android: 'Gotham-Light',
  }),
};

// Metrics.generatedFontSize(ios, android)

const size = {
  xxxxxxSmall: Metrics.generatedFontSize(8),
  xxxxxSmall: Metrics.generatedFontSize(9),
  xxxxSmall: Metrics.generatedFontSize(11),
  xxxSmall: Metrics.generatedFontSize(12),
  xxSmall: Metrics.generatedFontSize(13),
  xSmall: Metrics.generatedFontSize(14),
  small: Metrics.generatedFontSize(15),
  normal: Metrics.generatedFontSize(17),
  medium: Metrics.generatedFontSize(18),
  large: Metrics.generatedFontSize(20),
  xLarge2: Metrics.generatedFontSize(22),
  xLarge: Metrics.generatedFontSize(24),
  xLarge3: Metrics.generatedFontSize(25),
  xLarge4: Metrics.generatedFontSize(28),
  xxLarge1: Metrics.generatedFontSize(30),
  xxLarge: Metrics.generatedFontSize(34),
  xxLarge2: Metrics.generatedFontSize(36),
  xxxLarge: Metrics.generatedFontSize(40),
  xxxxLarge: Metrics.generatedFontSize(60),
};

export default {
  type,
  size,
};
