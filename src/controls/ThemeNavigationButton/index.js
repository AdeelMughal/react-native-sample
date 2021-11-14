// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Text} from '../../components';
import {Metrics, Colors, Images} from '../../theme';
import styles from './styles';

export default class ThemeNavigationButton extends React.Component {
  static propTypes = {
    heading: PropTypes.string,
    exclamation: PropTypes.string,

    onBack: PropTypes.func,
  };

  static defaultProps = {
    heading: '',
    exclamation: undefined,

    onBack: undefined,
  };

  renderExclamation = () => {
    const {exclamation} = this.props;

    if (exclamation) {
      return (
        <Text
          style={{
            fontSize: Metrics.ratio(18),
            color: Colors.themeColors.brightYellow,
            textAlign: 'center',
            top: Metrics.ratio(4),

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: Metrics.ratio(2),
            },
            shadowOpacity: 0.4,
            shadowRadius: 0.1,
          }}>
          {exclamation}
        </Text>
      );
    }

    return null;
  };

  render() {
    const {exclamation, onBack, noBack} = this.props;

    let extraStyles = {};

    if (exclamation) {
      extraStyles = {height: Metrics.ratio(55)};
    } else {
      extraStyles = {height: Metrics.ratio(45)};
    }

    return (
      <TouchableOpacity
        style={[styles.container, extraStyles]}
        onPress={onBack}
        activeOpacity={0.8}>
        <LinearGradient
          colors={['rgba(118,251,252,1)', 'rgba(36,160,193,1)']}
          style={[styles.gradientStyle, extraStyles]}>
          {noBack ? null : (
            <Image
              style={{
                width: Metrics.ratio(85),
                height: Metrics.ratio(85),
                marginLeft: Metrics.ratio(-15),
              }}
              source={Images.asset17}
            />
          )}
          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              width: '100%',
              alignItems: 'center',
              paddingLeft: Metrics.ratio(20),
            }}>
            {this.renderExclamation()}

            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                bottom: exclamation ? Metrics.ratio(5) : 0,

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: Metrics.ratio(2),
                },
                shadowOpacity: 0.4,
                shadowRadius: 0.1,
              }}>
              {this.props.heading}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
