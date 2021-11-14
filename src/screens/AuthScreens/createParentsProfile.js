import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import fonts from '../../common/fonts';
import {Blue, Yellow, TextInputColor} from '../../common/Theme';
import LinearGradient from 'react-native-linear-gradient';
import AuthTemplate from '../../containers/AuthTemplate';
import Inputs from '../../components/Inputs';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import {getCategories} from '../../actions/BooksActions';
import {getTopics} from '../../actions/SignUpActions';

import DeviceInfo from 'react-native-device-info';

import {DataHelper, SoundHelper} from '../../helpers';
import {Text, ImagePicker} from '../../components';
import {ThemedNextButton, AvatarScroll, GenderControl} from '../../controls';
import {Images, Metrics, Colors, Sounds} from '../../theme';

let isTablet = DeviceInfo.isTablet();
class ChooseAvatar extends Component {
  constructor(props) {
    super(props);

    const {route} = props;
    let username;
    let userData;
    if (route?.params?.userObject) {
      username = route?.params?.userObject?.name;
    } else if (DataHelper.getParentData()) {
      username = DataHelper.getParentData().name;
    }

    if (route?.params?.smObject?.type == 1) {
      userData = route?.params?.smObject;
      console.log('came in type 1', route.params);
    } else if (route?.params?.smObject?.type == 2) {
      userData = route?.params?.smObject?.user;
      console.log('came in type 2', route.params);
    } else if (route?.params?.smObject?.type == 3) {
      userData = route?.params?.smObject;
      console.log('came in type 3', userData);
    }
    // if (route?.params?.smObject?.user) {
    //   userData = route?.params?.smObject?.user;
    // }

    this.state = {
      gender: 'male',
      activeAvatar: userData && userData.photo ? userData.photo : '',
      // profileName: username ? username : '',
      user_data: userData,
      profileName:
        userData && userData.type == 1
          ? userData.name
          : userData && userData.type == 3
          ? userData.name
          : userData && userData.givenName
          ? userData.givenName + ' ' + userData.familyName
          : '',
      selectedAvatar: '',
      camera: false,
      fromCamera: userData && userData.photo ? true : false,
      avatarId: userData && userData.photo ? undefined : '',
      selectedImage: userData && userData.photo ? userData.photo : undefined,
      email: userData && userData.email ? userData.email : '',

      // selectedImage: this.state.user_data.photo, // imagePicked,
      // activeAvatar: this.state.user_data.photo, // imagePicked,
      // fromCamera: true,
      // avatarId: undefined,
      // email: this.state.user_data.email,
    };
  }

  onImagePicked = (imagePicked) => {
    this.setState({
      selectedImage: imagePicked,
      activeAvatar: imagePicked,
      fromCamera: true,
      avatarId: undefined,
    });
  };

  chooseAvatar = (selectedAvatar) => {
    const {image, id, selected} = selectedAvatar;

    this.setState({
      activeAvatar: selected,
      fromCamera: false,
      selectedImage: undefined,
      avatarId: id,
    });
  };

  async componentDidMount() {
    // console.log('data in avatar screen: ', this.props.route.params);
    this.props.getCategories();
    this.props.getTopics();

    this.props.auth.fatherAvatar.map((item, i) => {
      Image.prefetch(item.selected);
      Image.prefetch(item.image);
    });

    this.props.auth.motherAvatar.map((item, i) => {
      Image.prefetch(item.selected);
      Image.prefetch(item.image);
    });
    this.props.auth.boyAvatar.map((item, i) => {
      Image.prefetch(item.selected);
      Image.prefetch(item.image);
    });
    this.props.auth.girlAvatar.map((item, i) => {
      Image.prefetch(item.selected);
      Image.prefetch(item.image);
    });

    if (this.state.user_data) {
      this.setState({
        selectedImage: this.state.user_data.photo, // imagePicked,
        activeAvatar: this.state.user_data.photo, // imagePicked,
        fromCamera: true,
        avatarId: undefined,
        email: this.state.user_data.email,
      });
    }
  }

  renderHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: Metrics.ratio(35),
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.Blue,
            fontSize: Metrics.ratio(14),
            lineHeight: Metrics.ratio(16),
          }}>
          A profile allows parent's to keep track {'\n'} of the books your child
          enjoy,their {'\n'} reading progress, and the rewards {'\n'} they've
          earned.
        </Text>
      </View>
    );
  };

  renderChooseAvatarHeading = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: Metrics.ratio(20),
        }}>
        <Text
          style={{
            color: Yellow,
            textAlign: 'center',

            fontSize: Metrics.ratio(18),
          }}>
          CHOOSE YOUR AVATAR
        </Text>
      </View>
    );
  };

  playSound = () => {
    SoundHelper.playSound(Sounds.onEveryTap);
  };

  renderNameField = () => {
    return (
      <View
        style={{
          width: '75%',
          alignItems: 'center',
        }}>
        <Inputs
          autoCorrect={false}
          autoCapitalize={'words'}
          changeText={(val) => this.setState({profileName: val})}
          value={this.state.profileName}
          placeholder="Enter Profile Name"
          clearWhenHaveValue
          clearText={() => this.setState({profileName: ''})}
        />
      </View>
    );
  };
  renderNextButton = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: Metrics.ratio(10) * this.props.auth.size,
          zIndex: 0,
        }}>
        <ThemedNextButton
          text="NEXT"
          style={{width: '70%', marginHorizontal: Metrics.baseMargin}}
          onPress={() => {
            this.playSound();

            this.onNextTap();
          }}
        />
      </View>
    );
  };

  onNextTap = () => {
    const {activeAvatar, profileName, gender, fromCamera} = this.state;

    // const isSocialMediaSignup = this.props.route?.params?.isSocialMediaSignup;
    const userObject = this.props.route?.params?.userObject;

    if (activeAvatar == '' && profileName == '') {
      alert('Please select your avatar and enter your name');
      return 0;
    }
    if (activeAvatar == '') {
      alert('Please select your avatar');
      return 0;
    }
    if (profileName == '') {
      alert('Please enter your name');
      return 0;
    }

    const data = {
      selectedImage: activeAvatar,
      image: activeAvatar,
      name: profileName,
      gender,
      camera: fromCamera ? 1 : 0,
      email: this.state.email,
      isSocialMediaSignup: this.props.route?.params?.isSocialMediaSignup
        ? this.props.route.params.isSocialMediaSignup
        : false,
    };

    if (DataHelper.getParentData() && DataHelper.getParentData().isexternal) {
      data.isSocialMediaSignup = true;
      data.userObject = DataHelper.getParentData();
    }

    this.props.navigation.navigate('SignUp', data);
  };

  renderAlreadySignin = () => {
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
              this.playSound();

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

  render() {
    return (
      <View style={{flex: 1}}>
        <AuthTemplate
          navigation={this.props.navigation}
          heading="CREATE PARENTS PROFILE"
          scroll
          text={
            "A profile allows parent's to keep track  of the books your child enjoy,their reading progress, and the rewards "
          }
          height={Metrics.ratio(50)}>
          {this.renderHeader()}
          {this.renderChooseAvatarHeading()}

          <View
            style={{
              width: '100%',
              marginTop: Metrics.ratio(20),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {this.renderNameField()}

            <GenderControl
              gender={this.state.gender}
              onGenderSelect={(gender) => {
                this.setState({
                  gender,
                  activeAvatar: '',
                  avatarId: '',
                  uri: '',
                  fromCamera: false,
                });
              }}
            />
          </View>

          <AvatarScroll
            avatarList={
              this.state.gender == 'male'
                ? this.props.signup.maleAvatar
                : this.props.signup.femaleAvatar
            }
            onAvatarSelected={this.chooseAvatar}
            onPickedImage={this.onImagePicked}
            isSelectedFromCamera={this.state.fromCamera}
            selectedAvatarId={this.state.avatarId}
            pickedImage={this.state.selectedImage}
          />

          {this.renderNextButton()}
          {this.renderAlreadySignin()}
        </AuthTemplate>
      </View>
    );
  }
}

export default connect(MapSateToProps, {getCategories, getTopics})(
  ChooseAvatar,
);
