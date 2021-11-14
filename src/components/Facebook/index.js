// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  LoginButton,
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {ViewPropTypes, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {ButtonView, Text} from '../../components';
// import {request} from '../../actions/UserActions';
// import {kFBLogin} from '../../config/WebService';
import {
  FACEBOOK_PERMISSIONS,
  profileRequestConfig,
} from '../../config/SocialLogin';
import {Colors, Images} from '../../theme';
import styles from './styles';
import Util from '../../util';
import PropTypes from 'prop-types';

class Facebook extends Component {
  static propTypes = {
    enableUserInteraction: PropTypes.bool,
    containerStyle: PropTypes.oneOfType([
      PropTypes.array,
      ViewPropTypes.style,
      PropTypes.object,
    ]),
    title: PropTypes.string,
  };

  static defaultProps = {
    enableUserInteraction: true,
    containerStyle: {},
    title: 'LOGIN USING FACEBOOK',
  };

  _onPress = () => {
    LoginManager.logInWithPermissions(FACEBOOK_PERMISSIONS).then(
      (login) => {
        if (!login.isCancelled) {
          const {onFBLoggedIn, getNativeObject} = this.props;
          AccessToken.getCurrentAccessToken().then((data) => {
            let req = new GraphRequest(
              '/me',
              {
                httpMethod: 'GET',
                version: 'v2.5',
                parameters: {
                  fields: {
                    string: 'email,name,picture',
                  },
                },
              },
              (err, res) => {
                console.log('response from graph request: ', err, res);
                if (onFBLoggedIn) {
                  console.log('facebook logged in data: ', res);
                  res.type = 1;
                  onFBLoggedIn('facebook', res);
                }
              },
            );
            new GraphRequestManager().addRequest(req).start();
            // console.log('req: ', req);
            // if (onFBLoggedIn) {
            //   console.log('facebook logged in data: ', data);
            //   onFBLoggedIn('facebook', data);
            // }
          });
        }
      },
      (error) => {
        console.log('Login fail with error: ', error);
      },
    );
  };

  render() {
    const {
      title,
      enableUserInteraction,
      ContainerStyle,
      IconStyle,
      ...rest
    } = this.props;

    return (
      <>
        <ButtonView
          onPress={enableUserInteraction && this._onPress}
          style={[
            {
              flex: 1.6,
              alignItems: 'center',
              justifyContent: 'center',
            },
            ContainerStyle,
          ]}>
          <FastImage
            source={Images.facebookLogin}
            style={[styles.socialIcon, IconStyle]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </ButtonView>
        {/* <LoginButton
  publishPermissions={['publish_actions']}
  readPermissions={['public_profile']}
  onLoginFinished={
    (error, result) => {
      if (error) {
        console.log('login has error: ', result.error)
      } else if (result.isCancelled) {
        console.log('login is cancelled.')
      } else {
        AccessToken.getCurrentAccessToken().then((data) => {
          const { accessToken } = data
          initUser(accessToken)
        })
      }
    }
  }
  onLogoutFinished={logout} /> */}
      </>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {
  // request,
};

export default connect(mapStateToProps, actions)(Facebook);
