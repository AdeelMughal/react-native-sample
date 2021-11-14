// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Dash from 'react-native-dash';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import ActionSheet from 'react-native-actionsheet';
import {getTopics} from '../../../actions/SignUpActions';
import {deleteChild} from '../../../actions/usersAction';
import _ from 'lodash';
import styles from './styles';
import HomeTemplate from '../../../containers/HomeTemplate';
import {
  ButtonView,
  Text,
  Inputs,
  CountryDropdown,
  Switch,
  ActivityLoader,
} from '../../../components';
import {
  GenderControl,
  AvatarScroll,
  ThemedButton,
  ThemedNextButton,
  UserAvatarTickControl,
} from '../../../controls';
import {Colors, Images, Metrics} from '../../../theme';
import {MapSateToProps} from '../../../common/MapDisptacher';
import ConfirmParentModal from '../../../controls/Modals/ConfirmParentModal';
import CustomizedPopup from '../../../controls/Modals/CustomizedPopup';
import {DataHelper} from '../../../helpers';
import {updateProfile} from '../../../actions/usersAction';

const InputWrapper = ({children, label}) => (
  <View style={styles.inputLabel}>
    <View style={{flex: 0.4}}>
      <Text style={{textAlignVertical: 'center'}} color="light">
        {label}
      </Text>
    </View>
    <View style={{flex: 0.6}}>{children}</View>
  </View>
);

