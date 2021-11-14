import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

import fonts from '../../common/fonts';
import {MapSateToProps} from '../../common/MapDisptacher';
import {Blue, TextInputColor, Yellow} from '../../common/Theme';
import {Inputs, Text} from '../../components';
import AuthTemplate from '../../containers/AuthTemplate';
import DeviceInfo from 'react-native-device-info';
import {Fonts, Images, Metrics, Colors} from '../../theme';
import {ThemedNextButton, AvatarScroll} from '../../controls';
import {DataHelper} from '../../helpers';
import CustomizedPopup from '../../controls/Modals/CustomizedPopup';
import {getFavoriteBooks} from '../../actions/BooksActions';
import _ from 'lodash';
import {fetchAllUsers} from '../../actions/usersAction';
import {setUserSelected} from '../../actions/AuthActions';

class SelectUserProfile extends Component {
  state = {
    profilesData: [],
    logoutModal: false,
  };

  componentDidMount() {
    this.props.fetchAllUsers();

    this.setState({profilesData: DataHelper.getAllUsersArray()});
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.auth.allUsersData, nextProps.auth.allUsersData)) {
      this.state.profilesData = DataHelper.getAllUsersArray();
    }
  }

  renderTitle = () => {
    return (
      <View style={styles.signUpContainer}>
        <LinearGradient
          colors={['rgba(118,251,252,1)', '#42C7E5', '#42C7E5', '#3ABFE1']}
          style={styles.signUpGrad}>
          <FastImage style={styles.signUpBookImage} source={Images.asset110} />
          <View style={styles.signUpTextView}>
            <Text style={styles.signUpText} numberOfLine={2}>
              CHOOSE YOUR{' '}
              <Text
                style={{fontSize: Metrics.moderateRatio(12)}}
                color={Yellow}>
                USER PROFILE
              </Text>{' '}
              BELOW {'\n'} TO BEGIN YOUR KIDZLIM EXPERIENCE!
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  };

  chooseAvatar = (user) => {
    const {auth} = this.props;

    DataHelper.setUserSession(user, true, true);

    this.props.setUserSelected(user);

    if (DataHelper.isChildLoggedIn()) {
      this.props.getFavoriteBooks({childid: user.id});
    }

    this.props.navigation.pop();
  };

  toggleModal = () => this.setState({logoutModal: !this.state.logoutModal});

  render() {
    const {navigation, auth} = this.props;
    const {logoutModal} = this.state;
    const loggedIn = auth?.userSelected;

    return (
      <ScrollView contentContainerStyle={{flex: 1}}>
        <AuthTemplate
          navigation={navigation}
          scroll
          fullHeader={!loggedIn}
          heading={loggedIn && 'SELECT YOUR USER PROFILE'}>
          <View style={styles.alignFullWidth}>
            {!loggedIn && this.renderTitle()}

            <View style={loggedIn ? styles.loggedIn : styles.loggedOut}>
              <Text color={Blue} size="medium">
                ASSALAM-O-ALAIKUM,
              </Text>

              <Text
                style={{
                  marginHorizontal: Metrics.doubleBaseMargin,
                  textAlign: 'center',
                }}
                numberOfLines={2}
                color={Yellow}
                size="xLarge">
                {auth?.user?.name.toUpperCase() || 'AHMED'}
              </Text>
            </View>

            {this.state.profilesData.length > 0 && (
              <AvatarScroll
                avatarList={this.state.profilesData}
                onAvatarSelected={this.chooseAvatar}
                avatarSize={Metrics.moderateRatio(145)}
                selectedAvatarId={auth?.user?.id}
                userSelection
              />
            )}

            {loggedIn && (
              <ThemedNextButton
                text="SIGN OUT"
                style={{
                  width: '70%',
                  marginHorizontal: Metrics.baseMargin,
                  marginTop: Metrics.moderateRatio(30),
                }}
                onPress={this.toggleModal}
              />
            )}
            {logoutModal && (
              <CustomizedPopup
                doShowModal={logoutModal}
                onClose={this.toggleModal}
                msg2="You are about to leave the app"
                buttons={[
                  ['FIAMANULLAH', false, DataHelper.logoutUser],
                  ['CANCEL', false, this.toggleModal],
                ]}
              />
            )}
          </View>
        </AuthTemplate>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  alignFullWidth: {
    marginTop: Metrics.baseMargin,
    alignItems: 'center',
  },
  signUpText: {
    textAlign: 'center',
    fontSize: Metrics.moderateRatio(12),
    color: 'white',
    marginLeft: Metrics.moderateRatio(40),
    fontFamily: Fonts.type.base,
  },
  signUpTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
  },
  signUpBookImage: {
    width: Metrics.moderateRatio(40),
    height: Metrics.moderateRatio(40),
    marginLeft: Metrics.moderateRatio(10),
  },
  signUpGrad: {
    zIndex: 1,
    width: Metrics.screenWidth * 0.9,
    backfaceVisibility: 'hidden',
    height: Metrics.moderateRatio(50),
    backgroundColor: Blue,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
  },
  signUpContainer: {
    borderRadius: Metrics.moderateRatio(30),
    height: Metrics.moderateRatio(50),
    overflow: 'hidden',
    marginTop: Metrics.moderateRatio(25),
    marginBottom: Metrics.moderateRatio(25),
  },
  highlightText: {color: Yellow},
  loggedIn: {
    marginTop: Metrics.moderateRatio(15),
    marginBottom: Metrics.moderateRatio(30),
    alignItems: 'center',
  },
  loggedOut: {
    marginBottom: Metrics.moderateRatio(3),
    alignItems: 'center',
  },
});

export default connect(MapSateToProps, {
  getFavoriteBooks,
  fetchAllUsers,
  setUserSelected,
})(SelectUserProfile);
