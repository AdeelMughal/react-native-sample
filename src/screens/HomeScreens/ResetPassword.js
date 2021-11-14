import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {resetPassword} from '../../actions/AuthActions';
import {MapSateToProps} from '../../common/MapDisptacher';
import {Blue, Yellow, TextInputColor} from '../../common/Theme';
import fonts from '../../common/fonts';
import {
  ActivityLoader,
  Inputs,
  FastImageBackground,
  Text,
} from '../../components';
import HomeTemplate from '../../containers/HomeTemplate';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import {ThemedNextButton} from '../../controls';
import CustomizedPopup from '../../controls/Modals/CustomizedPopup';

import {Fonts, Images, Metrics, Colors} from '../../theme';

// import { Camera } from "expo-camera";
let isTablet = DeviceInfo.isTablet();

class ResetPassword extends Component {
  state = {
    // email: this.props.auth.user.email,
    oldPassword: '',
    newPassword: '',
    secure: true,
    secure1: true,
    modal: '',
    modalType: '',
  };

  updatePassword = async () => {
    const {email} = this.props?.route?.params;

    const final = {
      email,
      oldpassword: this.state.oldPassword,
      newpassword: this.state.newPassword,
    };

    const res = await this.props.resetPassword(final, this.props.navigation);
    if (res.status == 'success') {
      this.setState({
        modal: 'Password reset successfully',
        modalType: res.status,
      });
    } else {
      this.setState({modal: res.reason?.toUpperCase()});
    }
  };

  renderHeader = () => {
    return (
      <View
        style={{
          width: this.props.auth.orientation == 'mobile' ? '100%' : '50%',
          alignItems: 'center',
          justifyContent: 'flex-end',

          marginTop: Metrics.ratio(30),
        }}>
        <FastImage
          style={{
            width: '100%',
            height: Metrics.ratio(200),
            // resizeMode: "contain",
          }}
          resizeMode={FastImage.resizeMode.contain}
          source={Images.forgotPassword}
        />
      </View>
    );
  };

  renderCurrentPassword = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: Metrics.ratio(30),
          marginBottom: Metrics.ratio(10),
        }}>
        <Text color="#fff" size={'large'}>
          CURRENT PASSWORD
        </Text>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: Metrics.ratio(10),
          }}>
          <Inputs
            styles={{
              backgroundColor: Colors.white,
              color: Colors.text.gray,
            }}
            width={'70%'}
            value={this.state.oldPassword}
            secure={this.state.secure}
            changeText={(val) => this.setState({oldPassword: val})}
            placeholder="Old Password"
          />
        </View>
      </View>
    );
  };

  renderNewPassword = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginVertical: Metrics.ratio(10),
        }}>
        <Text color="#fff" size={'large'}>
          NEW PASSWORD
        </Text>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: Metrics.ratio(10),
          }}>
          <Inputs
            styles={{
              backgroundColor: Colors.white,
              color: Colors.text.gray,
            }}
            width={'70%'}
            value={this.state.newPassword}
            secure={this.state.secure1}
            changeText={(val) => this.setState({newPassword: val})}
            placeholder="New Password"
          />
        </View>
      </View>
    );
  };

  renderUpdateButton = () => {
    return (
      <View
        style={{
          width: Metrics.screenWidth,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.themeColors.darkBlue,
          height: Metrics.moderateRatio(200),
        }}>
        <ThemedNextButton
          disabled={this.props?.general?.isLoading}
          showGradient={false}
          text="UPDATE"
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
          onPress={this.updatePassword}
          iconStyle={{
            position: 'relative',
            width: Metrics.moderateRatio(40),
            height: Metrics.moderateRatio(40),
          }}></ThemedNextButton>
      </View>
    );
  };

  render() {
    const {modal, modalTypes} = this.state;
    return (
      <HomeTemplate renderUser={true} back navigation={this.props.navigation}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <ImageBackground
            source={Images.asset124}
            style={{
              flex: 1,
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              justifyContent: 'space-between',
            }}
            resizeMode="cover">
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
            <View>
              {this.renderHeader()}

              {this.renderCurrentPassword()}
              {this.renderNewPassword()}
            </View>

            {this.renderUpdateButton()}
          </ImageBackground>
        </ScrollView>
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {resetPassword})(ResetPassword);
