import React, {Component} from 'react';
import {
  Text,
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
import {Blue, Yellow} from '../../common/Theme';
import LinearGradient from 'react-native-linear-gradient';
import HomeTemplate from '../../containers/HomeTemplate';
import Inputs from '../../components/Inputs';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';

import {getTopics} from '../../actions/SignUpActions';
import fonts from '../../common/fonts';
import FastImage from 'react-native-fast-image';

import {Images, Metrics} from '../../theme';

// import { Camera } from "expo-camera";

class ChooseChild extends Component {
  state = {
    gender: 1,
    avatars: [
      '../../../assets/Images/Male74.png',
      '../../../assets/Images/Male75.png',
    ],
    activeAvatar: '',
    profileName: '',
    camera: false,
    fromCamera: false,
    avatarId: '',
  };

  Camera = () => {
    this.setState({camera: true});
  };

  SnapImage = async () => {
    let photo = await this.camera.takePictureAsync();
    this.setState({
      activeAvatar: photo.uri,
      camera: false,
      fromCamera: true,
      avatarId: '',
    });
  };

  chooseAvatar = (image, id) => {
    this.setState({
      activeAvatar: image,
      fromCamera: false,
      avatarId: id,
    });
  };

  async componentDidMount() {
    const {status} = await Camera.requestPermissionsAsync();

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
  }

  render() {
    return (
      <HomeTemplate
        renderUser={true}
        // navigation={this.props.navigation}
        heading="CREATE PARENTS PROFILE"
        text={
          "A Profile allows parent's to keep track\n of the books your child enjoy, their \n reading progress, and the rewards\n they've earned."
        }>
        <View>
          <Modal
            animationType="slide"
            animated
            visible={this.state.camera}
            onRequestClose={() => this.setState({camera: false})}>
            <View
              style={{
                width: '100%',
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.3)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{width: '90%'}}>
                <TouchableOpacity
                  onPress={() => this.setState({camera: false})}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontFamily: fonts.CARTERONE,
                    }}>
                    Back
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <Camera
              ratio="1:1"
              ref={(ref) => {
                this.camera = ref;
              }}
              style={{ width: "100%", height: "60%", marginTop: 10 }}
              type={Camera.Constants.Type.front}
            ></Camera> */}
              <View
                style={{
                  width: '100%',
                  height: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => this.SnapImage()}
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 100,
                    backgroundColor: Blue,
                    borderStyle: 'solid',
                    borderColor: 'white',
                    borderWidth: 5,
                  }}></TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: this.props.auth.orientation == 'mobile' ? 30 : 70,
            }}>
            <Text
              style={{
                fontSize: 20 * this.props.auth.size,
                fontWeight: '700',
                color: Blue,
                textAlign: 'center',
                marginTop: 20,
              }}>
              {/* {name.toUpperCase()} */}
            </Text>

            <Text
              style={{
                color: Yellow,
                textAlign: 'center',
                fontSize: 18 * this.props.auth.size,
                fontFamily: fonts.CARTERONE,
              }}>
              CHOOSE YOUR AVATAR
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection:
                this.props.auth.orientation == 'mobile' ? 'column' : 'row',
              marginTop: this.props.auth.orientation == 'mobile' ? 10 : 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: this.props.auth.orientation == 'mobile' ? '100%' : '50%',
                alignItems: 'center',
                marginTop: this.props.auth.orientation == 'mobile' ? 10 : 0,
              }}></View>
          </View>

          <View
            style={{
              width: '100%',
              marginTop:
                this.props.auth.orientation == 'mobile'
                  ? Metrics.ratio(20)
                  : Metrics.ratio(90),
              // justifyContent: "center",
            }}>
            <View
              style={{
                width: '100%',
                height: Metrics.ratio(80) * this.props.auth.size,
                position: 'absolute',
                backgroundColor: Yellow,
                marginTop: Metrics.ratio(20),
              }}></View>
            {this.state.gender ? (
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal
                style={{width: Dimensions.get('window').width}}>
                {this.props.auth.fatherAvatar.map((item, i) => (
                  <TouchableOpacity
                    onPress={() => this.chooseAvatar(item.selected, item.id)}
                    activeOpacity={1}
                    key={i}
                    style={{alignItems: 'center'}}>
                    <FastImage
                      style={{
                        width: Metrics.ratio(100),
                        height: Metrics.ratio(120),
                        marginHorizontal: Metrics.ratio(10),
                      }}
                      source={{
                        uri:
                          this.state.avatarId == item.id
                            ? item.selected
                            : item.image,
                        priority: FastImage.priority.high,
                      }}
                    />
                    {/* {this.state.avatarId == item.id ? (
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        marginTop: -20,
                      }}
                      source={require("../../../assets/Images/Asset13.png")}
                    />
                  ) : null} */}
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={() => this.Camera()}
                  activeOpacity={1}>
                  <FastImage
                    style={{
                      width: 100,
                      height: this.state.fromCamera ? 100 : 120,
                      marginHorizontal: 10,
                      borderRadius: 100,
                      marginTop: this.state.fromCamera ? 5 : 0,
                    }}
                    source={
                      this.state.fromCamera
                        ? {uri: this.state.activeAvatar}
                        : Images.openCamera
                    }
                  />
                  {this.state.fromCamera ? (
                    <FastImage
                      style={{
                        width: 30,
                        height: 30,
                        marginTop: -20,
                        alignSelf: 'center',
                      }}
                      source={Images.asset13}
                    />
                  ) : null}
                </TouchableOpacity>
              </ScrollView>
            ) : (
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{width: Dimensions.get('window').width}}>
                {this.props.auth.motherAvatar.map((item, i) => (
                  <TouchableOpacity
                    onPress={() => this.chooseAvatar(item.selected, item.id)}
                    activeOpacity={1}
                    key={i}
                    style={{alignItems: 'center'}}>
                    <FastImage
                      style={{
                        width: 100,
                        height: 120,
                        marginHorizontal: 10,
                      }}
                      source={{
                        uri:
                          this.state.avatarId == item.id
                            ? item.selected
                            : item.image,
                      }}
                    />
                    {/* {this.state.avatarId == item.id ? (
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        marginTop: -20,
                      }}
                      source={require("../../../assets/Images/Asset13.png")}
                    />
                  ) : null} */}
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={() => this.Camera()}
                  activeOpacity={1}>
                  <FastImage
                    style={{
                      width: 100,
                      height: this.state.fromCamera ? 100 : 120,
                      marginHorizontal: 10,
                      borderRadius: 100,
                      marginTop: this.state.fromCamera ? 5 : 0,
                    }}
                    source={
                      this.state.fromCamera
                        ? {uri: this.state.activeAvatar}
                        : Images.openCamera
                    }
                  />
                  {this.state.fromCamera ? (
                    <FastImage
                      style={{
                        width: 30,
                        height: 30,
                        marginTop: -20,
                        alignSelf: 'center',
                      }}
                      source={Images.asset13}
                    />
                  ) : null}
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: Metrics.ratio(10) * this.props.auth.size,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: Metrics.ratio(100),
                width: '90%',
                // height: HomeTemplate * this.props.auth.size,

                overflow: 'hidden',
              }}
              activeOpacity={0.8}
              onPress={() => {
                if (
                  this.state.activeAvatar == '' &&
                  this.state.profileName == ''
                ) {
                  alert('Please select your avatar and enter your name');
                  return 0;
                }
                if (this.state.activeAvatar == '') {
                  alert('Please select your avatar');
                  return 0;
                }
                if (this.state.profileName == '') {
                  alert('Please enter your name');
                  return 0;
                }

                this.props.navigation.navigate('SignUp', {
                  image: this.state.activeAvatar,
                  name: this.state.profileName,
                  gender: this.state.gender,
                  camera: this.state.fromCamera,
                  url:
                    this.state.gender == 1
                      ? `../../../assets/Images/Male${this.state.activeAvatar}.png`
                      : `../../../assets/Images/ParentFemaleAsset${this.state.activeAvatar}.png`,
                });
              }}>
              <LinearGradient
                colors={['rgba(118,251,252,1)', 'rgba(36,160,193,1)']}
                // start={[1, 0]}
                // end={[1, 1]}
                style={{
                  zIndex: 1,
                  width: '100%',
                  position: 'absolute',
                  backfaceVisibility: 'hidden',
                  height: Metrics.ratio(45) * this.props.auth.size,
                  backgroundColor: Blue,
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: Metrics.ratio(2),
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                  flexDirection: 'row',

                  justifyContent: 'flex-end',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18 * this.props.auth.size,
                      color: 'white',
                      fontFamily: fonts.CARTERONE,
                    }}>
                    NEXT
                  </Text>
                </View>
                <FastImage
                  style={{
                    width: Metrics.ratio(80) * this.props.auth.size,
                    height: Metrics.ratio(80) * this.props.auth.size,
                    marginRight: Metrics.ratio(-15),
                  }}
                  source={Images.asset18}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, getTopics)(ChooseChild);
