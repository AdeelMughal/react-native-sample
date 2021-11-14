import React, {Component} from 'react';
import {Image, TouchableOpacity, View, ImageBackground} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {forgotPassword} from '../../actions/AuthActions';
import {MapSateToProps} from '../../common/MapDisptacher';
import {Blue, Yellow} from '../../common/Theme';
import fonts from '../../common/fonts';
import {ActivityLoader, Inputs, Text} from '../../components';
import HomeTemplate from '../../containers/HomeTemplate';
import FastImage from 'react-native-fast-image';
import {ThemedNextButton} from '../../controls';
import {Images, Metrics, Colors} from '../../theme';
import CustomizedPopup from '../../controls/Modals/CustomizedPopup';

class ForgotPassword extends Component {
  state = {
    email: '',
    password: '',
    secure: true,
    rememberMe: true,
    modal: '',
    modalType: '',
  };

  sendMail = async () => {
    const {email} = this.state;
    if (email == '' || email.length <= 5) {
      alert('please fill email');
      return 0;
    }

    this.props.forgotPassword({email}, this.props.navigation);
    // if (res.status == 'success') {
    //   this.setState({modal: 'Email sent successfully', modalType: res.status});
    // } else {
    //   this.setState({modal: res.reason?.toUpperCase()});
    // }
  };

  toggleModal = () => {
    const {email, modalType} = this.state;
    if (this.state.modalType == 'success') {
      this.props.navigation.navigate('ResetPassword', {email});
    }
    this.setState({modal: '', modalType: ''});
  };

  render() {
    const {modal, modalType} = this.state;
    return (
      <HomeTemplate navigation={this.props.navigation} renderUser={false} back>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <ImageBackground
            style={{width: '100%', flex: 1, alignItems: 'center'}}
            source={Images.asset124}>
            {!!modal && (
              <CustomizedPopup
                onClose={this.toggleModal}
                doShowModal={!!modal}
                type={modalType}
                msg2={modal}
                buttons={[['OK', true, this.toggleModal]]}
              />
            )}

            <ActivityLoader isLoading={this.props?.general?.isLoading} />

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <View
                style={{
                  flex: 1,
                  width:
                    this.props.auth.orientation == 'mobile' ? '80%' : '50%',
                }}>
                <View
                  style={{
                    width:
                      this.props.auth.orientation == 'mobile' ? '100%' : '50%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginTop: Metrics.ratio(40),
                    marginBottom: Metrics.ratio(10),
                  }}>
                  <FastImage
                    style={{
                      width: '80%',
                      height: 200,
                      // resizeMode: "contain",
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                    source={Images.forgotPassword}
                  />
                </View>

                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginVertical: 20,
                  }}>
                  <Text color="yellow" size="medium" textAlign="center">
                    Please enter your email address. {'\n'}You will receive a
                    link to create a{'\n'}
                    new password via email
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Text
                    color="white"
                    size="large"
                    style={{marginBottom: Metrics.ratio(10)}}>
                    EMAIL ADDRESS
                  </Text>

                  <Inputs
                    value={this.state.email}
                    changeText={(val) => this.setState({email: val})}
                    placeholder="Enter email address"
                  />
                </View>
              </View>
              <View
                style={{
                  width: Metrics.screenWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.themeColors.darkBlue,
                  height: Metrics.moderateRatio(150),
                }}>
                <ThemedNextButton
                  disabled={this.props?.general?.isLoading}
                  showGradient={false}
                  text="SEND EMAIL"
                  style={{
                    height: Metrics.moderateRatio(50),
                    marginVertical: Metrics.baseMargin,
                    backgroundColor: Colors.Yellow,
                    borderRadius: Metrics.ratio(30),
                    width: Metrics.moderateRatio(250),
                    color: Colors.black,
                  }}
                  textStyle={{
                    color: Colors.black,
                  }}
                  onPress={this.sendMail}
                  iconStyle={{
                    position: 'relative',
                    width: Metrics.moderateRatio(40),
                    height: Metrics.moderateRatio(40),
                  }}></ThemedNextButton>
              </View>
            </View>
          </ImageBackground>
          <ActivityLoader isLoading={this.props?.general?.isLoading} />
        </ScrollView>
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {
  forgotPassword,
})(ForgotPassword);
