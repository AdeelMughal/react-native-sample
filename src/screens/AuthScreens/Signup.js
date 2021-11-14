import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {Text, ActivityLoader} from '../../components';
import AuthTemplate from '../../containers/AuthTemplate';
import {Yellow, Blue, TextInputColor} from '../../common/Theme';
import Inputs from '../../components/Inputs';
import DropDown from '../../components/DropDown';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import CountryPicker from 'react-native-country-picker-modal';
import {
  registerUser,
  searchCountry,
  updateSocialProfile,
  socialRegister,
} from '../../actions/AuthActions';

import fonts from '../../common/fonts';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import {DataHelper, SoundHelper} from '../../helpers';
import {
  ThemedNextButton,
  UserAvatarTickControl,
  ThemedYellowButton,
} from '../../controls';
import {Images, Metrics, Colors, Sounds} from '../../theme';

// import { Camera } from "expo-camera";
let isTablet = DeviceInfo.isTablet();
const HEIGHT = Dimensions.get('window').height;

class Signup extends Component {
  constructor(props) {
    super(props);

    const {route} = props;

    let email, name;

    // if (route) {
    //   const {params} = route;

    //   if (params) {
    //     const {userObject} = params;

    //     if (userObject) {
    //       email = userObject.email;
    //     }
    //   }
    // }
    console.log('params data in sign up: ', props.route.params);
    if (route?.params?.userObject) {
      name = route?.params?.name;
      email = route?.params?.email;
      // name = route?.params?.userObject?.name;
      // email = route?.params?.userObject?.email;
    } else if (DataHelper.getParentData().id) {
      name = DataHelper.getParentData().name;
      email = DataHelper.getParentData().email;
    } else if (route?.params) {
      // name = route?.params?.name;
      name = route?.params?.name;
      email = route?.params?.email;
    }

    this.state = {
      chooseCountryDropdown: false,
      country: '',
      name: name ? name : '',
      email: email ? email : '',
      password: '',
      countryid: '',
      countryName: '',
      countryList: [],
      secure: true,
      rememberMe: false,
    };
  }

  Register = () => {
    const {name, email, password, countryid, rememberMe} = this.state;
    const {gender, image, camera, selectedImage} = this.props.route.params;

    const {isSocialMediaSignup, userObject} = this.props.route?.params;

    let data = {
      name,
      camera,
      gender,
      secure: true,
      email,
      image,
      countrycode: countryid,
      isSocialMediaSignup,
    };

    if (email == '') {
      alert('please fill email');
      return 0;
    }
    if (!password || password == '') {
      alert('please fill your password');
      return 0;
    }
    if (countryid == '') {
      alert('please select your country');
      return 0;
    }

    if (!rememberMe) {
      alert('please accept Terms & Conditions');
      return 0;
    }

    const paramsToSend = data;

    paramsToSend.status = 1;
    paramsToSend.password = password;

    // if (isSocialMediaSignup) {
    //   paramsToSend.profileid = userObject.id;
    //   this.props.updateSocialProfile(paramsToSend, this.props.navigation, {
    //     image,
    //     selectedImage,
    //   });
    // } else {
    this.props.registerUser(paramsToSend, this.props.navigation, {
      image,
      selectedImage,
    });
    // }

    // this.props.navigation.navigate('confirmVerification', {
    //   image: image,
    //   name: name,
    //   camera: camera,
    //   gender: gender,
    //   secure: true,
    //   selectedImage: selectedImage,
    //   url:
    //     gender == 1
    //       ? `../../../assets/Images/Male${this.state.activeAvatar}.png`
    //       : `../../../assets/Images/ParentFemaleAsset${this.state.activeAvatar}.png`,
    //   email: this.state.email,
    // });
  };

  componentWillReceiveProps(props) {
    // if (props.auth.error) {
    //   this.setState({loading: false});
    // }
    if (props.auth?.countryList?.length > 0) {
      this.setState({countryList: props.auth?.countryList});
    }
  }

  countrySearch = () => {};

