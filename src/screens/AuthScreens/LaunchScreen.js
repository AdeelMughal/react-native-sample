import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Blue, Yellow} from '../../common/Theme';
import {SneakPeakTheUser} from '../../actions/AuthActions';
import {connect} from 'react-redux';
import KidModal from '../../components/KidModal';
import {getAvatarMale, getAvatarFemale} from '../../actions/SignUpActions';
import {getContent} from '../../actions/contentAction';
import Sound from 'react-native-sound';
import fonts from '../../common/fonts';
import Video from 'react-native-video';
// import Carousel from 'react-native-banner-carousel';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import {Images, Sounds, Metrics} from '../../theme';

let isTablet = DeviceInfo.isTablet();

const BannerWidth = Dimensions.get('window').width / 1.5;
const Height = Dimensions.get('window').height;
const BannerHeight = isTablet
  ? Dimensions.get('window').height / 5.5
  : Dimensions.get('window').height / 5.3;

const sliderText = [
  {
    headerText: 'NURTURE A LOVE OF READING & LEARNING',
    bodyText:
      "Instant access to an unlimited Islamic library of amazing children's books",
  },
  {
    headerText: 'EXPLORE & LEARN',
    bodyText:
      'Hundreds of Animated Audio Books, Quizzes, Activities, Glossary, and much more...',
  },
  {
    headerText: 'MAKE LEARNING FUN & EXCITING',
    bodyText:
      'Read stories of Prophets, Learn Arabic & Understand Quran with attractive illustrations.',
  },
  {
    headerText: 'KEEP TRACK & EARN GOOD DEEDS',
    bodyText:
      "Unlimited access to amazing children’s books & quizzes. Let's start your reading experience now.",
  },
];

