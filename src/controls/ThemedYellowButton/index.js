// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';

import styles from './styles';

import {Text} from '../../components';
import {areEqual} from '../../util/commonUtils';
import {Metrics, Colors, Fonts, Images} from '../../theme';

export default ThemedYellowButton = React.memo((props) => {
  const {text, onPress, textStyle, style} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        {
          borderRadius: Metrics.ratio(100),
          paddingVertical: Metrics.ratio(4),
          backgroundColor: Colors.Yellow,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        },
        style,
      ]}>
      <Text
        style={[
          {
            fontSize: Metrics.ratio(14),
            textDecorationLine: 'underline',
            color: 'white',
            marginHorizontal: Metrics.smallMargin,
          },
          textStyle,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}, areEqual);

ThemedYellowButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  style: PropTypes.object,
};

ThemedYellowButton.defaultProps = {
  onPress: undefined,
  text: '',
  textStyle: {},
  style: {},
};
