// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Orientation from 'react-native-orientation-locker';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';

import styles from './styles';

import {
  SneakPeakTheUser,
  socialLogin,
  resetUser,
  socialRegister,
} from '../../../actions/AuthActions';
import {getAvatarMale, getAvatarFemale} from '../../../actions/SignUpActions';
import {getContent} from '../../../actions/contentAction';
import {Images, Metrics, Colors} from '../../../theme';
import {
  ButtonView,
  Text,
  Facebook,
  Google,
  AppleSignIn,
  FastImagePlaceholder,
  Instagram,
} from '../../../components';
import {ThemedButton, VideoModal} from '../../../controls';
import {DataHelper} from '../../../helpers';

const sliderTextLocal = [
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

class LaunchScreen2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showVideoModal: false,
    };
  }

  componentDidMount() {
    this.props.getContent();
    this.props.getAvatarFemale();
    this.props.getAvatarMale();
  }

  renderTopView = (item) => {
    const {image, ordernumber} = item;
    return (
      <View style={styles.topView}>
        <FastImagePlaceholder
          source={{uri: image}}
          resizeMode={'stretch'}
          containerStyle={{
            flex: 1,
            width: Metrics.screenWidth,
            height: Metrics.screenWidth * 1.23,
          }}
        />
        {ordernumber === 2 && (
          <Image
            source={Images.logo}
            resizeMethod={'resize'}
            resizeMode={'contain'}
            style={{
              width: Metrics.screenWidth * 0.5,
              height: (Metrics.screenWidth * 0.5) / 1.97,
              position: 'absolute',
              left: Metrics.baseMargin,
              top: Metrics.baseMargin,
            }}
          />
        )}
      </View>
    );
  };

  renderVideoButton = () => {
    return (
      <ButtonView
        onPress={() => {
          this.setState({showVideoModal: true}, () => {
            Orientation.lockToLandscapeLeft();
          });
        }}
        style={styles.videoBtnNew}>
        <Image
          style={{height: Metrics.ratio(44), width: Metrics.ratio(44)}}
          source={Images.video}
        />
      </ButtonView>
    );
  };

  renderPagination = () => {
    const {slider1ActiveSlide} = this.state;
    const sliderText = this.props?.launchContent?.text;

    return (
      <Pagination
        dotsLength={sliderText.length}
        activeDotIndex={slider1ActiveSlide}
        containerStyle={{
          position: 'absolute',
          top: -Metrics.moderateRatio(52),
          height: Metrics.ratio(72),
        }}
        dotColor={Colors.themeColors.brightYellow}
        dotStyle={{}}
        inactiveDotColor={'#8a8a80'}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}
        carouselRef={this._carousel}
        tappableDots={!!this._carousel}
      />
    );
  };

  renderUsHusLogo = () => {
    return (
      <View
        style={{
          width: Metrics.screenWidth * 0.4,
          height: (Metrics.screenWidth * 0.4) / 1.9,
          position: 'absolute',
          bottom: Metrics.ratio(125) + Metrics.smallMargin,
          left: Metrics.smallMargin,
        }}>
        <Image
          style={{
            width: Metrics.screenWidth * 0.4,
            height: (Metrics.screenWidth * 0.4) / 1.9,
          }}
          resizeMethod={'resize'}
          resizeMode={'contain'}
          source={Images.usnhus}
        />
      </View>
    );
  };

  renderCarouselView = () => {
    const {slider1ActiveSlide} = this.state;
    const sliderText = this.props?.launchContent?.text;

    return (
      <View style={[styles.carouselContainer]}>
        <Carousel
          containerCustomStyle={{}}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          loop={true}
          autoplay={true}
          autoplayDelay={3000}
          autoplayInterval={2500}
          ref={(c) => {
            this._carousel = c;
          }}
          data={sliderText}
          onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  height: Metrics.screenHeight - Metrics.moderateRatio(120),
                }}>
                {this.renderTopView(item)}
                <View
                  style={{
                    marginHorizontal: Metrics.doubleBaseMargin,
                    // justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: Metrics.ratio(20),
                    height: Metrics.ratio(125),
                  }}>
                  {/* Removed this render video button */}
                  {/* {this.renderVideoButton()} */}

                  {this.renderPagination()}

                  <Text
                    size={Metrics.ratio(15)}
                    color="Yellow"
                    textAlign={'center'}
                    adjustsFontSizeToFit>
                    {item.heading}
                  </Text>
                  <Text
                    size={Metrics.ratio(12)}
                    color="light"
                    textAlign={'center'}
                    adjustsFontSizeToFit>
                    {item.text}
                  </Text>
                </View>
                {this.renderUsHusLogo()}
              </View>
            );
          }}
          sliderWidth={Metrics.screenWidth}
          itemWidth={Metrics.screenWidth}
        />
        {this.renderVideoButton()}
      </View>
    );
  };

  renderGradientButtonsContainer = () => {
    return (
      <View style={styles.gradientBtnContainer}>
        <ThemedButton
          text="SIGN UP"
          icon={Images.asset110}
          style={{
            marginRight: Metrics.smallMargin / 2,
            // paddingVertical: Metrics.baseMargin,
          }}
          onPress={() => {
            this.props.navigation.navigate('chooseAvatar');
          }}
        />
        <ThemedButton
          // text="SNEAK PEEK"
          text="SIGN IN"
          icon={Images.asset111}
          style={{marginLeft: Metrics.smallMargin / 2}}
          onPress={() => {
            // ========= Set-up for Sneak-Peak =========
            // const auth = DataHelper.getAuthState();
            // if (auth?.user && !auth?.userSelected) {
            //   this.props.resetUser();
            // }
            // this.props.SneakPeakTheUser();
            this.props.navigation.navigate('Login');
          }}
        />
      </View>
    );
  };

  onSocialLogin = (platform, platformData) => {
    // this.props.socialLogin(platformData, platform, this.props.navigation);
    // console.log('Getting data in launchh screen', platform, platformData);
    // this.props.socialRegister(platformData, platform, this.props.navigation);
    // platformData.type = 1;

    // console.log('Platform data:::::::::: ');
    // console.log('Platform data:::::::::: ', platformData.type, platformData);

    if (platformData.type == 1) {
      platformData.photo = platformData.picture.data.url;
    }
    this.props.navigation.navigate('chooseAvatar', {
      isSocialMediaSignup: true,
      smObject: platformData,
      smSource: platform,
    });
  };

  renderFooterView = () => {
    return (
      <View style={styles.footerViewContainer}>
        {this.renderGradientButtonsContainer()}
        <View
          style={{flexDirection: 'row', marginHorizontal: Metrics.smallMargin}}>
          <View style={{flex: 1}}>
            <View style={styles.footerButton}>
              <Text
                size={'xxxxSmall'}
                numberOfLines={2}
                style={styles.footerButtonText}>
                {/* SOCIAL SIGN IN */}
                SIGN UP
              </Text>
              {/* <View style={{flex: 1}}></View> */}
              <Facebook onFBLoggedIn={this.onSocialLogin} />
              <Google onGSI={this.onSocialLogin} />
              <Instagram onInstaLogin={this.onSocialLogin} />
              {/* <AppleSignIn onAppleLoggedIn={this.onSocialLogin} /> */}
            </View>
          </View>
          <View style={{flex: 1}}>
            <ButtonView
              style={styles.footerButton}
              onPress={() => {
                // this.props.navigation.navigate('Login');
                this.setState({showVideoModal: true}, () => {
                  Orientation.lockToLandscapeLeft();
                });
              }}>
              <Text
                size={'xxxxSmall'}
                style={[
                  styles.footerButtonText,
                  {marginLeft: Metrics.baseMargin},
                ]}>
                {/* Already have an account? */}A Quick
              </Text>

              <Text
                size={Metrics.moderateRatio(12)}
                style={[
                  styles.footerButtonText,
                  // {marginRight: Metrics.smallMargin},
                ]}
                color={'BLUE'}>
                LOOK INSIDE
              </Text>
              <FastImage
                source={Images.asset18}
                resizeMode={FastImage.resizeMode.contain}
                style={[
                  {
                    width: Metrics.moderateRatio(60),
                    height: Metrics.moderateRatio(60),
                    // backgroundColor: 'green',
                  },
                ]}
              />
            </ButtonView>
          </View>
        </View>
        {/* {this.renderTermConditionsButtons()} */}
      </View>
    );
  };

  renderTermConditionsButtons = () => {
    return (
      <View
        style={{flexDirection: 'row', marginHorizontal: Metrics.baseMargin}}>
        <View style={{flex: 1}}>
          <ButtonView
            style={styles.footerButton2}
            onPress={() => {
              this.props.navigation.navigate('InternalWebView', {
                uri: 'https://kidzlim.co.uk/terms-of-service/',
              });
            }}>
            <Text size={'xxxxxSmall'} style={styles.footerButtonText2}>
              Terms & Conditions
            </Text>
          </ButtonView>
        </View>
        <View style={{flex: 1}}>
          <ButtonView
            style={styles.footerButton2}
            onPress={() => {
              this.props.navigation.navigate('InternalWebView', {
                uri: 'https://kidzlim.co.uk/privacy-policy/',
              });
            }}>
            <Text size={'xxxxxSmall'} style={styles.footerButtonText2}>
              Privacy Policy
            </Text>
          </ButtonView>
        </View>
      </View>
    );
  };

  renderVideoModal = () => {
    return (
      <VideoModal
        doShowModal={this.state.showVideoModal}
        data={this.props.video && this.props.video[0]}
        onCurrentVideoEnded={() => {}}
        onClose={() => {
          this.setState({showVideoModal: false}, () => {
            Orientation.lockToPortrait();
          });
        }}
      />
    );

    return (
      <Modal
        style={{
          margin: 0,
          justifyContent: 'center',
        }}
        animationType="slide"
        transparent={true}
        visible={this.state.showVideoModal}>
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
                  this.setState({showVideoModal: false}, () => {
                    Orientation.lockToPortrait();
                  });
                }}
                style={{alignSelf: 'flex-end', top: -10}}>
                <FastImage
                  source={Images.asset15}
                  style={{
                    width: Metrics.ratio(50),
                    height: Metrics.ratio(50),
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#fff',
                  height: Metrics.ratio(250),
                  borderRadius: Metrics.ratio(20),
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
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {this.renderCarouselView()}
          {this.renderFooterView()}
        </View>
        {this.renderVideoModal()}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({content}) => {
  const {video, launchContent} = content;

  // messages.sort(compare);
  return {
    video,
    launchContent,
  };
};

const actions = {
  SneakPeakTheUser,
  getAvatarFemale,
  getAvatarMale,
  getContent,
  socialLogin,
  socialRegister,
  resetUser,
};

export default connect(mapStateToProps, actions)(LaunchScreen2);
