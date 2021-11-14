import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import AuthTemplate from '../../containers/AuthTemplate';
import {Yellow, Blue} from '../../common/Theme';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import fonts from '../../common/fonts';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import {Images, Metrics, Sounds} from '../../theme';
import {
  ThemedNextButton,
  AddChildModal,
  UserAvatarTickControl,
} from '../../controls';
import {Text} from '../../components';
import {DataHelper, SoundHelper} from '../../helpers';
import {setSignupCompleted} from '../../actions/AuthActions';

let isTablet = DeviceInfo.isTablet();
class ConfirmVerification extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    let dataObject;

    if (props.route?.params) {
      dataObject = props.route.params;
    } else if (DataHelper.isUserAuthenticated()) {
      dataObject = {
        name: DataHelper.getUserObject().name,
        image: DataHelper.getUserObject().image,
      };
    }

    this.state = {
      modal: false,
      dataObject,
    };
  }

  componentDidMount() {
    SoundHelper.playSound(Sounds.emailVerify);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.route.params, nextProps.route.params)) {
      this.state.modal = nextProps.route.params?.showAddModal;
    } else if (nextProps.route.params?.showAddModal) {
      this.setState({modal: true});
      nextProps.navigation.setParams({showAddModal: false});
    }

    if (!_.isEqual(nextProps.auth.user, this.props.auth.user)) {
      this.state.dataObject = {
        name: nextProps.auth.user?.name,
        image: nextProps.auth.user?.image,
      };
    }
  }

  renderAddChildModal = () => {
    const {route, auth, navigation} = this.props;

    return (
      <AddChildModal
        doShowModal={this.state.modal}
        data={this.state.dataObject}
        authObject={auth}
        navigation={navigation}
        onSkip={() => {
          this.props.setSignupCompleted();
        }}
        onClose={() => {
          this.setState({modal: false});
        }}
      />
    );
  };

  renderGreenTick = () => {
    return (
      <Image
        style={{
          width: Metrics.ratio(40),
          height: Metrics.ratio(40),
          position: 'absolute',
          bottom: Metrics.ratio(0),
        }}
        source={Images.asset13}
      />
    );
  };

  renderNextButton = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: Metrics.ratio(65),
          zIndex: 0,
        }}>
        <ThemedNextButton
          text="NEXT"
          style={{width: '70%', marginHorizontal: Metrics.baseMargin}}
          onPress={() => {
            SoundHelper.playSound(Sounds.onEveryTap);
            // this.setState({modal: true});
            this.props.navigation.navigate('Package');
          }}
        />
      </View>
    );
  };

  render() {
    const {name, image} = this.state.dataObject;

    return (
      <AuthTemplate
        navigation={this.props.navigation}
        mash
        noBack
        heading="ACCOUNT VERIFIED">
        {this.renderAddChildModal()}

        <View style={{width: '100%', marginTop: Metrics.ratio(90)}}>
          <View
            style={{
              width: '100%',
              backgroundColor: Yellow,
              alignItems: 'center',
              paddingVertical: Metrics.ratio(20),
            }}>
            {image && (
              <UserAvatarTickControl
                userImage={DataHelper.getProfileImage(image)}
                style={{
                  width: Metrics.screenWidth * 0.42,
                  height: Metrics.screenWidth * 0.42,
                }}
                showTick
              />
            )}

            <Text
              numberOfLines={2}
              style={{
                fontSize: isTablet ? Metrics.ratio(30) : Metrics.ratio(28),
                // fontWeight: "700",
                color: Blue,
                textAlign: 'center',
                marginVertical: Metrics.ratio(7),
                marginHorizontal: Metrics.baseMargin,
                top: Metrics.ratio(-15),
              }}>
              {name.toUpperCase()}
            </Text>
            <Text
              style={{
                fontSize: 22 * this.props.auth.size,
                // fontWeight: "700",
                marginTop: Metrics.ratio(-30),
                color: 'white',
                textAlign: 'center',
              }}>
              ALHAMDULLILAH
            </Text>
            <Text
              style={{
                fontSize: 18 * this.props.auth.size,
                color: 'white',
                textAlign: 'center',
                marginTop: Metrics.ratio(-8),
              }}>
              Your Account has been verified
            </Text>
            <Text
              style={{
                fontSize: 13 * this.props.auth.size,
                color: 'white',
                textAlign: 'center',
                marginTop: Metrics.ratio(-5),
                // fontWeight: "bold",
              }}>
              SUCCESSFULLY!
            </Text>
          </View>
        </View>

        {this.renderNextButton()}
      </AuthTemplate>
    );
  }
}

export default connect(MapSateToProps, {setSignupCompleted})(
  ConfirmVerification,
);
