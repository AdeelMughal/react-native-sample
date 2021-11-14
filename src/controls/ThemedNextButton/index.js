// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Text} from '../../components';
import {Colors, Metrics, Images} from '../../theme';
import styles from './styles';

export default class ThemedNextButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.object,
    text: PropTypes.string,
    text2: PropTypes.string,
    iconStyle: PropTypes.object,
    textStyle: PropTypes.object,
    gradient: PropTypes.array,
    icon: PropTypes.string,
    showGradient: PropTypes.bool,
    coloredText: PropTypes.string,
    coloredButton: PropTypes.string,
  };

  static defaultProps = {
    onPress: undefined,
    style: {},
    text: 'NEXT',
    text2: '',
    iconStyle: {},
    textStyle: {},
    gradient: ['rgba(118,251,252,1)', 'rgba(36,160,193,1)'],
    icon: Images.nextIcon,
    showGradient: true,
    coloredText: '',
    coloredButton: '',
  };

  renderGradient = (node) => {
    const {gradient} = this.props;

    return (
      <LinearGradient
        colors={gradient}
        style={[styles.gradient, styles.commonContent]}>
        {node}
      </LinearGradient>
    );
  };

  renderContent = () => {
    const {
      text,
      text2,
      iconStyle,
      textStyle,
      icon,
      showGradient,
      coloredText,
      coloredButton,
    } = this.props;

    const commonContent = (
      <>
        <View style={styles.textView}>
          <Text color={'light'} style={[styles.text, textStyle]}>
            {text}{' '}
            {text2 && (
              <Text color={coloredText} style={[styles.text, textStyle]}>
                {text2}
              </Text>
            )}
          </Text>
        </View>
        <View
          style={[
            {
              height: Metrics.ratio(40),
              width: Metrics.ratio(40),
              justifyContent: 'center',
              alignItems: 'center',

              position: 'absolute',
              right: Metrics.ratio(5),
            },
            iconStyle,
          ]}>
          <Image
            resizeMethod="auto"
            resizeMode="contain"
            style={[styles.icon]}
            source={coloredButton ? coloredButton : icon}
          />
        </View>
      </>
    );

    if (showGradient) {
      return this.renderGradient(commonContent);
    } else {
      return <View style={styles.commonContent}>{commonContent}</View>;
    }
  };

  render() {
    const {onPress, style} = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, style]}
        activeOpacity={0.8}
        onPress={onPress}>
        {this.renderContent()}
      </TouchableOpacity>
    );
  }
}
