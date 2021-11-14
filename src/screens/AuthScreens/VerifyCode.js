import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import AuthTemplate from '../../containers/AuthTemplate';
import {Yellow, Blue} from '../../common/Theme';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import CodeInput from 'react-native-confirmation-code-input';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

import {codeVerified} from '../../actions/AuthActions';
import fonts from '../../common/fonts';
import FastImage from 'react-native-fast-image';
import {DataHelper, SoundHelper} from '../../helpers';
import {kApiVerifyEmail} from '../../config/WebService';

import {Images, Metrics, Sounds} from '../../theme';
import {ThemedNextButton, ThemedYellowButton} from '../../controls';
import {Text} from '../../components';

const HEIGHT = Metrics.screenHeight;
let isTablet = DeviceInfo.isTablet();

class ConfirmVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
    };
  }

  Register = () => {
    const {name, gender, image, camera, email} = this.props.route.params;

    const final = {
      email,
      code: this.state.otp,
    };

    if (this.state.otp === '') {
      alert('please fill email');
      return 0;
    }

    this.setState({loading: true});
    this.props.codeVerified(final, this.props.navigation, {
      image,
      name,
      camera,
      gender,
      secure: true,
      email,
    });

    // this.props.navigation.navigate("confirmVerification")
  };

  componentDidMount() {
    const {email} = this.props.route.params;
    this.setState({email: email});
  }

  _codeResend = () => {
    const value = {
      email: this.state.email,
    };

    axios
      .post(DataHelper.getCompleteUrl(kApiVerifyEmail), value)
      .then((data) => {
        if (data.data.status == 'success') {
          alert(data.data.reason);
        } else {
          alert(data.data.reason);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  render() {
    const {
      name,
      gender,
      image,
      url,
      email,
      camera,
      password,
      countryid,
    } = this.props.route.params;
    return (
      <AuthTemplate
        navigation={this.props.navigation}
        heading="VERIFY ACCOUNT"
        scroll>
        <Text
          style={{
            fontSize: Metrics.ratio(20),

            color: Blue,
            textAlign: 'center',
            marginTop: Metrics.ratio(10),
          }}>
          {name.toUpperCase()}
        </Text>
        <Text
          style={{
            fontSize: Metrics.ratio(14),
            color: 'grey',
            textAlign: 'center',
          }}>
          A verification code has been sent to
        </Text>
        <Text
          style={{
            fontSize: Metrics.ratio(20),
            color: 'grey',
            textAlign: 'center',
            fontFamily: fonts.GOTHAM_BOLD,
          }}>
          {email}
        </Text>

        <View style={{width: '100%', marginTop: Metrics.ratio(40)}}>
          <View
            style={{
              width: '100%',
              backgroundColor: Yellow,
              alignItems: 'center',
              paddingVertical: Metrics.ratio(5),
              height: HEIGHT / 2.5,
            }}>
            <View
              style={{
                marginHorizontal: Metrics.baseMargin,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  flex: 1,
                  height: Metrics.ratio(160),
                }}
                resizeMode={'contain'}
                resizeMethod={'auto'}
                source={Images.asset113}
              />
              <FastImage
                style={{
                  width: Metrics.ratio(160),
                  height:
                    this.props.auth.orientation == 'mobile'
                      ? camera
                        ? Metrics.ratio(150)
                        : Metrics.ratio(180)
                      : camera
                      ? Metrics.ratio(200)
                      : Metrics.ratio(230),
                  marginHorizontal: Metrics.ratio(10) * this.props.auth.size,
                  borderRadius: Metrics.ratio(100),
                  marginTop: Metrics.ratio(-30),
                }}
                source={{uri: DataHelper.getProfileImage(image)}}
              />
              <Image
                style={{
                  flex: 1,
                  height: Metrics.ratio(160),
                }}
                resizeMode={'contain'}
                resizeMethod={'auto'}
                source={Images.asset114}
              />
            </View>
            <Text
              style={{
                fontSize: Metrics.ratio(16) * this.props.auth.size,
                color: 'white',
                textAlign: 'center',
                // fontWeight: "bold",
              }}>
              ENTER EMAIL CODE BELOW:
            </Text>
            <CodeInput
              ref="codeInputRef1"
              codeLength={4}
              keyboardType="numeric"
              inputPosition="left"
              size={Metrics.ratio(50)}
              onFulfill={(code) => {
                this.setState({otp: code});
              }}
              codeInputStyle={{
                borderWidth: 1,
                backgroundColor: '#D3AC09',
                fontSize: Metrics.ratio(30),
                borderColor: 'black',
                fontFamily: fonts.CARTERONE,
              }}
              space={Metrics.ratio(15)}
              className="border-circle"
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: Metrics.ratio(15),
          }}
          onPress={() => this._codeResend()}>
          <Text
            style={{
              color: '#3ED0E9',
              fontSize: 14,
              textDecorationLine: 'underline',
              textDecorationColor: '#3ED0E9',
            }}>
            RESEND CODE
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            // marginTop: 20,
            zIndex: 0,
          }}>
          <ThemedNextButton
            text="SUBMIT"
            style={{width: '70%', height: Metrics.ratio(50)}}
            onPress={() => {
              SoundHelper.playSound(Sounds.onEveryTap);
              this.Register();
            }}
          />

          {/* <ThemedYellowButton
            text={'Already have an account? SIGN IN'}
            textStyle={{
              fontSize: isTablet ? Metrics.ratio(18) : Metrics.ratio(13),
            }}
            style={{marginVertical: Metrics.smallMargin, width: '70%'}}
            onPress={() => this.props.navigation.navigate('Login')}
          /> */}
        </View>
      </AuthTemplate>
    );
  }
}

export default connect(MapSateToProps, {codeVerified})(ConfirmVerification);
