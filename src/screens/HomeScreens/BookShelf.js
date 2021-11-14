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
} from 'react-native';
import AuthTemplate from '../../containers/AuthTemplate';
import HomeTemplate from '../../containers/HomeTemplate';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import {
  getBookById,
  selectedBook,
  getFeaturedImages,
  applyFilters,
  quickNabvigation,
} from '../../actions/BooksActions';
import {Yellow, Blue} from '../../common/Theme';
import HomeTabletTemplate from '../../containers/HomeTabletTemplate';
import Sound from 'react-native-sound';
import fonts from '../../common/fonts';
import {TextInputColor} from '../../common/Theme';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';

import {Images, Sounds} from '../../theme';
import {SoundHelper} from '../../helpers';

const categories = [
  {
    text: 'ARABIC\nISLAND',
    image: Images.island,
    id: 1,
  },
  {
    text: 'Quran\nOcean',
    image: Images.ocean,
    id: 2,
  },
  {
    text: 'Moral\nValues',
    image: Images.moral,
    id: null,
  },
  {
    text: 'Islamic\nArt',
    image: Images.islamic,
    id: null,
  },
  {
    text: 'Fun\nTime',
    image: Images.fun,
    id: null,
  },
];

var Filters = [
  {
    text: 'AGE 4-7',
    image: Images.island,
    value: 'age4-7',
  },
  {
    text: 'AGE 8-12',
    image: Images.island,
    value: 'age8-12',
  },
  {
    text: 'NEW ADDITION',
    image: Images.island,
    value: 'new',
  },
  {
    text: 'POPULAR BOOKS',
    image: Images.island,
    value: 'popular',
  },
  {
    text: 'FEATURED',
    image: Images.island,
    value: 'featured',
  },
  {
    text: 'BEST RATED',
    image: Images.island,
    value: 'rating',
  },
];

class BookShelf extends Component {
  state = {
    ScrollTo: Dimensions.get('window').width,
    scrolCounter: 1,
    dots: 0,
    displayFilters: false,
  };

  componentWillReceiveProps(props) {
    if (props.books.books.length == 0) {
      this.props.getBookById(this.props.route.params.info);
    }
  }

  Scroll = {};

  componentDidMount() {
    this.props.quickNabvigation();

    SoundHelper.playSound(Sounds.mainSound);

    setInterval(() => {
      this.Scroll?.scrollTo({
        x: this.state.ScrollTo,
        y: 0,
        useNativeDriver: true,
        animated: true,
      });
      this.setState({
        ScrollTo:
          this.state.scrolCounter == 0
            ? 0
            : this.state.ScrollTo + Dimensions.get('window').width,
        scrolCounter:
          this.props.books.categories.length == this.state.scrolCounter ||
          this.props.books.categories.length < this.state.scrolCounter
            ? 0
            : this.state.scrolCounter + 1,
        dots:
          this.props.books.categories.length == this.state.scrolCounter ||
          this.props.books.categories.length < this.state.scrolCounter
            ? 0
            : this.state.dots + 1,
      });
    }, 2000);

    if (this.props.books.featureImages.length == 0) {
      this.props.getFeaturedImages();
    }
  }
  closeModal = () => {
    this.setState({
      displayFilters: false,
    });
  };