  renderEmailField = () => {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <Inputs
          autoCorrect={false}
          keyboardType={'email-address'}
          value={this.state.email}
          width={'70%'}
          changeText={(val) => this.setState({email: val})}
          placeholder="Enter email address"
          clearWhenHaveValue
          clearText={() => this.setState({email: ''})}
        />
      </View>
    );
  };

  renderPasswordField = () => {
    // const isSocialMediaSignup = this.props.route?.params?.isSocialMediaSignup;

    // if (!isSocialMediaSignup) {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: Metrics.ratio(10),
        }}>
        <Inputs
          width={'70%'}
          value={this.state.password}
          secure={this.state.secure}
          changeText={(val) => this.setState({password: val})}
          placeholder="Enter password"
        />
      </View>
    );
    // }
  };

  renderCountryDropdown = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: Metrics.ratio(10),
          zIndex: 1,
          // height: Metrics.ratio(45),
        }}>
        <CountryPicker
          visible={this.state.chooseCountryDropdown}
          withFilter
          withFlag
          containerButtonStyle={{
            position: 'absolute',
            top: 2 * Metrics.screenHeight,
          }}
          onSelect={(selectedCountry) => {
            this.setState({
              chooseCountryDropdown: false,
              countryName: selectedCountry.name,
              country: selectedCountry.name,
              countryid: selectedCountry.cca2,
            });
          }}
        />
        <DropDown
          searchCountry={(val) => this.props.searchCountry(val)}
          countryName={this.state.countryName}
          countries={this.state.countryList}
          chooseCountryDropdown={this.state.chooseCountryDropdown}
          style={{height: Metrics.ratio(45)}}
          openModal={() =>
            this.setState({
              chooseCountryDropdown: !this.state.chooseCountryDropdown,
            })
          }
          selectCountry={(val, name) => {
            this.setState({
              countryid: val,
              chooseCountryDropdown: false,
              countryName: name,
            });
          }}
        />
      </View>
    );
  };

  playSound = () => {
    SoundHelper.playSound(Sounds.onEveryTap);
  };

  toggleAcceptTerms = () => {
    const {rememberMe} = this.state;

    this.setState({rememberMe: !rememberMe});
  };

  renderSubmitButton = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: Metrics.ratio(10) * this.props.auth.size,
          zIndex: 0,
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: Metrics.ratio(10),
          }}>
          <TouchableOpacity
            style={{
              // width: '80%',
              alignItems: 'center',
              // marginTop: Metrics.ratio(10),
              // flexDirection: 'row',
              // justifyContent: 'center',
              alignSelf: 'center',
            }}
            onPress={this.toggleAcceptTerms}>
            <FastImage
              source={
                this.state.rememberMe
                  ? Images.rememberMeFull
                  : Images.rememberMeEmpty
              }
              style={{
                width: Metrics.ratio(25),
                height: Metrics.ratio(25),
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: 'grey',
              textAlign: 'center',
              marginLeft: Metrics.ratio(8),
              fontSize: Metrics.ratio(12),
            }}>
            Accept Terms & Conditions
          </Text>
        </View>
        {/* <ThemedYellowButton
          text={'Already have an account? SIGN IN'}
          textStyle={{
            fontSize: isTablet ? Metrics.ratio(18) : Metrics.ratio(13),
          }}
          style={{marginVertical: Metrics.smallMargin, width: '70%'}}
          onPress={() => {
            this.playSound();
            this.props.navigation.navigate('Login');
          }}
        /> */}
        <ThemedNextButton
          text="SIGN UP"
          style={{
            width: '70%',
            marginHorizontal: Metrics.baseMargin,
            marginTop: Metrics.ratio(20),
          }}
          onPress={() => {
            this.playSound();
            this.Register();
          }}
        />
        {/* <ThemedYellowButton
          text={'Already have an account? SIGN IN'}
          textStyle={{
            fontSize: isTablet ? Metrics.ratio(18) : Metrics.ratio(13),
          }}
          style={{marginVertical: Metrics.smallMargin, width: '70%'}}
          onPress={() => {
            this.playSound();
            this.props.navigation.navigate('Login');
          }}
        /> */}
      </View>
    );
  };

  renderAlreadySignInButton = () => {
    return null;

    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: Metrics.ratio(15) * this.props.auth.size,
          zIndex: 0,
          marginBottom: Metrics.ratio(20),
        }}>
        <View
          style={{
            width: '70%',
            borderRadius: Metrics.ratio(100),
            paddingVertical: isTablet ? Metrics.ratio(3) : Metrics.ratio(2),
            backgroundColor: Yellow,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            zIndex: 0,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text
              color={'light'}
              style={{
                fontSize: isTablet ? 18 : 13,
                // fontWeight: "bold",
                textDecorationLine: 'underline',
              }}>
              Already have an account? SIGN IN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderHeader = () => {
    const {name, gender, image, url, camera} = this.props.route.params;

    let imageToShow;

    if (image && image.uri) {
      imageToShow = image.uri;
    } else {
      imageToShow = image;
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          width: Metrics.screenWidth,
          marginTop: Metrics.ratio(10),
          marginBottom: Metrics.ratio(20),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.themeColors.brightYellow,
          height: Metrics.ratio(105),
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: Metrics.doubleBaseMargin - Metrics.smallMargin,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <UserAvatarTickControl
            userImage={imageToShow}
            style={{}}
            imageStyle={{
              width: Metrics.ratio(120),
              height: Metrics.ratio(120),
              marginHorizontal: 0,
              marginTop: Metrics.ratio(25),
            }}
          />

          <View
            style={{
              flex: 1,
            }}>
            <Text
              size={'large'}
              adjustFontSizeToFit
              numberOfLines={2}
              style={{
                color: Colors.Blue,
                textAlign: 'center',
              }}>
              {name.toUpperCase()}
            </Text>
            <Text
              adjustFontSizeToFit
              numberOfLines={3}
              size={'xxSmall'}
              style={{
                textAlign: 'center',
                lineHeight: isTablet ? Metrics.ratio(20) : Metrics.ratio(16),
              }}>
              Create an account to save your choices and start reading
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {name, gender, image, url, camera} = this.props.route.params;

    return (
      <AuthTemplate
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? Metrics.ratio(-100) : Metrics.ratio(10)
        }
        navigation={this.props.navigation}
        alhamd
        scroll
        heading="YOU'RE ALMOST DONE">
        {this.renderHeader()}

        <View
          style={{
            width: '100%',
            marginTop: Metrics.ratio(-20),
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <FastImage
              style={{
                width: Metrics.ratio(200),
                height: Metrics.ratio(200),
                marginTop: Metrics.ratio(-30),
              }}
              resizeMode={FastImage.resizeMode.contain}
              source={Images.MascotAsset3}
            />
          </View>
          <View
            style={{
              width: this.props.auth.orientation == 'mobile' ? '100%' : '50%',
            }}>
            {this.renderEmailField()}
            {this.renderPasswordField()}
            {this.renderCountryDropdown()}
            {this.renderSubmitButton()}
          </View>
        </View>
        <ActivityLoader isLoading={this.props.general.isLoading} />
      </AuthTemplate>
    );
  }
}

export default connect(MapSateToProps, {
  registerUser,
  searchCountry,
  updateSocialProfile,
})(Signup);
