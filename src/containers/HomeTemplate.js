import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {Yellow, Blue} from '../common/Theme';
import {connect} from 'react-redux';
import {MapSateToProps} from '../common/MapDisptacher';
import * as Animatable from 'react-native-animatable';
import fonts from '../common/fonts';
import AsyncStorage from '@react-native-community/async-storage';

import {logout, removeSneakPeak} from '../actions/AuthActions';
import FastImage from 'react-native-fast-image';
import {SoundHelper, DataHelper} from '../helpers';
import {Sounds, Images, Metrics, Colors} from '../theme';
import {AppHeader, BaseExclaimModal, CustomizedPopup} from '../controls';
import {withNavigation} from '@react-navigation/compat';

import {setShowIsChildLoggedInModal} from '../actions/generalActions';

class HomeTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      doShowIsChildLoggedInModal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.general.showIsChildLoggedInModal !==
      nextProps.general.showIsChildLoggedInModal
    ) {
      this.state.doShowIsChildLoggedInModal =
        nextProps.general.showIsChildLoggedInModal;
    }
  }

  onLogout = () => {
    // AsyncStorage.removeItem('user');

    // this.props.logout();

    DataHelper.logoutUser();
    this.props.removeSneakPeak();
  };

  confirmLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Do you want to logout ?',
      [
        {
          text: 'Yes',
          onPress: () => {
            this.onLogout();
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  renderHeader = () => {
    const {
      auth,
      general,
      back,
      settings,
      renderUser,
      isSwitch,
      switchText,
      navigation,
      ...rest
    } = this.props;

    return (
      <AppHeader
        isAudio={general.bookReaderSound}
        isSneakBack={auth.sneakpeak}
        isBack={back}
        isSettings={settings}
        renderUser={renderUser}
        isSwitch={isSwitch}
        switchText={switchText}
        onBack={() => {
          if (auth.sneakpeak) {
            this.onLogout();
          } else if (back) {
            navigation.pop();
          }
        }}
        onUserTap={() => {
          this.playSound(Sounds.everypopup);
          if (auth.sneakpeak) {
            this.setState({modal: true});
          } else {
            navigation.navigate('SelectUserProfile');
            // this.confirmLogout();
          }
        }}
        auth={auth}
        {...rest}
      />
    );
  };

  playSound = (sound) => {
    SoundHelper.playSound(sound);
  };

  render() {
    const {auth, navigation} = this.props;

    return (
      <SafeAreaView
        style={[
          {
            flex: 1,
            backgroundColor: this.props.backgroundColor
              ? this.props.backgroundColor
              : Colors.Yellow,
          },
        ]}>
        {this.renderHeader()}
        <View
          style={{
            flex: 1,
          }}>
          {this.props.children}
        </View>
        <BaseExclaimModal
          doShowModal={this.state.modal}
          authObject={auth}
          navigation={navigation}
          onClose={() => {
            this.setState({modal: false});
          }}
          text1={'MEMBERS AREA'}
          text2={'Not a member yet? Join Now!'}
          onSignupTap={() => {
            this.setState({modal: false}, () => {
              this.props.removeSneakPeak();
            });
          }}
        />
        {this.state.doShowIsChildLoggedInModal && (
          <CustomizedPopup
            doShowModal={this.state.doShowIsChildLoggedInModal}
            msg2={'You need to switch to child to use this feature'}
            buttons={[
              [
                'Ok',
                true,
                () => {
                  this.props.setShowIsChildLoggedInModal(false);
                },
              ],
            ]}
            onClose={() => {
              this.props.setShowIsChildLoggedInModal(false);
            }}
          />
        )}
      </SafeAreaView>
    );
  }
}

export default connect(MapSateToProps, {
  logout,
  removeSneakPeak,
  setShowIsChildLoggedInModal,
})(withNavigation(HomeTemplate));
