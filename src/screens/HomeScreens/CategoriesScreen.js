import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AuthTemplate from '../../containers/AuthTemplate';
import HomeTemplate from '../../containers/HomeTemplate';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import {getCategories, getFeaturedImages} from '../../actions/BooksActions';
import {Yellow, Blue} from '../../common/Theme';
import HomeTabletTemplate from '../../containers/HomeTabletTemplate';
import fonts from '../../common/fonts';
import Sound from 'react-native-sound';
import FastImage from 'react-native-fast-image';

import {Images, Sounds, Metrics} from '../../theme';
import {Text} from '../../components';
import {SoundHelper} from '../../helpers';

class CategoriesScreen extends Component {
  componentDidMount() {
    // this.sound = new Sound(Sounds.mainSound, (error) => {
    //   if (error) {
    //   } else {
    //     this.sound.play();
    //   }
    // });
    SoundHelper.playSound(Sounds.mainSound);

    this.props.getCategories();
    this.props.getFeaturedImages();
  }

  renderScrollView = () => {
    return (
      <HomeTemplate renderUser={true}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollToOverflowEnabled={this.props.auth.sneakpeak === false}
          horizontal
          ref={(ref) => (this.flatListRef = ref)}
          nContentSizeChange={(width, height) =>
            this.flatListRef.scrollToEnd({animated: false})
          }
          style={{
            width: Dimensions.get('window').width,
            flex: 1,
            zIndex: 0,
          }}>
          {this.props.books.categories.map((item, i) => (
            <View
              key={i}
              style={{
                width: Dimensions.get('window').width,
                flex: 1,
                zIndex: 0,
              }}>
              <FastImage
                style={{
                  width: Dimensions.get('window').width,
                  flex: 1,

                  // position: "absolute",

                  zIndex: 0,
                }}
                resizeMode={FastImage.resizeMode.cover}
                //   resizeMode="contain"
                source={{
                  uri: item.categoryinfo.image,
                  priority: FastImage.priority.high,
                }}
              />
              <View
                style={{
                  width: '100%',
                  position: 'absolute',
                  alignItems: 'center',
                  height: '100%',
                  paddingBottom: Metrics.ratio(30),
                  paddingTop: Metrics.ratio(55),
                }}>
                <View
                  style={{
                    width: '100%',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <FastImage
                    // resizeMode="contain"
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      width: Metrics.ratio(300),
                      height: Metrics.ratio(200),
                    }}
                    // source={{ uri: item.categoryinfo.logo,priority: FastImage.priority.high }}
                    source={{
                      uri:
                        item.categoryinfo.id !== 8
                          ? item.categoryinfo.logo
                          : null,
                    }}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: Metrics.ratio(100),
                    backgroundColor: Yellow,
                    borderStyle: 'solid',
                    borderWidth: Metrics.ratio(3),
                    borderColor: Blue,
                    justifyContent: 'center',
                    width: '50%',
                    height: '9%',
                  }}
                  onPress={() => {
                    this.sound.play();
                    this.props.navigation.navigate('SingleCategory', {
                      image: item.categoryinfo.image,
                      otherItems: item.categoryinfo.categorydetail,
                      info: item.categoryinfo,
                      logo: item.categoryinfo.logo,
                    });
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 9,
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        // fontWeight: "700",
                        color: 'white',
                        textTransform: 'uppercase',
                        marginLeft: Metrics.ratio(15),
                      }}>
                      Explore
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: Metrics.ratio(60),
                      flex: 2,
                    }}>
                    <FastImage
                      style={{
                        width: Metrics.ratio(80),
                        height: Metrics.ratio(80),
                        marginRight: Metrics.ratio(5),
                      }}
                      source={Images.asset18}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </HomeTemplate>
    );
  };

  renderHeaderPop = () => {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          top: Metrics.ratio(90),
          width: '90%',
          padding: Metrics.ratio(5),
          backgroundColor: Yellow,
          borderRadius: Metrics.ratio(60),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            color: 'white',
            // fontWeight: "bold",
            textAlign: 'center',
            lineHeight: Metrics.ratio(17),
            marginTop: Metrics.ratio(5),
          }}>
          CHOOSE ANY SECTION BELOW TO BEGIN {'\n'} YOUR KIDZLIM EXPERIENCE!
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        {this.renderScrollView()}
      </View>
    );
  }
}

export default connect(MapSateToProps, {
  getCategories,
  getFeaturedImages,
})(CategoriesScreen);
