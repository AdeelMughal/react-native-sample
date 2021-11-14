// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import {Text} from '../../components';
import {Metrics, Colors, Images} from '../../theme';
import styles from './styles';

export default class Empty extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number,
    ]),
    type: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,
    iconStyle: PropTypes.object,
    textStyle: PropTypes.object,
    miniBtnStyle: PropTypes.object,
    miniBtnText: PropTypes.object,
  };

  static defaultProps = {
    onPress: undefined,
    style: {},
    icon: undefined,
    type: '',
    text: '',
    iconStyle: {},
    textStyle: {},
    miniBtnStyle: {},
    miniBtnText: {},
  };

  render() {
    const {
      type,
      style,
      onPress,
      icon,
      text,
      iconStyle,
      textStyle,
      miniBtnStyle,
      miniBtnText,
      ...rest
    } = this.props;

    let textViewStyle = {};

    if (icon) {
      textViewStyle = {marginRight: Metrics.smallMargin};
    }

    if (type === 'mini') {
      return (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.btn, miniBtnStyle]}
            onPress={onPress}>
            <View style={styles.btnTextContainer}>
              <Text style={[styles.btnText, miniBtnText]}>{text}</Text>
            </View>
            <View style={styles.btnIconContainer}>
              <Image
                resizeMethod="auto"
                resizeMode="contain"
                style={[styles.icon, iconStyle]}
                source={Images.asset18}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={[
          {
            flex: 1,
            borderRadius: Metrics.ratio(20),
            overflow: 'hidden',
          },
          style,
        ]}
        activeOpacity={0.8}
        onPress={onPress}
        {...rest}>
        <LinearGradient
          colors={['rgba(118,251,252,1)', 'rgba(36,160,193,1)']}
          style={{
            flex: 1,
            backgroundColor: Colors.Blue,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {icon && (
            <Image
              resizeMethod="auto"
              resizeMode="contain"
              style={[
                {
                  width: Metrics.ratio(30),

                  marginLeft: Metrics.smallMargin,
                },
                iconStyle,
              ]}
              source={icon}
            />
          )}
          <View
            style={[
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
              textViewStyle,
              textStyle,
            ]}>
            <Text size="small" color={'light'}>
              {text}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
