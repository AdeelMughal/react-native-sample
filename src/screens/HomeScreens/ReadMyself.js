import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import AuthTemplate from '../../containers/AuthTemplate';
import HomeTemplate from '../../containers/HomeTemplate';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';

import {Yellow, Blue} from '../../common/Theme';
import HomeTabletTemplate from '../../containers/HomeTabletTemplate';
import Highlighter from 'react-native-highlight-words';
// import * as Speech from "expo-speech";
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import {Images} from '../../theme';

class ReadMyself extends Component {
  state = {
    text: '',
    HighlightText: '',
    scrollCounter: 0,
    ScrollTo: 0,
    counter: 0,
    pages: this.props.books?.pages[0]?.book?.pages,
    card: 0,
    end: false,
    gender: 1,
    firstTime: true,
    audio: '',
    firstAudio: '',
    settings: false,
    isMuted: false,
  };

  PauseSpeech = async () => {
    this.setState({isMuted: !this.state.isMuted}, async () => {
      if (this.state.isMuted) {
        await this.soundObject.setStatusAsync({isMuted: true});
      } else {
        await this.soundObject.setStatusAsync({isMuted: false});
      }
    });
  };

  // soundObject = new Audio.Sound();

  RunAudio = async () => {
    let audioObject = await this.soundObject.getStatusAsync();

    if (audioObject.isLoaded) {
      await this.soundObject.playAsync();
    } else {
      await this.soundObject.loadAsync(
        {uri: this.state.audio},
        {isMuted: this.state.isMuted},
        true,
      );
      await this.soundObject.playAsync();
    }

    await this.soundObject.setOnPlaybackStatusUpdate(async (playBack) => {
      if (playBack.didJustFinish) {
        const unloading = await this.soundObject.unloadAsync();

        if (
          this.state.counter >=
          this.props.books?.pages[0]?.book?.pages.length - 1
        ) {
          return 0;
        }

        this.setState(
          {
            counter:
              this.state.counter >=
              this.props.books?.pages[0]?.book?.pages.length - 1
                ? this.state.counter
                : this.state.counter + 1,
            // ScrollTo:
            //   this.state.counter >=
            //   this.props.books?.pages[0]?.book?.pages.length - 1
            //     ? this.state.ScrollTo
            //     : this.state.ScrollTo + Dimensions.get("window").width,
          },
          async () => {
            this.props.books?.pages[0]?.book?.pages
              ?.filter((item, i) => i == this.state.counter)
              .map((item) => {
                this.setState(
                  {
                    audio: item.content[0].audio,
                  },
                  () => {
                    // this.scroll.scrollTo({
                    //   x: this.state.ScrollTo,
                    //   y: 0,
                    //   animated: true,
                    // });
                    this['animate' + this.state.card].flipInY();
                    this.RunAudio();
                  },
                );
              });
          },
        );
      }
    });
  };

  textToHighlight = () => {
    let data = this.state.text.split(' ');

    this.timer = setInterval(() => {
      this.setState(
        {
          counter:
            Math.abs(this.state.counter - data.length) == 1
              ? this.state.counter + 1
              : this.state.counter + 2,
        },
        () => {
          if (
            this.state.counter == data.length ||
            this.state.counter > data.length
          ) {
            clearInterval(this.timer);
            this.setState(
              {
                HighlightText: '',
                counter: 0,
                ScrollTo:
                  this.state.scrollCounter >
                  this.props.books?.pages[0]?.book?.pages.length - 1
                    ? 0
                    : this.state.ScrollTo + Dimensions.get('window').width,
                card:
                  this.state.scrollCounter >=
                  this.props.books?.pages[0]?.book?.pages.length - 1
                    ? 0
                    : this.state.card + 1,
                scrollCounter:
                  this.state.scrollCounter >
                  this.props.books?.pages[0]?.book?.pages.length - 1
                    ? 0
                    : this.state.scrollCounter + 1,
                end:
                  this.state.scrollCounter >=
                  this.props.books?.pages[0]?.book?.pages.length - 1
                    ? true
                    : false,
              },
              async () => {
                this.scroll.scrollTo({
                  x: this.state.ScrollTo,
                  y: 0,
                  useNativeDriver: true,
                  animated: true,
                });
                this['animate' + this.state.card].flipInY();
                if (!this.state.end) {
                  if (this.state.gender !== null) {
                    this.wordToSpeak();
                  } else {
                    this.RunAudio();
                  }
                } else {
                  await this.soundObject.unloadAsync();
                  this.unHighlightText();
                  Speech.stop();
                }
              },

              // () => {
              //   this.scroll.scrollTo({
              //     x: this.state.ScrollTo,
              //     y: 0,
              //     animated: true,
              //   });
              // }
            );
          }
        },
      );
    }, 700);
  };

