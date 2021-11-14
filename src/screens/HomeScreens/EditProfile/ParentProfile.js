// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Dash from 'react-native-dash';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import HomeTemplate from '../../../containers/HomeTemplate';
import {
  ButtonView,
  Text,
  Inputs,
  CountryDropdown,
  ActivityLoader,
  Switch,
} from '../../../components';
import {
  GenderControl,
  AvatarScroll,
  ThemedButton,
  ThemedNextButton,
  UserAvatarTickControl,
  PackageCell,
} from '../../../controls';
import {Colors, Images, Metrics} from '../../../theme';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {updateProfile} from '../../../actions/usersAction';
import {DataHelper, IAPHelper} from '../../../helpers';
import CustomizedPopup from '../../../controls/Modals/CustomizedPopup';

const InputWrapper = ({children, label}) => (
  <View style={styles.inputLabel}>
    <View style={{flex: 0.3}}>
      <Text style={{textAlignVertical: 'center'}} color="light">
        {label}
      </Text>
    </View>
    <View style={{flex: 0.7}}>{children}</View>
  </View>
);

const purchasePackages = IAPHelper.getProductsItems();

class EditParentProfile extends Component {
  constructor(props) {
    super(props);

    const {
      gender,
      name,
      email,
      country,
      countrycode,
      image,
    } = props?.route?.params;

    const avatar_id = image ? DataHelper.getAvatarId(image, 'parent') : '';

    this.state = {
      gender: gender,
      profileName: name || '',
      email: email || '',
      country: country || '',
      countrycode: countrycode,
      countryid: undefined,
      activeAvatar: image,
      selectedAvatar: '',
      camera: false,
      fromCamera: false,
      avatarId: avatar_id,
      selectedImage: undefined,
      editPassword: false,
      modal: '',
      selectedPackageIndex: 0,
    };
  }

  chooseAvatar = (selectedAvatar) => {
    const {image, id, selected} = selectedAvatar;

    this.setState({
      activeAvatar: selected,
      fromCamera: false,
      selectedImage: undefined,
      avatarId: id,
    });
  };

  onImagePicked = (imagePicked) => {
    let clonedImg = _.clone(imagePicked);
    this.setState({
      selectedImage: imagePicked,
      activeAvatar: clonedImg,
      fromCamera: true,
      avatarId: undefined,
    });
  };

  renderCustomizeButton = () => {
    return (
      <ButtonView style={styles.custBtn}>
        <Text>CUSTOMIZE YOUR PROFILE</Text>
      </ButtonView>
    );
  };

  renderSectionHeading = (headingText) => {
    return (
      <View style={styles.sectionHead}>
        {headingText && (
          <Text style={{textAlignVertical: 'center'}} color="light">
            PICK YOUR AVATAR
          </Text>
        )}

        <Dash
          dashColor={'white'}
          dashGap={Metrics.ratio(5)}
          dashThickness={Metrics.ratio(1)}
          dashLength={Metrics.ratio(4)}
          style={{flex: 1, marginHorizontal: Metrics.smallMargin}}></Dash>
      </View>
    );
  };

  renderHeader = () => {
    const {profileName, activeAvatar, fromCamera} = this.state;
    return (
      <View style={styles.headerStyle}>
        <UserAvatarTickControl
          localImg={!activeAvatar || fromCamera}
          userImage={activeAvatar ? activeAvatar : Images.male70}
          imageStyle={styles.headerImg}
          showTick
          tickStyle={styles.tickSize}
        />
        <Text
          size={'xLarge'}
          numberOfLines={3}
          style={{
            flex: 1,
            color: Colors.orange,
            textAlign: 'center',
            marginRight: Metrics.smallMargin,
          }}>
          {profileName?.toUpperCase()}
        </Text>
      </View>
    );
  };

