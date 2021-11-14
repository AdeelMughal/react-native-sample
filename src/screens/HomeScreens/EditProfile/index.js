// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Dash from 'react-native-dash';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import HomeTemplate from '../../../containers/HomeTemplate';
import {
  ButtonView,
  Text,
  Inputs,
  CountryDropdown,
  Switch,
} from '../../../components';
import {
  GenderControl,
  AvatarScroll,
  ThemedButton,
  ThemedNextButton,
} from '../../../controls';
import ConfirmParentModal from '../../../controls/Modals/ConfirmParentModal';
import AddChildModal from '../../../controls/Modals/AddChildModal';
import CustomizedPopup from '../../../controls/Modals/CustomizedPopup';
import {Colors, Images, Metrics, Sounds, Fonts} from '../../../theme';
import {fetchAllUsers} from '../../../actions/usersAction';
import {setSound} from '../../../actions/generalActions';
import SettingCarousel from './Carousel';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {DataHelper, SoundHelper} from '../../../helpers';
import _ from 'lodash';

class Setting extends Component {
  constructor(props) {
    super(props);

    const {auth} = props;

    this.state = {
      parentData: null,
      showConfirmModal: auth.showConfirmParentModal,
    };
  }

  componentDidMount() {
    if (!DataHelper.getAllUsersArray()?.length) {
      this.props.fetchAllUsers();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      !_.isEqual(
        this.props.auth.showConfirmParentModal,
        nextProps.auth.showConfirmParentModal,
      )
    ) {
      this.state.showConfirmModal = nextProps.auth.showConfirmParentModal;
    }

    if (nextProps.general.appSound !== this.props.general.appSound) {
      if (nextProps.general.appSound) {
        SoundHelper.playBackgroundSound(Sounds.background);
      } else {
        SoundHelper.stopBackgroundSound();
      }
    }
  }

  renderCustomizeButton = () => {
    return (
      <ButtonView style={styles.custBtn}>
        <Text>SETTINGS</Text>
      </ButtonView>
    );
  };

  renderSectionHeading = () => {
    return (
      <View style={styles.sectionHead}>
        <Dash
          dashColor={'white'}
          dashGap={Metrics.ratio(5)}
          dashThickness={Metrics.ratio(1)}
          dashLength={Metrics.ratio(4)}
          style={{flex: 1, marginHorizontal: Metrics.smallMargin}}></Dash>
      </View>
    );
  };

  toggleSound = (val) => {
    let _sound = this.props.general?.appSound;

    this.props.setSound(!_sound);
  };