  async componentDidMount() {
    // await Audio.requestPermissionsAsync();
    this.props.navigation.addListener('blur', () => {
      // this.soundObject.stopAsync();
    });
  }

  goToHome = () => {
    // this.soundObject.stopAsync();
    this.props.navigation.navigate('Category');
  };

  async componentWillUnmount() {
    // await this.soundObject.stopAsync();
  }

  Repeat = async () => {
    this.setState(
      {
        counter: 0,
        audio: this.state.firstAudio,
      },
      () => {
        this.scroll.scrollTo({
          x: 0,
          y: 0,
          useNativeDriver: true,
          animated: true,
        });
        this['animate' + this.state.card].flipInY();
        // this.RunAudio();
      },
    );
  };

  render() {
    if (this.props.auth.orientation == 'tablet') {
      return (
        <HomeTabletTemplate
          settings
          noTabs
          back
          navigation={this.props.navigation}>
          {/* <ImageBackground style={{width:"100%",flex:1}}>

            </ImageBackground> */}
        </HomeTabletTemplate>
      );
    }

    return (
      <SafeAreaView
        style={{
          width: '100%',
          flex: 1,
          backgroundColor: Yellow,

          paddingTop: StatusBar.currentHeight,
        }}>
        <View
          style={{
            width: '100%',
            flex: 1,
            backgroundColor: 'white',

            margin: 0,
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flex: 1,
            }}>
            <View
              style={{
                width: '100%',
                height: 50,
                backgroundColor: Yellow,
                zIndex: 0,
                margin: 0,
              }}></View>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                position: 'absolute',
                zIndex: 99,
              }}>
              <View
                style={{
                  width: '60%',
                  zIndex: 1,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.props.navigation.goBack()}>
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                      marginTop: -15,
                      marginLeft: -20,
                    }}
                    source={Images.asset19}
                  />
                </TouchableOpacity>

                <Image
                  resizeMode={FastImage.resizeMode.contain}
                  // resizeMode="contain"
                  style={{
                    width: 150,
                    height: 70,
                    zIndex: 1,
                    marginLeft: -20,
                  }}
                  source={Images.logo}
                />
              </View>
              <View
                style={{
                  width: '40%',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      this.setState({settings: !this.state.settings})
                    }>
                    <FastImage
                      resizeMode={FastImage.resizeMode.contain}
                      // resizeMode="contain"
                      style={{
                        width: 40,
                        height: 40,
                      }}
                      source={Images.asset25}
                    />
                  </TouchableOpacity>

                  {this.state.settings ? (
                    <Animatable.View
                      easing="linear"
                      duration={300}
                      animation={'bounceInDown'}
                      style={{
                        width: 40,
                        backgroundColor: Yellow,
                        borderBottomRightRadius: 100,
                        borderBottomLeftRadius: 100,
                        marginLeft: 1,
                        // borderWidth: 2,
                        // borderColor: Blue,
                        height: 180,
                        // position: "absolute",
                        paddingTop: 10,
                        marginTop: 0,
                        borderTopWidth: 0,
                      }}>
                      <TouchableOpacity
                        onPress={() => this.goToHome()}
                        activeOpacity={0.8}
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <FastImage
                          style={{width: 40, height: 40}}
                          resizeMode={FastImage.resizeMode.contain}
                          // resizeMode="contain"
                          source={Images.asset26}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        // onPress={() => this.PauseSpeech()}
                        activeOpacity={0.8}
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 10,
                        }}>
                        <FastImage
                          style={{width: 30, height: 30}}
                          resizeMode={FastImage.resizeMode.contain}
                          // resizeMode="contain"
                          source={Images.asset27}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 10,
                        }}>
                        <FastImage
                          style={{width: 30, height: 30}}
                          resizeMode={FastImage.resizeMode.contain}
                          // resizeMode="contain"
                          source={Images.asset29}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.Repeat()}
                        activeOpacity={0.8}
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 10,
                        }}>
                        <FastImage
                          style={{width: 30, height: 30}}
                          resizeMode={FastImage.resizeMode.contain}
                          // resizeMode="contain"
                          source={Images.asset28}
                        />
                      </TouchableOpacity>
                    </Animatable.View>
                  ) : null}
                  {/* </TouchableOpacity> */}
                </View>
              </View>
            </View>

            <ScrollView
              pagingEnabled
              ref={(e) => (this.scroll = e)}
              style={{
                width: Dimensions.get('window').width,
                flex: 1,
                zIndex: 0,
              }}
              scrollEnabled={true}
              horizontal
              //   onScrollEndDrag={() => {
              //     this["animate" + (this.state.card + 1)].flipInY();

              //     this.setState({ card: this.state.card + 1 });
              //   }}
            >
              {this.props.books?.pages[0]?.book?.pages.map((item, i) => {
                // this.setState(
                //   {
                //     audio: item.content[0].audio,
                //   },
                //   () => {
                //     this.RunAudio();
                //   }
                // );

                return (
                  <Animatable.View
                    ref={(ref) => (this['animate' + i] = ref)}
                    key={i}
                    duration={1000}
                    animation="flipInY"
                    style={{width: '100%', flex: 1}}>
                    <ImageBackground
                      source={{uri: item.image}}
                      style={{
                        width: Dimensions.get('window').width,
                        flex: 1,
                        justifyContent: 'flex-end',
                      }}
                      resizeMode="stretch">
                      <View
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          height: 100,
                        }}>
                        <View style={{width: '85%', height: 100}}>
                          <TouchableOpacity
                            onPress={() => this.Repeat()}
                            activeOpacity={0.8}>
                            <FastImage
                              style={{
                                width: 60,
                                height: 60,
                                // resizeMode: "contain",
                              }}
                              resizeMode={FastImage.resizeMode.contain}
                              source={Images.asset30}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                  </Animatable.View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(MapSateToProps, {})(ReadMyself);

{
  /* <ScrollView
          pagingEnabled
          ref={(e) => (this.scroll = e)}
          style={{ width: Dimensions.get("window").width, flex: 1, zIndex: 0 }}
          scrollEnabled={true}
          horizontal
          //   onScrollEndDrag={() => {
          //     this["animate" + (this.state.card + 1)].flipInY();

          //     this.setState({ card: this.state.card + 1 });
          //   }}
        >
          {this.props.books?.pages[0]?.book?.pages.map((item, i) => {
            // this.setState(
            //   {
            //     audio: item.content[0].audio,
            //   },
            //   () => {
            //     this.RunAudio();
            //   }
            // );

            return (
              <Animatable.View
                ref={(ref) => (this["animate" + i] = ref)}
                key={i}
                duration={1000}
                animation="flipInY"
                style={{ width: "100%", flex: 1 }}
              >
                <ImageBackground
                  source={{ uri: item.image }}
                  style={{
                    width: Dimensions.get("window").width,
                    flex: 1,
                    justifyContent: "flex-end",
                  }}
                  resizeMode="stretch"
                >
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      height: 100,
                    }}
                  >
                    <View style={{ width: "85%", height: 100 }}>
                      <TouchableOpacity
                        onPress={() => this.Repeat()}
                        activeOpacity={0.8}
                      >
                        <Image
                          style={{
                            width: 60,
                            height: 60,
                            resizeMode: "contain",
                          }}
                          source={require("../../../assets/Images/Asset30.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </Animatable.View>
            );
          })}
        </ScrollView> */
}
