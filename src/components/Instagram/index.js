// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import axios from 'axios';
import {View, ViewPropTypes, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {ButtonView, Text} from '../../components';
// import {request} from '../../actions/UserActions';
// import {kFBLogin} from '../../config/WebService';
import {
  FACEBOOK_PERMISSIONS,
  profileRequestConfig,
} from '../../config/SocialLogin';

import InstagramLogin from 'react-native-instagram-login';
import CookieManager from '@react-native-community/cookies';

import {Colors, Images} from '../../theme';
import styles from './styles';
import Util from '../../util';
import PropTypes from 'prop-types';

class Instagram extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  _onPress = () => {
    LoginManager.logInWithPermissions(FACEBOOK_PERMISSIONS).then(
      (login) => {
        if (!login.isCancelled) {
          const {onFBLoggedIn, getNativeObject} = this.props;
          AccessToken.getCurrentAccessToken().then((data) => {
            if (onFBLoggedIn) {
              console.log('facebook logged in data: ', data);
              onFBLoggedIn('facebook', data);
            }
          });
        }
      },
      (error) => {
        console.log('Login fail with error: ', error);
      },
    );
  };

  setIgToken = async (data) => {
    // console.log('data', data);
    const {onInstaLogin} = this.props;

    await axios
      .get(
        `https://graph.instagram.com/me?fields=id,username&access_token=${data.access_token}`,
        // `https://graph.instagram.com/me/media?fields=id,caption&access_token=${data.access_token}`,
        // `https://graph.instagram.com/me?/fields=user_profile_picture&access_token=${data.access_token}`,
      )
      .then((data) => {
        // console.log('instagram data: ', data.data);
        let newData = data.data;
        newData.type = 3;
        newData.name = newData.username;
        console.log('new updated data for insta: ', newData);
        onInstaLogin('instagram', newData);
      });
    // onInstaLogin();
    // this.setState({token: data.access_token});
    // const {onFBLoggedIn, getNativeObject} = this.props;
  };

  onClear() {
    CookieManager.clearAll(true).then((res) => {
      this.setState({token: null});
    });
  }

  render() {
    const {
      title,
      enableUserInteraction,
      ContainerStyle,
      IconStyle,
      ...rest
    } = this.props;

    return (
      <View>
        <ButtonView
          onPress={() => {
            enableUserInteraction && this.instagramLogin.show();
          }}
          style={[
            {
              flex: 1.6,
              alignItems: 'center',
              justifyContent: 'center',
            },
            ContainerStyle,
          ]}>
          <FastImage
            source={Images.insta}
            style={[styles.socialIcon, IconStyle]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </ButtonView>
        <InstagramLogin
          ref={(ref) => (this.instagramLogin = ref)}
          appId="915904415979049"
          appSecret="8459689c0633c381fa9a35fe8106bc6c"
          redirectUrl="https://github.com/"
          scopes={['user_profile', 'user_media']} //, 'user_media'
          onLoginSuccess={this.setIgToken}
          onLoginFailure={(data) => console.log(data)}
        />
      </View>
    );
  }
}

//userId: '17841401881483192'
// token IGQVJVNVJwS0tOVTlwU2pmZAjE2TFdEeVZA5OHA4Qm1uZAFpkQV85b0dhbnZAfMi1UeTlKMTlzMnVxQXZAtZAUVHWXZAMSFFXMndsZADF3dWNJT2RzeThtYzFBNW5XNGFyaE1GUFdiTkJKallZAMHYtaW1vc2REc0RLXzE5VDNkdm5n

const mapStateToProps = () => ({});

const actions = {
  // request,
};

export default connect(mapStateToProps, actions)(Instagram);
