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
import ActionSheet from 'react-native-actionsheet';
import {Blue, Yellow, TextInputColor} from '../../common/Theme';
import LinearGradient from 'react-native-linear-gradient';
import AuthTemplate from '../../containers/AuthTemplate';
import Inputs from '../../components/Inputs';
import {Text, ImagePicker, ButtonView} from '../../components';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import fonts from '../../common/fonts';

import {registerChild} from '../../actions/AuthActions';
import {DataHelper} from '../../helpers';

import DeviceInfo from 'react-native-device-info';
import {Images, Metrics, Colors} from '../../theme';
import {
  ThemedNextButton,
  ThemedYellowButton,
  AvatarScroll,
  GenderControl,
} from '../../controls';

// import { Camera } from "expo-camera";
let isTablet = DeviceInfo.isTablet();
let BIRTH_YEARS = [
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
];

class CreateFirstChild extends Component {
  state = {
    gender: 'male',
    avatars: [
      '../../../assets/Images/Male74.png',
      '../../../assets/Images/Male75.png',
      '../../../assets/Images/Male76.png',
      '../../../assets/Images/Male77.png',
      '../../../assets/Images/Male78.png',
      '../../../assets/Images/Male81.png',
    ],
    activeAvatar: '',
    modal: true,
    camera: false,
    fromCamera: false,
    profileName: '',
    avatarId: '',
  };

  childsDetail = () => {
    const {
      activeAvatar,
      profileName,
      birthyear,
      gender,
      fromCamera,
    } = this.state;

    const {isSetting} = this.props?.route?.params;
    const allUsersData = DataHelper.getAllUsersData();
    const user = DataHelper.getUserObject();

    if (activeAvatar == '' && profileName == '') {
      alert("Please select your child's avatar and name");
      return 0;
    }
    if (!activeAvatar || activeAvatar == '') {
      alert("Please select your child's avatar");
      return 0;
    }
    if (!profileName || profileName == '') {
      alert("Please enter your child's name");
      return 0;
    }
    if (!birthyear || birthyear == '') {
      alert("Please enter your child's birthyear");
      return 0;
    }

    var d = new Date();
    var n = d.getFullYear();

    var ageValue = n - parseInt(birthyear);
    const final = {
      name: profileName,
      gender: gender,
      image: activeAvatar,
      fromCamera,
      birthyear: parseInt(birthyear),
      age: ageValue,
      parentid: user?.id,
    };
    this.props.registerChild(
      final,
      (customerid) => {
        this.props.navigation.navigate('TopicSelection', {
          isSetting,
          customerid,
        });
      },
      allUsersData,
    );
  };

  chooseAvatar = (selectedAvatar) => {
    const {image, id, selected} = selectedAvatar;
    this.setState({
      selectedImage: undefined,
      activeAvatar: selected,
      fromCamera: false,
      avatarId: id,
    });
  };

  onImagePicked = (imagePicked) => {
    this.setState({
      selectedImage: imagePicked,
      activeAvatar: imagePicked,
      fromCamera: true,
      avatarId: undefined,
    });
  };

  _showImagePicker = () => {
    this.ActionSheet.show();
  };

