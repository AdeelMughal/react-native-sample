// @flow
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getUniqueId } from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
// import {Actions} from 'react-native-router-flux';
import styles from './styles';
import commonUtils, { areEqual } from '../../util/commonUtils';
import utils from '../../util';
// import {request} from '../../actions/UserActions';
// import {
//   kAppleLogin,
//   kApiGetAppleProfile,
//   betaServerURL,
// } from '../../config/WebService';
import { Colors, Metrics, Images } from '../../theme';
import { ButtonView } from '../../components';
import { v4 as uuid } from 'uuid';
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';

const AppleSignIn = (props) => {
  let authCredentialListener = null;
  useEffect(() => {
    if (!utils.isPlatformAndroid()) {
      authCredentialListener = appleAuth.onCredentialRevoked(async () => {
        //user credentials have been revoked. Sign out of account
      });
      return () => {
        if (authCredentialListener.remove !== undefined) {
          authCredentialListener.remove();
        }
      };
    }
  }, []);

  const { onAppleLoggedIn } = props;

  const handleiOS = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
      }

      // retrieve identityToken from sign in request
      const { identityToken, user, email, fullName } = appleAuthRequestResponse;

      // you may also want to send the device's ID to your server to link a device with the account
      const deviceId = getUniqueId();

      // identityToken generated
      if (identityToken && user) {
        // send data to server for verification and sign in

        const encodedValue = encodeURIComponent(user);
        const url = betaServerURL + kApiGetAppleProfile;

        let response = await fetch(`${url}?appleUserId=${encodedValue}`);
        let data = await response.json();

        if (data && data.email) {
          if (onAppleLoggedIn) {
            onAppleLoggedIn('apple', {
              ...appleAuthRequestResponse,
              deviceId: deviceId,
              email: data.email,
            });
          }
        } else {
          // Actions.signupApple({
          //   email: email,
          //   firstName: utils.formatAppleName(fullName).firstName,
          //   lastName: utils.formatAppleName(fullName).lastName,
          //   url: kAppleLogin,
          //   payload: {
          //     ...appleAuthRequestResponse,
          //     deviceId: deviceId,
          //   },
          // });
        }
      } else {
        // no token, failed sign in
      }
    } catch (error) {
      if (error.code === AppleAuthError.CANCELED) {
        // user cancelled Apple Sign-in
      } else {
        // other unknown error
      }
    }
  };

  const handleAndroid = async () => {
    // Generate secure, random values for state and nonce
    const rawNonce = uuid();
    const state = uuid();
    const deviceId = getUniqueId();

    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: 'com.kidzlim.app.serviceid',

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: 'https://admin.kidzlim.co.uk/',

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,

      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,

      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    });

    // Open the browser window for user sign in
    const response = await appleAuthAndroid.signIn();

    if (response && response.id_token) {
      if (onAppleLoggedIn) {
        onAppleLoggedIn('apple', {
          ...response,
          identityToken: response.id_token,
          deviceId: deviceId,
        });
      }
    }
  };

  const onAppleButtonPress = () => {
    if (utils.isPlatformAndroid()) {
      handleAndroid();
    } else {
      handleiOS();
    }
  };

  return null;

};

export default AppleSignIn;

AppleSignIn.propTypes = {
  onAppleLoggedIn: PropTypes.func,
};

AppleSignIn.defaultProps = {
  onAppleLoggedIn: undefined,
};
