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
  FlatList,
} from 'react-native';
import {Blue, Yellow, TextInputColor} from '../../common/Theme';
import LinearGradient from 'react-native-linear-gradient';
import AuthTemplate from '../../containers/AuthTemplate';
import {Inputs, Text} from '../../components';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
// import { getTopics} from "../../actions/AuthActions";
import {addTopics, getTopics} from '../../actions/SignUpActions';
import fonts from '../../common/fonts';
import FastImage from 'react-native-fast-image';

import {Images, Metrics, Colors} from '../../theme';
import {ThemedNextButton} from '../../controls';
import CustomizedPopup from '../../controls/Modals/CustomizedPopup';
import DeviceInfo from 'react-native-device-info';

let isTablet = DeviceInfo.isTablet();

class TopicSelection extends Component {
  state = {
    gender: 1,
    activeAvatar: '',
    modal: false,
    topics: [],
  };

  chooseAvatar = (id) => {
    let check = this.state.topics.filter((item) => item == id);
    let data = [];

    if (check.length > 0) {
      this.state.topics.map((item) => {
        if (item !== check[0]) {
          data.push(item);
        }
      });

      this.setState({topics: data}, () => {});

      return 0;
    }

    this.setState(
      {
        topics: [...this.state.topics, id],
      },
      () => {},
    );
  };

  toggleModal = (isRoute = true) => {
    this.onCloseModal();
    if (isRoute) {
      this.props.navigation.navigate('confirmVerification', {
        showAddModal: true,
      });
    }
  };

  onCloseModal = () => {
    const {isSetting} = this.props?.route?.params;
    this.setState({childAddModal: ''});
    if (isSetting) {
      this.props.navigation.navigate('EditProfile');
    }
  };

  addTopicsAPI = async () => {
    const {customerid} = this.props?.route?.params;

    const result = await this.props.addTopics(
      this.state.topics,
      customerid,
      this.props.navigation,
    );

    if (result.reason) {
      this.setState({childAddModal: result.reason});
    }
  };

  removeModal = () => {
    this.setState({modal: false});
  };

  componentDidMount() {
    if (this.props.auth.topics.length == 0) {
      this.props.getTopics();
    }
  }

  _renderItem = ({item}) => {
    return (
      <View style={{padding: Metrics.ratio(10)}}>
        <TouchableOpacity
          onPress={() => {
            this.chooseAvatar(item.topicinfo.id);
          }}
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: Metrics.ratio(130),
          }}>
          <FastImage
            style={{
              width: Metrics.ratio(170) * this.props.auth.size,
              height: Metrics.ratio(170) * this.props.auth.size,
            }}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: item.topicinfo.image,
              priority: FastImage.priority.high,
            }}
          />
          {this.state.topics
            .filter((data) => data == item.topicinfo.id)
            .map((check, i) => (
              <FastImage
                key={i}
                style={{
                  width: Metrics.ratio(40),
                  height: Metrics.ratio(40),
                  position: 'absolute',
                }}
                source={Images.asset13}
              />
            ))}
        </TouchableOpacity>
      </View>
    );
  };

  renderNextButton = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: Metrics.smallMargin,
          zIndex: 0,
        }}>
        <ThemedNextButton
          text="NEXT"
          style={{width: '70%', marginHorizontal: Metrics.baseMargin}}
          onPress={this.addTopicsAPI}
        />
      </View>
    );
  };

  render() {
    const {auth} = this.props;

    const childArray = auth?.allUsersData.child;

    let childNumber;

    childNumber = 'FIRST';

    // if (childArray?.length === 1) {
    //   childNumber = 'FIRST';
    // } else if (childArray.length === 2) {
    //   childNumber = 'SECOND';
    // } else {
    //   childNumber = 'THIRD';
    // }

    return (
      <AuthTemplate
        navigation={this.props.navigation}
        heading={`${childNumber} READER INTEREST`}
        scroll
        height={50}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingTop: Metrics.ratio(20),
          }}>
          <Text
            style={{
              fontFamily: fonts.CARTERONE,
              fontSize: 17,
              fontWeight: 'bold',
              color: Blue,
              textAlign: 'center',
              lineHeight: Metrics.ratio(23),
            }}>
            This helps us to create books{'\n'} you'll like. Pick at least one!
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            marginBottom: Metrics.ratio(10) * this.props.auth.size,
            // justifyContent: "center",
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <FlatList
              data={this.props.auth.topics}
              keyExtractor={(item, index) => index}
              tabBarStyle={{
                backgroundColor: '#fff',
                borderBottomColor: '#f4f4f4',
                borderBottomWidth: Metrics.ratio(1),
                flex: 1,
              }}
              numColumns={2}
              renderItem={this._renderItem}
            />
          </View>
        </View>
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
                width: '40%',
                alignItems: 'center',
                marginTop: Metrics.ratio(10),
                flex: 1,
              }}>
              {!!this.state.childAddModal && (
                <CustomizedPopup
                  onClose={this.onCloseModal}
                  type="success"
                  doShowModal={!!this.state.childAddModal}
                  msg2={this.state.childAddModal}
                  buttons={[['OK', true, this.toggleModal]]}
                />
              )}
            </View>
          </View>
        </View>
      </AuthTemplate>
    );
  }
}

export default connect(MapSateToProps, {getTopics, addTopics})(TopicSelection);