  renderTopMessage = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingTop: Metrics.baseMargin,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: Blue,
            textAlign: 'center',
            lineHeight: Metrics.ratio(17),
          }}>
          Child profile allows a reader to keep{'\n'} track of the books they
          enjoy, their {'\n'} reading progress, and the rewards{'\n'}they've
          earned
        </Text>
      </View>
    );
  };

  renderSelectAvatarHeading = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: Metrics.smallMargin,
        }}>
        <Text
          style={{
            color: Colors.Yellow,
            textAlign: 'center',
            // fontWeight: "bold",
            fontSize: 20 * this.props.auth.size,
          }}>
          CHOOSE AVATAR
        </Text>
      </View>
    );
  };

  renderNextButton = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          // marginTop: Metrics.smallMargin,
          zIndex: 0,
        }}>
        <ThemedNextButton
          text="NEXT"
          style={{width: '70%', marginHorizontal: Metrics.baseMargin}}
          // onPress={() => this.childsDetail()}
          onPress={() => this.props.navigation.navigate('TopicSelection')}
        />
      </View>
    );
  };

  render() {
    const {auth} = this.props;
    const {boyAvatar, girlAvatar} = auth;

    const childArray = auth?.allUsersData.child;

    let childNumber;

    if (!childArray || childArray.length === 0) {
      childNumber = 'FIRST';
    } else if (childArray.length < 2) {
      childNumber = 'SECOND';
    } else {
      childNumber = 'THIRD';
    }

    return (
      <AuthTemplate
        navigation={this.props.navigation}
        heading={`CREATE YOUR ${childNumber} READER`}
        height={Metrics.ratio(50)}
        scroll>
        {this.renderTopMessage()}

        <View
          style={{
            flex: 1,
            marginHorizontal: Metrics.baseMargin,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: Metrics.smallMargin,
          }}>
          <Inputs
            autoCorrect={false}
            autoCapitalize={'words'}
            changeText={(val) => this.setState({profileName: val})}
            value={this.state.profileName}
            placeholder="Enter child name"
          />
        </View>
        <TouchableOpacity
          onPress={this._showImagePicker}
          style={{
            flex: 1,
            marginHorizontal: Metrics.baseMargin,
            alignItems: 'center',
            justifyContent: 'center',
            // marginVertical: Metrics.smallMargin,
          }}>
          <Inputs
            changeText={(value) => this.setState({birthyear: value})}
            value={this.state.birthyear}
            maxLength={4}
            placeholder="Enter birth year"
            editable={false}
            disabled
          />
          <View
            style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
          />
        </TouchableOpacity>
        {this.renderSelectAvatarHeading()}
        <View
          style={{
            width: '100%',
            flexDirection:
              this.props.auth.orientation == 'mobile' ? 'column' : 'row',
            // marginTop: Metrics.ratio(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <GenderControl
            gender={this.state.gender}
            genderNames={['Boy', 'Girl']}
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
          avatarList={this.state.gender == 'male' ? boyAvatar : girlAvatar}
          onAvatarSelected={this.chooseAvatar}
          onPickedImage={this.onImagePicked}
          isSelectedFromCamera={this.state.fromCamera}
          selectedAvatarId={this.state.avatarId}
          pickedImage={this.state.selectedImage}
        />

        {this.renderNextButton()}

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            // marginTop: Metrics.smallMargin,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: '70%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: Metrics.smallMargin,
              marginBottom: Metrics.baseMargin,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '60%',
                paddingTop: Metrics.ratio(20),
              }}>
              <Text
                numberOfLines={2}
                size={'xxxxxSmall'}
                style={{
                  fontWeight: 'bold',
                  color: Colors.Blue,
                  textAlign: 'left',
                  lineHeight: Metrics.ratio(12),
                }}>
                Create additional profiles at anytime later on!
              </Text>
            </View>
            <View
              style={{
                width: '40%',
                alignItems: 'center',
                marginTop: Metrics.ratio(10),
                flex: 1,
              }}>
              <ThemedNextButton
                style={{
                  width: '100%',
                  height: Metrics.ratio(30),
                  marginHorizontal: Metrics.baseMargin,
                }}
                text={'SKIP'}
                iconStyle={{
                  width: Metrics.ratio(25),
                  height: Metrics.ratio(25),
                }}
                textStyle={{fontSize: 13}}
                onPress={() => this.props.navigation.navigate('Package')}
              />
            </View>
          </View>
        </View>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={'Select Birth Year'}
          options={[...BIRTH_YEARS, 'Cancel']}
          cancelButtonIndex={12}
          // destructiveButtonIndex={1}
          onPress={(selectedIndex) => {
            if (selectedIndex < BIRTH_YEARS.length) {
              this.setState({birthyear: BIRTH_YEARS[selectedIndex]});
            }
          }}
        />
      </AuthTemplate>
    );
  }
}

export default connect(MapSateToProps, {registerChild})(CreateFirstChild);
