import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/AuthActions';
import fonts from '../../common/fonts';
import {MapSateToProps} from '../../common/MapDisptacher';
import {Blue, TextInputColor, Yellow} from '../../common/Theme';
import {
  Inputs,
  Text,
  ActivityLoader,
  Facebook,
  Google,
  Instagram,
} from '../../components';
import AuthTemplate from '../../containers/AuthTemplate';
import DeviceInfo from 'react-native-device-info';
import {Fonts, Images, Metrics, Colors} from '../../theme';
import {ThemedNextButton} from '../../controls';

// import { Camera } from "expo-camera";
let isTablet = DeviceInfo.isTablet();
class Login extends Component {
  state = {
    email: '',
    password: '',
    secure: true,
    rememberMe: false,
  };

  async componentDidMount() {
    const email = await this.getRememberedUser();
    const password = await this.getRememberedPassword();

    this.setState({
      email: email || '',
      password: password || '',
      rememberMe: email && password ? true : false,
    });
  }

  Login = () => {
    const {email, password, rememberMe} = this.state;
    const final = {email, password};
    if (email == '') {
      alert('please fill email');
      return 0;
    }

    if (password == '') {
      alert('please fill your password');
      return 0;
    }

    if (rememberMe && email) {
      this.rememberUser();
    }

    this.props.loginUser(final, this.props.navigation);
  };

  rememberUser = async () => {
    try {
      await AsyncStorage.setItem('rememberedUser', this.state.email);
      await AsyncStorage.setItem('rememberedPassword', this.state.password);
    } catch (error) {
      alert('Could not remember user!');
    }
  };

  forgetUser = async () => {
    try {
      await AsyncStorage.removeItem('rememberedUser');
      await AsyncStorage.removeItem('rememberedPassword');
    } catch (error) {
      console.log(error);
    }
  };

  getRememberedUser = async () => {
    try {
      const email = await AsyncStorage.getItem('rememberedUser');
      if (email !== null) {
        return email;
      }
    } catch (error) {
      console.log(error, 'No user found');
    }
  };

  getRememberedPassword = async () => {
    try {
      const password = await AsyncStorage.getItem('rememberedPassword');
      if (password !== null) {
        return password;
      }
    } catch (error) {}
  };

  onSocialLogin = (platform, platformData) => {
    // this.props.socialLogin(platformData, platform, this.props.navigation);
    // console.log('Getting data in launchh screen', platform, platformData);
    // this.props.socialRegister(platformData, platform, this.props.navigation);
    // platformData.type = 1;
    // if (platformData.type == 1) {
    //   platformData.photo = platformData.picture.data.url;
    // }
    // this.props.navigation.navigate('chooseAvatar', {
    //   isSocialMediaSignup: true,
    //   smObject: platformData,
    //   smSource: platform,
    // });
  };