class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      visible: false,
    };
  }

  componentDidMount() {
    this.props.getContent();
    this.props.getAvatarFemale();
    this.props.getAvatarMale();

    // this.sound = new Sound(Sounds.background, (error) => {
    //   if (error) {
    //   } else {
    //     this.sound.play();
    //   }
    // });
  }

  renderPage(text, index) {
    return (
      <View
        key={index}
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginTop: 10,
          flex: 1,
        }}>
        <Text
          style={{
            fontFamily: fonts.CARTERONE,
            color: Yellow,
            textAlign: 'left',
            fontSize: isTablet ? 24 : 17,
            width: '72%',
            fontWeight: 'bold',
            lineHeight: isTablet ? 27 : 23,
          }}>
          {text.headerText}
        </Text>
        <Text
          style={{
            fontFamily: fonts.CARTERONE,
            color: 'white',
            textAlign: 'left',
            fontSize: isTablet ? 20 : 14,
            fontWeight: 'bold',
            width: '72%',
            lineHeight: isTablet ? 22 : 18,
            marginTop: 5,
          }}>
          {text.bodyText}
        </Text>
      </View>
    );
  }

  renderCarousel = () => {
    return (
      <View
        style={{
          height: BannerHeight,
          width: BannerWidth,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: isTablet ? Height * 0.12 : Height * 0.15,
          padding: Metrics.smallMargin,
        }}>
        <Carousel
          autoplay
          autoplayTimeout={3500}
          loop
          index={0}
          pageIndicatorStyle={{
            width: isTablet ? 10 : 8,
            height: isTablet ? 10 : 8,
            marginTop: 20,
          }}
          activePageIndicatorStyle={{
            backgroundColor: 'white',
            width: isTablet ? 10 : 8,
            height: isTablet ? 10 : 8,
          }}
          pageSize={BannerWidth}>
          {sliderText.map((slider, index) => this.renderPage(slider, index))}
        </Carousel>
      </View>
    );
  };

  renderSignupButton = () => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 20,
          height: isTablet ? 65 : 65,

          overflow: 'hidden',
          flex: 6,
        }}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('chooseAvatar')}>
        <LinearGradient
          colors={['rgba(118,251,252,1)', 'rgba(36,160,193,1)']}
          // start={[1, 0]}
          // end={[1, 1]}
          style={{
            zIndex: 1,
            width: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            height: isTablet ? 65 : 65,
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

            justifyContent: 'flex-start',
          }}>
          <FastImage
            style={{
              width: isTablet ? 110 : 100,
              height: isTablet ? 110 : 100,
              marginLeft: -10,
            }}
            source={Images.asset110}
          />
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
                fontSize: isTablet ? 26 : 26,
                // fontWeight: "700",
                color: 'white',
                marginLeft: 50,
                fontFamily: fonts.CARTERONE,
              }}>
              SIGN UP
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  renderSneakButton = () => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 20,
          width: '100%',
          height: isTablet ? 65 : 65,

          overflow: 'hidden',
          flex: 4,
        }}
        activeOpacity={0.8}
        onPress={() => this.props.SneakPeakTheUser()}>
        <LinearGradient
          colors={['rgba(118,251,252,1)', 'rgba(36,160,193,1)']}
          // start={[1, 0]}
          // end={[1, 1]}
          style={{
            zIndex: 1,
            width: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            height: isTablet ? 65 : 65,
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

            justifyContent: 'flex-start',
          }}>
          <FastImage
            style={{
              width: isTablet ? 110 : 100,
              height: isTablet ? 110 : 100,
              marginLeft: -10,
            }}
            source={Images.asset111}
          />
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
                fontSize: isTablet ? 26 : 24,
                // fontWeight: "700",
                color: 'white',
                marginLeft: 50,
                fontFamily: fonts.CARTERONE,
              }}>
              SNEAK PEEK
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{
          width: '100%',
          flex: 1,
          backgroundColor: Yellow,
        }}>
        <ImageBackground
          source={Images.launchScreen}
          style={{
            width: '100%',
            height: Dimensions.get('window').height,
            alignItems: 'center',
          }}
          resizeMode="stretch">
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              height: '100%',
              top: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({visible: true});
                this.sound.release();
              }}
              style={{
                height: isTablet ? '12%' : '8%',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'flex-end',
                marginRight: 40,
              }}>
              <FastImage
                style={{height: isTablet ? 55 : 50, width: isTablet ? 55 : 50}}
                source={Images.video}
              />
            </TouchableOpacity>
            {this.renderCarousel()}
            <View
              style={{
                width: '70%',
                alignItems: 'center',
                justifyContent: 'center',
                height: Height - BannerHeight,
                top: -20,
              }}>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1.6,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <FastImage
                    source={Images.facebookLogin}
                    style={{
                      width: isTablet ? 65 : 65,
                      height: isTablet ? 75 : 75,
                      top: 4,
                      left: -10,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </TouchableOpacity>
                {this.renderSignupButton()}
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <FastImage
                    source={Images.googleLogin}
                    style={{
                      width: isTablet ? 65 : 65,
                      height: isTablet ? 75 : 75,
                      top: 4,
                      left: -10,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </TouchableOpacity>
                {this.renderSneakButton()}
              </View>
              <TouchableOpacity
                //For Modal Testing
                onPress={() => this.setState({modalVisible: true})}
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text
                  style={{
                    marginTop: 10,
                    // fontWeight: "bold",
                    color: 'white',
                    textDecorationLine: 'underline',
                    fontFamily: fonts.CARTERONE,
                    fontSize: isTablet ? 18 : 17,
                  }}>
                  Already have an account? SIGN IN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <Modal
          style={{
            margin: 0,
            justifyContent: 'center',
          }}
          animationType="slide"
          transparent={true}
          visible={this.state.visible}>
          <TouchableWithoutFeedback>
            <View
              style={{
                justifyContent: 'center',
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
              }}>
              <View style={{width: '90%'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({visible: false});
                    this.sound.play();
                  }}
                  style={{alignSelf: 'flex-end', top: -10}}>
                  <FastImage
                    source={Images.asset15}
                    style={{
                      width: isTablet ? 60 : 50,
                      height: isTablet ? 60 : 50,
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: '#fff',
                    height: isTablet ? 350 : 250,
                    borderRadius: 20,
                  }}>
                  <Video
                    source={{
                      uri: this.props.video && this.props.video[0].video,
                      priority: FastImage.priority.high,
                    }}
                    style={{flex: 1}}
                    repeat={true}
                    controls={true}
                    muted={false}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = ({content}) => {
  const {video} = content;

  // messages.sort(compare);
  return {
    video,
  };
};

export default connect(mapStateToProps, {
  SneakPeakTheUser,
  getAvatarFemale,
  getAvatarMale,
  getContent,
})(LaunchScreen);
