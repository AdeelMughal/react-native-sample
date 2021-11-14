// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import PropTypes from 'prop-types';
import {ViewPropTypes, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';

// import { kGoogleLogin } from "../../config/WebService";
import {ButtonView} from '../../components';
import {googleProfileRequestConfig} from '../../config/SocialLogin';
import {Colors, Images} from '../../theme';
import styles from './styles';
import Util from '../../util';

class Google extends Component {
  static propTypes = {
    enableUserInteraction: PropTypes.bool,
    containerStyle: PropTypes.oneOfType([
      PropTypes.array,
      ViewPropTypes.style,
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    enableUserInteraction: true,
    containerStyle: {},
  };

  componentDidMount() {
    GoogleSignin.configure(googleProfileRequestConfig);
  }

  // async googleSubmit() {
  //   try {
  //     await GoogleSignIn.configure(googleProfileRequestConfig);

  //     const result = await GoogleSignIn.signInPromise();

  //     const payload = {
  //       ...result,
  //       device_type: Util.getPlatform(),
  //     };

  //     const {onGSI, getNativeObject} = this.props;

  //     if (onGSI) {
  //       if (getNativeObject) {
  //         onGSI(kGoogleLogin, result);
  //       } else {
  //         onGSI(kGoogleLogin, payload);
  //       }
  //     }
  //   } catch (error) {
  //     // At least this, but a better handler of the error is better
  //     console.log('ERROR: ' + error);
  //   }
  // }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      const payload = {
        ...userInfo,
        device_type: Util.getPlatform(),
      };
      // console.log('Gogole data found: ', payload);
      const {onGSI, getNativeObject} = this.props;

      if (onGSI) {
        payload.type = 2;
        onGSI('google', payload);
        //   if (getNativeObject) {
        //     onGSI('google', userInfo);
        //   } else {
        //     onGSI('google', payload);
        //   }
      }
    } catch (error) {
      console.log('error in google login: ', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  };

  render() {
    const {
      title,
      enableUserInteraction,
      ContainerStyle,
      IconStyle,
      ...rest
    } = this.props;

    // return null;

    return (
      <ButtonView
        onPress={enableUserInteraction && this._signIn}
        style={[
          {
            flex: 1.6,
            alignItems: 'center',
            justifyContent: 'center',
          },
          ContainerStyle,
        ]}>
        <FastImage
          source={Images.googleLogin}
          style={[styles.socialIcon, IconStyle]}
          resizeMode={FastImage.resizeMode.contain}
        />
      </ButtonView>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(Google);
