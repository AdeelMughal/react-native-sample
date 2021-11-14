import {Platform} from 'react-native';

const Blue = '#2BDAF7';
const Yellow = '#FFCE00';
const TextInputColor = '#E8EDF1';
const orange = '#F39222';
const green = '#8DC73F';
const lightblue = '#159DD0';
const textYellow = '#FFFF01';
const yellowGradient = ['#FCEF00', '#FFD600', '#FECE00'];
const greyGradient = ['#AFAFAF', '#AFAFAF', '#AFAFAF'];

const white = '#FFFFFF';
const black = '#000000';
const grey = Platform.select({
  ios: '#F4F4F4',
  android: '#FAFAFA',
});
const medGrey = '#CCCCCC';
const lightGrey = '#f3f3f3';
const transparent = 'rgba(0,0,0,0)';

const primary = white;
const secondary = white;
const tertiary = black;
const quaternary = grey;

const background = {
  primary,
  secondary: '#f2f2f2',
  tertiary: '#00000057',
};

const text = {
  primary: '#212121',
  secondary: '#bcbcbc',
  tertiary: primary,
  quaternary: '#707070',
  accent: '#ff2824',
  linkText: '#3380cb',
  light: white,
  BLUE: '#2BDAF7',
  Yellow: '#FFCE00',
  gray: '#808080',
  black: '#000000',
  orange: '#f89a00',
  popupBlue: '#54b7bd',
};

const themeColors = {
  hilite: '#3ad1ce',
  btnHilite: '#edf4ff',
  border: '#b9b9b9',
  borderLite: '#eef1f7',
  hrLine: '#E9E8E8',
  mediumBlue: '#3999BF',
  linkText: '#3380cb',
  unreadMessage: '#cee7ff',
  toastColor: '#b5b5b5',
  themeDarkColor: '#051548',
  doneButtonColor: '#52ef0c',
  disabledDoneButtonColor: '#b9b9b9',
  purple: '#8800FF',

  positive: '#2ca502',
  destructive: '#e45858',
  decision: 'rgb(215, 110, 51)',
  lemonYellow: '#FEED01',
  brightYellow: '#fdf151',
  darkBlue: '#0175d6',
  inactiveDotColor: '#8a8a80',
};

const presetColors = {
  primary: ['#febb5b', '#f24645'],
  secondary: ['#f24645', '#febb5b'],
  mangwaloPreset: [
    'rgb(38, 37, 95)',
    'rgb(23, 62, 143)',
    'rgb(39, 160, 162)',
    'rgb(194, 210, 54)',
    'rgb(255, 221, 19)',
    'rgb(120, 182, 61)',
    'rgb(246, 169, 36)',
    'rgb(233, 94, 33)',
    'rgb(226, 0, 32)',
    'rgb(149, 35, 65)',
    'rgb(228, 24, 93)',
    'rgb(83, 46, 117)',
    'rgb(30, 87, 160)',
    'rgb(55, 166, 217)',
  ],
  instagram: [
    'rgb(106, 57, 171)',
    'rgb(151, 52, 160)',
    'rgb(197, 57, 92)',
    'rgb(231, 166, 73)',
    'rgb(181, 70, 92)',
  ],
  firefox: [
    'rgb(236, 190, 55)',
    'rgb(215, 110, 51)',
    'rgb(181, 63, 49)',
    'rgb(192, 71, 45)',
  ],
  sunrise: [
    'rgb(92, 160, 186)',
    'rgb(106, 166, 186)',
    'rgb(142, 191, 186)',
    'rgb(172, 211, 186)',
    'rgb(239, 235, 186)',
    'rgb(212, 222, 206)',
    'rgb(187, 216, 200)',
    'rgb(152, 197, 190)',
    'rgb(100, 173, 186)',
  ],
};

const navbar = {
  background: themeColors.Blue,
  text: white,
};

const border = '#f2f2f2';
const separator = '#f2f2f2';

const windowTint = 'rgba(0, 0, 0, 0.4)';
const windowTintWhite = 'rgba(255, 255, 255, 0.1)';

export default {
  Blue,
  Yellow,
  TextInputColor,
  orange,
  green,
  lightblue,
  textYellow,
  yellowGradient,
  greyGradient,

  white,
  black,
  grey,
  medGrey,
  lightGrey,
  transparent,
  themeColors,

  primary,
  secondary,
  tertiary,
  quaternary,

  background,
  navbar,
  text,
  presetColors,

  border,
  separator,
  windowTint,
  windowTintWhite,

  twitter: '#41abe1',
  google: '#e94335',
  facebook: '#3b5998',

  info: '#19bfe5',
  warning: '#feb401',
  danger: '#ed1c4d',
  success: '#b76c94',

  rowColor: '#dbdbdb',
};