  renderSwitch = (head, subHead) => {
    return (
      <View style={styles.marginHorizontal}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.head}>{head}</Text>
          {subHead && (
            <View style={{flex: 0.29}}>
              <Switch />
            </View>
          )}
        </View>
        {subHead && <Text style={styles.subHead}>{subHead}</Text>}
      </View>
    );
  };

  renderBillingBtn = (title, subTitle, isGradient) => (
    <TouchableOpacity style={{alignItems: 'center'}}>
      <LinearGradient
        colors={isGradient ? Colors.yellowGradient : Colors.greyGradient}
        style={[
          isGradient ? {borderColor: '#FECE00', borderWidth: 2} : {},
          styles.gradBtn,
        ]}>
        <Text style={styles.btnTitle}>{title}</Text>
        <Text style={styles.btnSubTitle}>{subTitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  renderBillingSection = () => {
    const {auth} = this.props;

    return (
      <View style={styles.blngSection}>
        <View style={styles.blngSubSection}>
          {purchasePackages.map((item, index) => {
            return (
              <PackageCell
                isSelected={auth.parent?.subscription === item.packageId}
                item={item}
                index={index}
                onPress={(selectedPackage) => {
                  // this.setState({selectedPackageIndex: index});
                  // IAPHelper.requestSubscription(selectedPackage.packageId);
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  onUpdate = async () => {
    const {id, status} = this.props?.route?.params;
    const {
      activeAvatar,
      profileName,
      gender,
      countrycode,
      email,
      password,
      fromCamera,
    } = this.state;

    if (profileName == '') {
      alert('please fill name');
      return 0;
    }
    if (email == '') {
      alert('please fill email');
      return 0;
    }
    if (password == '') {
      alert('please fill your password');
      return 0;
    }
    if (countrycode == '') {
      alert('please select your country');
      return 0;
    }
    DataHelper.showLoader();
    let data = {
      id,
      name: profileName,
      gender,
      countrycode,
      status,
      email,
    };

    if (password) {
      data.password = password;
    }

    if (!fromCamera) {
      data.image = activeAvatar;
    }

    const res = await this.props.updateProfile(
      data,
      true,
      fromCamera ? activeAvatar : null,
    );

    if (res.status) {
      this.setState({modal: res.reason});
    }
    DataHelper.hideLoader();
  };

  toggleModal = () => this.setState({modal: ''});

  getAvatarList = () => {
    const {image} = this.props?.route?.params;
    const {gender} = this.state;
    return DataHelper.avatarsWithUserImage(
      DataHelper.isCustomImg(image) ? image : null,
      gender == 'male' ? 'fatherAvatar' : 'motherAvatar',
    );
  };

  render() {
    const {editPassword, modal, gender} = this.state;
    return (
      <HomeTemplate
        renderUser={true}
        style={styles.container}
        back
        navigation={this.props.navigation}>
        <ImageBackground
          style={{width: '100%', flex: 1}}
          source={Images.asset124}>
          <ScrollView style={{flex: 1}}>
            {!!modal && (
              <CustomizedPopup
                onClose={this.toggleModal}
                doShowModal={!!modal}
                type="success"
                msg2={modal}
                buttons={[['OK', true, this.toggleModal]]}
              />
            )}

            <ActivityLoader isLoading={this.props?.general?.isLoading} />

            {this.renderCustomizeButton()}
            {this.renderHeader()}

            <View style={styles.inputContainer}>
              <InputWrapper label="NAME">
                <Inputs
                  autoCorrect={false}
                  autoCapitalize={'words'}
                  width={'100%'}
                  changeText={(val) => this.setState({profileName: val})}
                  value={this.state.profileName}
                  placeholder="Enter Profile Name"
                />
              </InputWrapper>
              <InputWrapper label="EMAIL ID">
                <Inputs
                  autoCorrect={false}
                  keyboardType={'email-address'}
                  value={this.state.email}
                  width={'100%'}
                  changeText={(val) => this.setState({email: val})}
                  placeholder="Enter email address"
                />
              </InputWrapper>
              <InputWrapper label="COUNTRY">
                <CountryDropdown
                  countryName={this.state.country}
                  onSelectCountry={(selectedCountry) => {
                    this.setState({
                      countrycode: selectedCountry.cca2,
                      country: selectedCountry.name,
                    });
                  }}
                />
              </InputWrapper>

              <InputWrapper label="PASSWORD">
                {editPassword ? (
                  <Inputs
                    width={'100%'}
                    value={this.state.password}
                    secure={true}
                    changeText={(val) => this.setState({password: val})}
                    placeholder="Enter password"
                  />
                ) : (
                  <View style={{alignItems: 'flex-end'}}>
                    <ThemedNextButton
                      showGradient={false}
                      text="EDIT"
                      style={[
                        styles.miniBtn,
                        {width: Metrics.moderateRatio(85)},
                      ]}
                      iconStyle={styles.miniBtnIcon}
                      textStyle={styles.miniBtnText}
                      onPress={() => {
                        this.setState({editPassword: true});
                      }}
                    />
                  </View>
                )}
              </InputWrapper>
            </View>

            {this.renderSectionHeading('PICK YOUR AVATAR')}

            <View style={styles.genderParent}>
              <GenderControl
                theme="light"
                gender={gender}
                onGenderSelect={(gender) => this.setState({gender})}
              />
            </View>
            <AvatarScroll
              avatarList={this.getAvatarList()}
              onAvatarSelected={this.chooseAvatar}
              onPickedImage={this.onImagePicked}
              isSelectedFromCamera={this.state.fromCamera}
              selectedAvatarId={this.state.avatarId}
              pickedImage={this.state.selectedImage}
              containerStyle={{backgroundColor: 'transparent'}}
            />

            {this.renderSectionHeading()}
            {false &&
              this.renderSwitch(
                'IN - APP & PUSH NOTIFICATION',
                "Keep track of your child's reading and quiz progress",
              )}

            {this.renderSectionHeading()}
            {this.renderSwitch('SUBSCRIPTION PLAN', undefined)}

            {this.renderBillingSection()}

            <View style={styles.updateBtnContainer}>
              <ThemedNextButton
                disabled={this.props?.general?.isLoading}
                showGradient={false}
                text="UPDATE"
                style={styles.updateBtn}
                onPress={this.onUpdate}
                iconStyle={styles.updateBtnIcon}></ThemedNextButton>
            </View>
          </ScrollView>
        </ImageBackground>
      </HomeTemplate>
    );
  }
}

const actions = {updateProfile};

export default connect(MapSateToProps, actions)(EditParentProfile);