  renderSection = (head, subHead, type, btnText = 'VIEW', onPress) => {
    let _sound = this.props.general?.appSound;

    return (
      <View style={{marginHorizontal: Metrics.doubleBaseMargin}}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.head}>{head}</Text>
          <View style={{flex: 0.3}}>
            {type === 'switch' ? (
              <Switch value={!!_sound} toggleSwitch={this.toggleSound} />
            ) : (
              <View style={{alignItems: 'flex-end'}}>
                <ThemedNextButton
                  showGradient={false}
                  style={styles.miniBtn}
                  iconStyle={styles.miniBtnIcon}
                  textStyle={styles.miniBtnText}
                  text={btnText}
                  onPress={onPress}
                />
              </View>
            )}
          </View>
        </View>
        {subHead ? <Text style={styles.subHead}>{subHead}</Text> : null}
      </View>
    );
  };

  renderLinks = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={styles.head}>CONNECT TO US</Text>
        <View
          style={[
            styles.rowMargin,
            {width: '80%', marginVertical: Metrics.ratio(10)},
          ]}>
          <FastImage source={Images.facebook} style={styles.socialIcon} />
          <FastImage source={Images.insta} style={styles.socialIcon} />
          <FastImage source={Images.youtube} style={styles.socialIcon} />
          <FastImage source={Images.email} style={styles.socialIcon} />
          <FastImage source={Images.web} style={styles.socialIcon} />
        </View>
      </View>
    );
  };

  renderInfo = () => {
    return (
      <View style={styles.rowMargin}>
        <View
          style={{
            width: '30%',
          }}>
          <ThemedNextButton
            text={'RATE APP'}
            showGradient={false}
            style={styles.miniBtn}
            iconStyle={styles.miniBtnIcon}
            textStyle={styles.miniBtnTextRate}
          />
        </View>
        <ButtonView
          onPress={() => {
            Linking.openURL('http://adinstudios.net');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '58%',
            marginBottom: Metrics.ratio(15),
          }}>
          <View>
            <Text style={styles.infoText}>
              {`KIDZLIM ID: 329.344.267\nVersion 1, 1.5\nDesigned & Developed by`}
            </Text>
            <Text style={[styles.infoText, {fontFamily: Fonts.type.bold}]}>
              ADINSTUDIOS.NET
            </Text>
          </View>

          <FastImage source={Images.asset47} style={styles.infoIcon} />
        </ButtonView>
      </View>
    );
  };

  toggleChildModal = () => this.setState({modal: !this.state.modal});

  onEdit = (isParent, userObj, index) => {
    const addMore = userObj.addMore;

    if (!this.props.auth.sneakpeak) {
      if (isParent && addMore) {
        this.toggleChildModal();
      } else if (isParent) {
        this.setState({parentData: userObj}, () => {
          this.props.navigation.navigate(
            'EditParentProfile',
            this.state.parentData,
          );
        });
      } else {
        this.props.navigation.navigate('EditChildProfile', userObj);
      }
    }
  };

  _navigate = (route) => {
    this.props.navigation.navigate(route);
  };

  renderAddChildModal = () => {
    const {route, auth, navigation} = this.props;

    return (
      <AddChildModal
        doShowModal={this.state.modal}
        data={auth?.user}
        authObject={this.props.auth}
        navigation={navigation}
        onClose={() => this.toggleChildModal()}
        isSetting
      />
    );
  };

  renderConfirmParentModal = () => {
    const isFocused = this.props.navigation.isFocused();
    const {showConfirmModal} = this.state;

    const showConfirm =
      (showConfirmModal || DataHelper.isChildLoggedIn()) && isFocused;

    if (showConfirm) {
      return (
        <ConfirmParentModal
          onClose={() => {
            DataHelper.setShowConfirmParentModal(false);
            this.props.navigation.navigate('Category');

            setTimeout(() => {
              DataHelper.setShowConfirmParentModal(true);
            }, 2000);
          }}
          doShowModal={showConfirmModal}
          onVerify={() => {
            DataHelper.setShowConfirmParentModal(false);
          }}
        />
      );
    }

    return null;
  };

  render() {
    const {auth} = this.props;

    let userData;

    let systemUsers = DataHelper.getAllUsersArray();

    if (systemUsers && systemUsers.length > 0) {
      userData = [...systemUsers];

      if (userData.length < 4) {
        userData.push({
          name: 'ADD CHILD',
          img: Images.chooseChild,
          addMore: true,
        });
      }
    }

    return (
      <HomeTemplate renderUser={true} style={styles.container}>
        <ImageBackground
          style={{width: '100%', flex: 1}}
          source={Images.asset124}>
          <ScrollView style={{flex: 1}}>
            {this.renderAddChildModal()}

            {this.renderCustomizeButton()}

            <View
              style={{
                marginHorizontal: Metrics.doubleBaseMargin,
              }}>
              <SettingCarousel
                allUsersData={userData}
                onClickItem={this.onEdit}
                currentUser={auth?.user}
              />
            </View>

            {this.renderSection('APP SOUNDS', null, 'switch')}

            {this.renderSectionHeading()}

            {this.renderSection(
              'PRIVACY POLICY AND TERMS OF SERVICES',
              'Learn about our terms of service and how we handle privacy',
              null,
              undefined,
              () => this._navigate('PrivacyPolicy'),
            )}
            {this.renderSectionHeading()}

            {this.renderSection(
              'HELP AND FEEDBACK',
              'Need some help? View our FAQs for answers to common questions or feel free to contact support. We are always happy to help',
              null,
              undefined,
              () => this._navigate('Feedback'),
            )}

            {this.renderSectionHeading()}
            {this.renderSection('NOTIFICATIONS', null, null, undefined, () =>
              this._navigate('Notifications'),
            )}
            {this.renderSectionHeading()}

            {this.renderLinks()}
            {this.renderInfo()}
          </ScrollView>
          {this.renderConfirmParentModal()}
        </ImageBackground>
      </HomeTemplate>
    );
  }
}

const actions = {fetchAllUsers, setSound};

export default connect(MapSateToProps, actions)(Setting);