  render() {
    // this.sound = new Sound(Sounds.mainSound, (error) => {
    //   if (error) {
    //   }
    // });

    return (
      <HomeTemplate renderUser={true} navigation={this.props.navigation} home>
        <View style={{width: '100%', flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%', flex: 1}}>
            <View
              style={{
                width: '100%',
                height: 200,
                // justifyContent: "flex-end",
              }}>
              <View
                style={{
                  width: 100,
                  height: '70%',
                  position: 'absolute',
                  zIndex: 99,
                  marginTop: 80,
                  marginLeft: 10,
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.props.navigation.goBack()}>
                  <FastImage
                    style={{
                      width: 100,
                      height: 100,
                      // resizeMode: "center",
                      marginLeft: 0,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                    source={{uri: this.props.route.params?.subImage}}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView
                ref={(e) => (this.Scroll = e)}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{
                  width: Dimensions.get('window').width,
                  height: 300,
                  marginTop: -52,
                }}
                scrollEnabled>
                {this.props.books.featureImages.map((item, id) => (
                  <TouchableOpacity
                    key={id}
                    style={{
                      width: Dimensions.get('window').width,
                      height: 300,
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('BookOverview', {
                        image: item.image,
                        info: {id: item.bookid},
                      });
                    }}
                    activeOpacity={0.8}>
                    <ImageBackground
                      key={id}
                      style={{
                        width: Dimensions.get('window').width,
                        height: 300,
                      }}
                      imageStyle={{resizeMode: 'contain'}}
                      source={{uri: item.mobile}}></ImageBackground>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  position: 'absolute',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  zIndex: 99,
                  marginTop: 170,
                }}>
                {this.props.books.featureImages.map((item, id) => (
                  <View
                    key={id}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 100,
                      backgroundColor:
                        this.state.dots == id ? Yellow : 'rgba(0,0,0,0.5)',
                      marginLeft: 5,
                    }}></View>
                ))}
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: 'lightgrey',
                padding: 10,
              }}>
              <ScrollView
                // ref={(e) => (this.Scroll = e)}

                showsHorizontalScrollIndicator={false}
                horizontal
                style={{
                  flex: 1,
                }}>
                {this.props.books?.qckNav.map((item) => (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      marginLeft: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      // width: Dimensions.get("window").width,
                    }}
                    onPress={() => {
                      this.props.getBookById(item.catid);
                    }}
                    activeOpacity={0.8}>
                    <FastImage
                      resizeMode={FastImage.resizeMode.contain}
                      style={{
                        width: 60,
                        height: 60,
                      }}
                      // resizeMode={"contain"}
                      source={{
                        uri: item.icon,
                        priority: FastImage.priority.high,
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 5,
                        fontFamily: fonts.CARTERONE,
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        fontSize: 12,
                        lineHeight: 15,
                      }}>
                      {item.name}{' '}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View
                style={{
                  marginHorizontal: 20,
                  flex: 0.2,
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                  }}
                  // onPress={() => {
                  //   this.props.navigation.navigate("BookOverview", {
                  //     image: item.image,
                  //     info: { id: item.bookid },
                  //   });
                  // }}
                  onPress={() =>
                    this.setState({displayFilters: !this.state.displayFilters})
                  }>
                  <FastImage
                    style={{
                      width: 70,
                      height: 70,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                    // imageStyle={{ resizeMode:'contain'}}
                    source={Images.filter}
                  />
                  <Text
                    style={{fontFamily: fonts.CARTERONE, textAlign: 'center'}}>
                    {' '}
                    Filter
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {this.state.displayFilters ? (
              <Animatable.View
                style={{
                  width: '100%',
                  backgroundColor: Yellow,
                  // position: "absolute",
                  height: '100%',
                }}
                animation={'bounceIn'}>
                <ScrollView
                  style={{width: '100%'}}
                  showsVerticalScrollIndicator={true}>
                  {Filters.map((item) => (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() =>
                        this.props.applyFilters(
                          item.value,
                          'book',
                          this.props.route.params.info,
                          this.props.books.books,
                          this.closeModal,
                        )
                      }
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginLeft: 20,
                        marginTop: 15,

                        // marginHorizontal:40
                      }}>
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                        }}
                        // imageStyle={{ resizeMode:'contain'}}
                        resizeMode={FastImage.resizeMode.contain}
                        source={item.image}
                      />
                      <Text
                        style={{
                          fontSize: 22 * this.props.auth.size,
                          color: 'white',
                          marginVertical: 10,
                          paddingLeft: 20,
                          fontFamily: fonts.CARTERONE,
                        }}>
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </Animatable.View>
            ) : null}

            {/* Books start from here */}
            {this.props.books.books.length == 0 ? (
              <View style={{width: '100%', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={Yellow} />
              </View>
            ) : (
              <FlatList
                data={this.props.books.books[0].categoryinfo.bookinfo}
                keyExtractor={(item, id) => item.id}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flex: 1,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                ListFooterComponent={() => (
                  <View
                    style={{
                      width: Dimensions.get('window').width,
                      alignItems: 'center',
                      height: 30,
                      backfaceVisibility: 'hidden',
                    }}>
                    <FastImage
                      // resizeMode="cover"
                      resizeMode={FastImage.resizeMode.cover}
                      style={{width: '95%', height: 30}}
                      source={
                        this.props.books.books[0].categoryinfo.bookinfo
                          .length !== 0
                          ? Images.woodpannel
                          : null
                      }
                    />
                  </View>
                )}
                ItemSeparatorComponent={() => (
                  <View
                  // style={{
                  //   width: Dimensions.get("window").width,
                  //   alignItems: "center",
                  //   height: 20,
                  //   backfaceVisibility: "hidden",
                  // }}
                  >
                    <FastImage
                      resizeMode={FastImage.resizeMode.cover}
                      // resizeMode="cover"
                      style={{
                        width: Dimensions.get('window').width - 20,
                        height: 30,
                      }}
                      source={
                        this.props.books.books[0].categoryinfo.bookinfo
                          .length !== 0
                          ? Images.woodpannel
                          : null
                      }
                    />
                  </View>
                )}
                renderItem={({item}) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      this.props.navigation.navigate('BookOverview', {
                        image: item.image,
                        info: item,
                      });
                      this.props.selectedBook(item);
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 20,
                      right: -10,
                    }}>
                    <FastImage
                      resizeMode={FastImage.resizeMode.cover}
                      // resizeMode="cover"
                      style={{
                        width: 120,
                        height: 175,
                        zIndex: 1,
                        marginRight: 5,
                      }}
                      source={{
                        uri: item.image,
                        priority: FastImage.priority.high,
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
              // null
            )}
            {/* Books ends  here */}
          </ScrollView>
        </View>
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {
  getBookById,

  selectedBook,
  getFeaturedImages,
  applyFilters,
  quickNabvigation,
})(BookShelf);