  renderLinks = () => (
    <View style={styles.signupLinkBox}>
      <View style={styles.signupLinkView}>
        <TouchableOpacity
          onPress={() => this.props.navigation.replace('chooseAvatar')}
          activeOpacity={0.8}>
          <Text style={styles.signupLinkText}>
            Don't have an account? SIGNUP
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.forgotBtn}
        onPress={() => this.props.navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotBtnText}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
  );

  toggleRememberMe = () => {
    const {rememberMe} = this.state;

    this.setState({rememberMe: !rememberMe});
    if (!rememberMe) {
      this.rememberUser();
    } else {
      this.forgetUser();
    }
  };

  rememberMe = () => {
    const {rememberMe} = this.state;
    return (
      <TouchableOpacity
        style={styles.rememberMeContainer}
        onPress={this.toggleRememberMe}>
        <FastImage
          source={rememberMe ? Images.rememberMeFull : Images.rememberMeEmpty}
          style={styles.rememberMeIcon}
        />
        <Text style={styles.rememberMeText}>REMEMBER ME</Text>
      </TouchableOpacity>
    );
  };

  renderBtn = () => (
    <View
      style={[
        styles.signInBtnContainer,
        {marginTop: Metrics.ratio(10) * this.props.auth.size},
      ]}>
      <ThemedNextButton
        style={styles.signInBtn}
        iconStyle={styles.signInIcon}
        onPress={() => this.Login()}
        text="SIGN IN"
      />
    </View>
  );

  render() {
    // const { name, gender, image, url } = this.props.route.params;
    return (
      <ScrollView contentContainerStyle={{flex: 1}}>
        <AuthTemplate
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? Metrics.ratio(-160) : Metrics.ratio(10)
          }
          navigation={this.props.navigation}
          scroll
          fullHeader
          noHeading>
          <View style={styles.headImgBox}>
            {/* Image will be added here */}
            <View style={styles.headImgContainer}>
              <FastImage
                style={styles.headImg}
                resizeMode={FastImage.resizeMode.contain}
                source={Images.kids}
              />
            </View>
            <View
              style={{
                width: this.props.auth.orientation == 'mobile' ? '80%' : '50%',
              }}>
              <View style={styles.alignFullWidthMargin}>
                <Inputs
                  value={this.state.email}
                  changeText={(val) => this.setState({email: val})}
                  placeholder="Enter email address"
                  clearWhenHaveValue
                  clearText={() => this.setState({email: ''})}
                />
              </View>

              <View style={styles.alignFullWidthMargin}>
                <Inputs
                  width="80%"
                  value={this.state.password}
                  secure={this.state.secure}
                  changeText={(val) => this.setState({password: val})}
                  placeholder="Enter password"
                />
              </View>

              {this.rememberMe()}

              {this.renderBtn()}

              {/* <View style={{flex: 1}}> */}
              <View style={styles.footerButton}>
                <Facebook
                  onFBLoggedIn={this.onSocialLogin}
                  ContainerStyle={{flex: 0, marginHorizontal: 0}}
                  IconStyle={{
                    width: Metrics.moderateRatio(60),
                    height: Metrics.moderateRatio(60),
                  }}
                />
                <Google
                  onGSI={this.onSocialLogin}
                  ContainerStyle={{flex: 0, marginHorizontal: 0}}
                  IconStyle={{
                    width: Metrics.moderateRatio(60),
                    height: Metrics.moderateRatio(60),
                  }}
                />
                <Instagram
                  onInstaLogin={this.onSocialLogin}
                  ContainerStyle={{flex: 0, marginHorizontal: 0}}
                  IconStyle={{
                    width: Metrics.moderateRatio(60),
                    height: Metrics.moderateRatio(60),
                  }}
                />
                {/* <AppleSignIn onAppleLoggedIn={this.onSocialLogin} /> */}
              </View>
              {/* </View> */}

              {this.renderLinks()}
            </View>
          </View>
        </AuthTemplate>
        <ActivityLoader isLoading={this.props.general.isLoading} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  rememberMeContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: Metrics.ratio(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  footerButton: {
    flexDirection: 'row',
    // borderRadius: Metrics.ratio(14),
    // borderColor: 'black',
    // borderWidth: Metrics.hairLineWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.ratio(20),
  },
  footerButtonText: {
    marginHorizontal: Metrics.ratio(2),
  },
  rememberMeIcon: {
    width: Metrics.ratio(35),
    height: Metrics.ratio(35),
  },
  rememberMeText: {
    fontWeight: 'bold',
    color: 'grey',
    paddingHorizontal: Metrics.ratio(10),
    fontSize: Metrics.ratio(14),
    fontFamily: Fonts.type.base,
  },
  signInBtnContainer: {
    width: '100%',
    alignItems: 'center',
    zIndex: 0,
  },
  signInBtn: {
    width: '80%',
    height: Metrics.moderateRatio(45),
  },
  signInIcon: {
    width: Metrics.ratio(35),
    height: Metrics.ratio(35),
  },
  signupLinkBox: {
    width: '100%',
    alignItems: 'center',
    marginTop: Metrics.ratio(10),
    zIndex: 0,
    marginBottom: Metrics.ratio(20),
  },
  signupLinkView: {
    width: '80%',
    borderRadius: Metrics.ratio(100),
    paddingVertical: Metrics.ratio(2),
    backgroundColor: Yellow,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Metrics.ratio(10),
    zIndex: 0,
  },
  signupLinkText: {
    fontSize: Metrics.ratio(12),
    // fontWeight: "bold",
    textDecorationLine: 'underline',
    color: 'white',
    fontFamily: Fonts.type.base,
  },
  forgotBtn: {marginTop: Metrics.ratio(10)},
  forgotBtnText: {
    color: Colors.text.BLUE,
    textDecorationLine: 'underline',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.xSmall,
  },
  headBox1: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginTop: Metrics.ratio(10),
  },
  headBox2: {
    width: '100%',
    height: Metrics.ratio(90),
    backgroundColor: Blue,
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 0,
  },
  logo: {
    width: Dimensions.get('window').width / 1.4,
    height: Dimensions.get('screen').width / 3,
    zIndex: 1,
  },
  headImgBox: {
    width: '100%',
    // flexDirection:
    //   this.props.auth.orientation == "mobile" ? "column" : "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headImgContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headImg: {
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').height / 3,
    // resizeMode: "contain",
    // marginTop: Metrics.ratio(-35),
  },
  alignFullWidthMargin: {
    width: '100%',
    alignItems: 'center',
    marginTop: Metrics.ratio(10),
  },
});

export default connect(MapSateToProps, {loginUser})(Login);