const BIRTH_YEARS = [
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

class EditChildProfile extends Component {
  constructor(props) {
    super(props);

    const {
      gender,
      name,
      birthyear,
      image,
      favoritetopics,
    } = props?.route?.params;

    const avatar_id = image ? DataHelper.getAvatarId(image, 'child') : '';

    const favTopics = favoritetopics ? favoritetopics.map((e) => e.id) : [];

    this.state = {
      gender: gender,
      profileName: name || '',
      birthyear: birthyear.toString() || undefined,
      activeAvatar: image,
      selectedAvatar: '',
      camera: false,
      fromCamera: false,
      avatarId: avatar_id,
      selectedImage: undefined,
      selectedTopic: undefined,
      isRemoveModal: '',
      isDeleteSuccess: '',
      modal: '',
      favoriteTopics: favTopics,
    };
  }

  componentDidMount() {
    if (this.props.auth.topics.length == 0) {
      this.props.getTopics();
    }
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
    this.setState({
      selectedImage: imagePicked,
      activeAvatar: imagePicked,
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
      <View style={styles.sectionHeadChild}>
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

  toggleRemoveModal = (type) => this.setState({isRemoveModal: type});

  renderHeader = () => {
    const {image, name} = this.props?.route?.params;
    const {activeAvatar, fromCamera, profileName} = this.state;

    return (
      <View
        style={[
          styles.headerStyle,
          {backgroundColor: Colors.themeColors.purple},
        ]}>
        {!DataHelper.isChildLoggedIn() && (
          <TouchableOpacity
            onPress={() => this.toggleRemoveModal('affirmative')}
            style={{
              position: 'absolute',
              top: Metrics.ratio(10),
              right: Metrics.ratio(10),
              flexDirection: 'row',
            }}>
            <Text
              color="yellow"
              size="xxxxSmall"
              style={{textAlign: 'center'}}>{`DELETE\nUSER`}</Text>
            <FastImage
              source={Images.removeChild}
              style={{
                width: Metrics.ratio(30),
                height: Metrics.ratio(30),
              }}
            />
          </TouchableOpacity>
        )}
        <UserAvatarTickControl
          localImg={!activeAvatar || fromCamera}
          userImage={activeAvatar ? activeAvatar : Images.childImg}
          imageStyle={image ? styles.headerImg : styles.headerImgLocal}
          tickStyle={{
            width: Metrics.ratio(36),
            height: Metrics.ratio(36),
          }}
          showTick
        />
        <Text
          numberOfLines={2}
          size={'xLarge'}
          style={{
            color: Colors.orange,

            flex: 1,
            marginRight: Metrics.smallMargin,
          }}>
          {profileName?.toUpperCase()}
        </Text>
      </View>
    );
  };

  renderBirthPicker = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!this.state.birthyear) {
            this.ActionSheet.show();
          }
        }}
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Inputs
          changeText={(value) => this.setState({birthyear: value})}
          value={this.state.birthyear}
          maxLength={4}
          placeholder="Enter birth year"
          styles={{color: Colors.black}}
          width="100%"
          editable={false}
          disabled
        />
        <View
          style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
        />
      </TouchableOpacity>
    );
  };

  onSelectTopic = (checked, id) => {
    let favTopics = _.clone(this.state.favoriteTopics);

    if (checked > -1) {
      favTopics.splice(checked, 1);
    } else {
      favTopics.push(id);
    }

    this.setState({favoriteTopics: favTopics});
  };

  _renderItem = ({item}) => {
    const {favoriteTopics} = this.state;
    const itemId = item.topicinfo.id;

    const checked = favoriteTopics.findIndex((el) => el === itemId);

    return (
      <View style={{padding: Metrics.moderateRatio(10)}}>
        <TouchableOpacity
          onPress={() => this.onSelectTopic(checked, itemId)}
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: Metrics.moderateRatio(130),
          }}>
          <FastImage
            style={{
              width: Metrics.moderateRatio(170) * this.props.auth.size,
              height: Metrics.moderateRatio(170) * this.props.auth.size,
            }}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: item.topicinfo.image,
              priority: FastImage.priority.high,
            }}
          />
          {checked > -1 && (
            <FastImage
              style={{
                width: Metrics.ratio(40),
                height: Metrics.ratio(40),
                position: 'absolute',
              }}
              source={Images.asset13}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  onConfirmDelete = () => {
    this.toggleRemoveModal('confirm');
  };

  onConfirmParent = async () => {
    const {id} = this.props?.route?.params;

    const res = await this.props.deleteChild(id, DataHelper.getAllUsersData());
    if (res.success) {
      this.setState(
        {
          isRemoveModal: '',
          isDeleteSuccess: res.success,
        },
        () => {
          this.props.navigation.pop();
        },
      );
    }
  };

  onCloseDeletePopup = () => {
    this.setState({isDeleteSuccess: ''});
    this.props.navigation.navigate('EditProfile');
  };

  onUpdate = async () => {
    const {id, status, age} = this.props?.route?.params;
    const {
      activeAvatar,
      profileName,
      gender,
      fromCamera,
      birthyear,
      favoriteTopics,
    } = this.state;

    if (profileName == '') {
      alert('please fill name');
      return 0;
    }
    if (birthyear == '') {
      alert('please fill birthyear');
      return 0;
    }
    DataHelper.showLoader();
    let data = {
      id,
      name: profileName,
      gender,
      birthyear,
      status,
      age,
      topicid: `[${favoriteTopics}]`,
    };
    if (!fromCamera) {
      data.image = activeAvatar;
    }

    const res = await this.props.updateProfile(
      data,
      false,
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
      gender == 'male' ? 'boyAvatar' : 'girlAvatar',
    );
  };

  render() {
    const {modal, gender} = this.state;
    const {name} = this.props?.route?.params;

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
                msg2={modal}
                buttons={[['OK', true, this.toggleModal]]}
              />
            )}

            <ActivityLoader isLoading={this.props?.general?.isLoading} />

            {this.renderCustomizeButton()}
            {this.renderHeader()}

            <View style={styles.inputContainer}>
              <InputWrapper label="CHILD NAME">
                <Inputs
                  autoCorrect={false}
                  autoCapitalize={'words'}
                  width={'100%'}
                  changeText={(val) => this.setState({profileName: val})}
                  value={this.state.profileName}
                  placeholder="Enter Profile Name"
                />
              </InputWrapper>
              <InputWrapper label="BIRTH YEAR">
                {this.renderBirthPicker()}
              </InputWrapper>
            </View>

            {this.renderSectionHeading('PICK YOUR AVATAR')}

            <View style={styles.genderParent}>
              <GenderControl
                theme="light"
                gender={gender}
                genderNames={['Boy', 'Girl']}
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

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  marginLeft: Metrics.doubleBaseMargin,
                  marginTop: Metrics.smallMargin,
                }}>
                <Text color="light">FAVOURITE TOPICS</Text>
              </View>
              <FlatList
                data={this.props?.auth?.topics}
                keyExtractor={(item, index) => item.id}
                tabBarStyle={{
                  backgroundColor: '#fff',
                  borderBottomColor: '#f4f4f4',
                  borderBottomWidth: Metrics.ratio(1),
                  flex: 1,
                }}
                contentContainerStyle={{
                  paddingHorizontal: Metrics.moderateRatio(20),
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={this._renderItem}
              />
            </View>

            <View style={styles.updateBtnContainer}>
              <ThemedNextButton
                showGradient={false}
                disabled={this.props?.general?.isLoading}
                onPress={this.onUpdate}
                text="UPDATE"
                style={styles.updateBtn}
                iconStyle={styles.updateBtnIcon}></ThemedNextButton>
            </View>
          </ScrollView>
          {!!this.state.isDeleteSuccess && (
            <CustomizedPopup
              doShowModal={!!this.state.isDeleteSuccess}
              type="success"
              msg2={this.state.isDeleteSuccess}
              onClose={this.onCloseDeletePopup}
              buttons={[['OK', true, this.onCloseDeletePopup]]}
            />
          )}
          <ConfirmParentModal
            type={this.state.isRemoveModal}
            childName={name}
            onVerify={this.onConfirmParent}
            onDelete={this.onConfirmDelete}
            onClose={() => this.toggleRemoveModal('')}
            doShowModal={!!this.state.isRemoveModal}
          />
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
        </ImageBackground>
      </HomeTemplate>
    );
  }
}

const actions = {getTopics, deleteChild, updateProfile};

export default connect(MapSateToProps, actions)(EditChildProfile);
