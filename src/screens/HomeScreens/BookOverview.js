import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import AuthTemplate from '../../containers/AuthTemplate';
import HomeTemplate from '../../containers/HomeTemplate';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import {getPagesById, getQuiz} from '../../actions/BooksActions';
import {removeSneakPeak} from '../../actions/AuthActions';
// import { Audio } from "expo-av";
import {Yellow, Blue} from '../../common/Theme';
import HomeTabletTemplate from '../../containers/HomeTabletTemplate';
import fonts from '../../common/fonts';
import Sound from 'react-native-sound';
import FastImage from 'react-native-fast-image';
import {Images, Sounds} from '../../theme';
import {SoundHelper} from '../../helpers';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
class BookOverview extends Component {
  state = {
    stars: 1,
    lookInside: false,
    heart: true,
  };

  componentDidMount() {
    this.props.getPagesById(this.props.route.params.info.id);
    this.props.getQuiz(this.props.route.params.info.id);
  }

  // soundObject = new Audio.Sound();

  RunAudio = async () => {
    SoundHelper.playSound(Sounds.forestBookOverview);
  };

  render() {
    return (
      <HomeTemplate renderUser={true} navigation={this.props.navigation} home>
        <Modal
          visible={this.state.lookInside}
          onRequestClose={() => this.setState({lookInside: false})}
          animated
          animationType="slide"
          transparent
          style={{}}>
          <View
            style={{
              // width: "100%",
              flex: 1,

              backgroundColor: 'rgba(0,0,0,0.7)',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: Yellow,
            }}>
            <View style={{width: '90%', flex: 0.7}}>
              <View style={{width: '100%', alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => this.setState({lookInside: false})}>
                  <FastImage
                    style={{width: 50, height: 50}}
                    source={Images.asset15}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                pagingEnabled
                style={{
                  width: Dimensions.get('window').width * 0.9,
                  height: '100%',
                  paddingBottom: 0,
                }}>
                {this.props.books?.pages[0]?.book?.pages.map((item, i) => (
                  <View
                    key={i}
                    style={{
                      width: Dimensions.get('window').width * 0.9,
                      height: '100%',
                    }}>
                    <FastImage
                      style={{
                        width: Dimensions.get('window').width * 0.9,
                        height: '100%',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: item.image,
                        priority: FastImage.priority.high,
                      }}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
        <ImageBackground
          style={{width: '100%', flex: 1}}
          source={Images.asset8}>
          <TouchableOpacity
            style={{position: 'absolute', right: 50, zIndex: 100, top: 40}}
            onPress={() => {
              this.props.navigation.pop();
            }}>
            <FastImage
              // resizeMode="contain"
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 25,
                height: 25,
              }}
              source={Images.asset15}
            />
          </TouchableOpacity>
          <View style={{width: '100%', flex: 1}}>
            <ScrollView
              ref={(e) => (this.scroll = e)}
              showsVerticalScrollIndicator={true}
              style={{
                width: '100%',
                flex: 1,
                paddingTop: 10,
                paddingBottom: 0,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}>
                <View style={{width: '100%', alignItems: 'center'}}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    // resizeMode="contain"
                    style={{
                      width: WIDTH / 1.2,
                      height: HEIGHT / 1.7,
                      margin: 10,
                      marginBottom: 0,
                      zIndex: 1,
                      marginTop: 20,
                    }}
                    source={{
                      uri: this.props.books?.pages[0]?.book.overview?.image,
                      priority: FastImage.priority.high,
                    }}
                  />
                </View>

                <View
                  style={{
                    width: '90%',
                    position: 'absolute',
                    top: 150,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.setState({heart: !this.state.heart})}
                    activeOpacity={0.8}>
                    <FastImage
                      style={{width: 60, height: 60}}
                      // resizeMode="contain"
                      resizeMode={FastImage.resizeMode.contain}
                      source={
                        this.state.heart ? Images.asset67 : Images.asset67
                      }
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '90%',
                    position: 'absolute',
                    top: 150,
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.setState({lookInside: true})}
                    activeOpacity={0.8}>
                    <FastImage
                      resizeMode={FastImage.resizeMode.contain}
                      style={{width: 60, height: 60}}
                      // resizeMode="contain"
                      source={Images.asset64}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{width: '90%', alignItems: 'center'}}>
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 20,
                    }}>
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <FastImage
                        style={{width: 40, height: 40}}
                        // resizeMode="contain"
                        resizeMode={FastImage.resizeMode.contain}
                        source={Images.arabic}
                      />

                      <Text
                        style={{
                          // fontWeight: "bold",
                          fontSize: 12,
                          width: '50%',
                          color: 'white',
                          textTransform: 'uppercase',
                          fontFamily: fonts.CARTERONE,
                          top: -5,
                          lineHeight: 14,
                        }}>
                        {' '}
                        {this.props.books.books[0].categoryinfo?.name}
                      </Text>
                    </View>

                    <View style={{paddingTop: 10}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          color: 'white',
                          fontFamily: fonts.CARTERONE,
                          textTransform: 'uppercase',
                          lineHeight: 20,
                          width: 120,
                        }}>
                        LEARN
                        {'\b'} {this.props.books?.pages[0]?.book?.name} {'\n'}{' '}
                        VOCABULARY
                      </Text>
                    </View>
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <FastImage
                        style={{width: 40, height: 40}}
                        resizeMode={FastImage.resizeMode.contain}
                        // resizeMode="contain"
                        source={Images.child}
                      />

                      <Text
                        style={{
                          // fontWeight: "bold",
                          fontSize: 12,
                          color: 'white',
                          top: 5,
                          fontFamily: fonts.CARTERONE,
                        }}>
                        AGE{'\n'}4-6
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      marginTop: 20,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.RunAudio();
                      }}
                      style={{
                        width: '90%',
                        padding: 10,
                        backgroundColor: Yellow,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: 30,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                      }}
                      activeOpacity={0.8}>
                      <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={{width: 35, height: 35, right: -10}}
                        // resizeMode="contain"
                        source={Images.asset56}
                      />
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: 'bold',
                          color: 'white',
                          fontFamily: fonts.CARTERONE,
                          right: -10,
                        }}>
                        BOOK OVERVIEW
                      </Text>
                      <FastImage
                        style={{width: 90, height: 70, margin: -20}}
                        // resizeMode="contain"
                        resizeMode={FastImage.resizeMode.contain}
                        source={Images.asset23}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{width: '70%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontFamily: fonts.CARTERONE,
                      }}>
                      {this.props.books?.pages[0]?.book.overview?.text}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      marginTop: 20,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '80%',
                        padding: 10,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 30,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                      }}
                      activeOpacity={0.8}
                      onPress={async () => {
                        if (this.props.auth.sneakpeak) {
                          this.props.removeSneakPeak();
                        }

                        this.props.navigation.navigate('BookPage', {
                          mode: 'read to me',
                        });
                      }}>
                      <FastImage
                        style={{width: 40, height: 40, margin: -5}}
                        // resizeMode="contain"
                        resizeMode={FastImage.resizeMode.contain}
                        source={Images.asset57}
                      />
                      <View
                        style={{
                          width: '100%',
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          // position: "absolute",
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: Blue,
                            fontFamily: fonts.CARTERONE,
                          }}>
                          READ TO ME
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        width: '80%',
                        padding: 10,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 30,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        marginTop: 20,
                      }}
                      activeOpacity={0.8}
                      onPress={async () => {
                        if (this.props.auth.sneakpeak) {
                          this.props.removeSneakPeak();
                          await this.soundObject.setStatusAsync({
                            isMuted: true,
                          });
                          await this.soundObject.stopAsync();
                          await this.soundObject.unloadAsync();
                          return 0;
                        }

                        this.props.navigation.navigate('ReadMyself');
                        await this.soundObject.stopAsync();
                      }}>
                      <FastImage
                        style={{width: 40, height: 40, margin: -5}}
                        // resizeMode="contain"
                        resizeMode={FastImage.resizeMode.contain}
                        source={Images.asset58}
                      />
                      <View
                        style={{
                          width: '100%',
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          // position: "absolute",
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: Blue,
                            fontFamily: fonts.CARTERONE,
                          }}>
                          READ MYSELF
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        width: '80%',
                        padding: 10,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 30,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        marginTop: 20,
                      }}
                      activeOpacity={0.8}
                      onPress={async () => {
                        if (this.props.auth.sneakpeak) {
                          this.props.removeSneakPeak();
                        }

                        this.props.navigation.navigate('QuizScreen', {
                          mode: 'take quiz',
                          image: this.props.books?.pages[0]?.book.overview
                            ?.image,
                        });
                      }}>
                      <FastImage
                        style={{width: 40, height: 40, margin: -5}}
                        resizeMode={FastImage.resizeMode.contain}
                        // resizeMode="contain"
                        source={Images.asset59}
                      />
                      <View
                        style={{
                          width: '100%',
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          // position: "absolute",
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: Blue,
                            fontFamily: fonts.CARTERONE,
                          }}>
                          TAKE QUIZ
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {/* <View
                      style={{
                        width: "100%",
                        padding: 10,
                        backgroundColor: Yellow,
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        marginTop: 20,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "row",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          RATE BOOK
                        </Text>

                     <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                stars: 1,
                              })
                            }
                            activeOpacity={0.8}
                          >
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                margin: -20,
                                marginLeft: 0,
                              }}
                              source={
                                this.state.stars == 1 || this.state.stars > 1
                                  ? require("../../../assets/Images/Asset61.png")
                                  : require("../../../assets/Images/Asset60.png")
                              }
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                stars: 2,
                              })
                            }
                            activeOpacity={0.8}
                          >
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                margin: -20,
                                marginLeft: 0,
                              }}
                              source={
                                this.state.stars == 2 || this.state.stars > 2
                                  ? require("../../../assets/Images/Asset61.png")
                                  : require("../../../assets/Images/Asset60.png")
                              }
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                stars: 3,
                              })
                            }
                            activeOpacity={0.8}
                          >
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                margin: -20,
                                marginLeft: 0,
                              }}
                              source={
                                this.state.stars == 3 || this.state.stars > 3
                                  ? require("../../../assets/Images/Asset61.png")
                                  : require("../../../assets/Images/Asset60.png")
                              }
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                stars: 4,
                              })
                            }
                            activeOpacity={0.8}
                          >
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                margin: -20,
                                marginLeft: 0,
                              }}
                              source={
                                this.state.stars == 4 || this.state.stars > 4
                                  ? require("../../../assets/Images/Asset61.png")
                                  : require("../../../assets/Images/Asset60.png")
                              }
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                stars: 5,
                              })
                            }
                            activeOpacity={0.8}
                          >
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                margin: -20,
                                marginLeft: 0,
                              }}
                              source={
                                this.state.stars == 5 || this.state.stars > 5
                                  ? require("../../../assets/Images/Asset61.png")
                                  : require("../../../assets/Images/Asset60.png")
                              }
                            />
                          </TouchableOpacity>
                        </View>
                      </View> 
                    </View> */}

                    <View
                      style={{
                        width: '100%',
                        borderRadius: 20,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        backgroundColor: Blue,
                        overflow: 'hidden',
                        marginTop: 30,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: 'white',
                          fontFamily: fonts.CARTERONE,
                        }}>
                        RELATED BOOKS
                      </Text>
                      <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        style={{
                          width: Dimensions.get('window').width,
                        }}>
                        {this.props.books?.pages[0]?.book.relatedbook.map(
                          (item, i) => (
                            <TouchableOpacity
                              onPress={() => {
                                this.props.getPagesById(item.bookid);
                                this.scroll.scrollTo({y: 0});
                              }}
                              key={i}
                              activeOpacity={0.8}
                              style={{
                                width: 100,
                                height: 280,
                                marginRight: 20,
                                marginTop: 20,
                              }}>
                              <FastImage
                                style={{
                                  width: 100,
                                  height: 150,
                                  marginRight: 20,
                                }}
                                source={{
                                  uri: item.image,
                                  priority: FastImage.priority.high,
                                }}
                              />

                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: 12,
                                  color: 'white',
                                  fontFamily: fonts.CARTERONE,
                                  textTransform: 'uppercase',
                                  lineHeight: 20,
                                  marginTop: 10,
                                  textAlign: 'left',
                                }}>
                                LEARN
                                {'\b'} {item.name} VOCABULARY
                              </Text>
                              <View style={{width: '100%', marginTop: 20}}>
                                <View
                                  style={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      flexDirection: 'row',
                                    }}>
                                    <FastImage
                                      style={{width: 20, height: 20}}
                                      resizeMode={FastImage.resizeMode.contain}
                                      // resizeMode="contain"
                                      source={Images.arabic}
                                    />

                                    <Text
                                      style={{
                                        // fontWeight: "bold",
                                        fontSize: 8,
                                        color: 'white',
                                        textTransform: 'uppercase',
                                        fontFamily: fonts.CARTERONE,
                                        marginLeft: 5,
                                      }}>
                                      {/* {this.props.books.books[0].categoryinfo?.name} */}
                                      ARABIC{'\n'}ISLAND
                                    </Text>
                                  </View>

                                  <View
                                    style={{
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      flexDirection: 'row',
                                    }}>
                                    <FastImage
                                      style={{width: 20, height: 20}}
                                      resizeMode={FastImage.resizeMode.contain}
                                      // resizeMode="contain"
                                      source={Images.child}
                                    />

                                    <Text
                                      style={{
                                        // fontWeight: "bold",
                                        fontSize: 8,
                                        color: 'white',
                                        marginLeft: 5,

                                        fontFamily: fonts.CARTERONE,
                                      }}>
                                      AGE{'\n'}4-6
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>
                          ),
                        )}
                      </ScrollView>
                      <View
                        style={{
                          width: '100%',
                          height: 30,
                          marginTop: -15,

                          backfaceVisibility: 'hidden',
                        }}></View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {
  getPagesById,
  getQuiz,
  removeSneakPeak,
})(BookOverview);
