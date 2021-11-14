import React, {Component} from 'react';
import {
  Text,
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
import {getFeaturedImages, getRewards} from '../../actions/BooksActions';
import {Yellow, Blue} from '../../common/Theme';
import HomeTabletTemplate from '../../containers/HomeTabletTemplate';
import fonts from '../../common/fonts';
import Sound from 'react-native-sound';
import FastImage from 'react-native-fast-image';
import {Metrics} from '../../theme';

import {Images, Sounds} from '../../theme';
import {SoundHelper, DataHelper} from '../../helpers';

class RewardsOverview extends Component {
  componentDidMount() {
    // Audio.requestPermissionsAsync();
    // this.sound = new Sound(Sounds.mainSound, (error) => {
    //   if (error) {
    //   } else {
    //     this.sound.play();
    //   }
    // });
    SoundHelper.playSound(Sounds.mainSound);

    if (DataHelper.isChildLoggedIn()) {
      this.props.getRewards(DataHelper.getUserObject().id);
    }
  }

  renderScrollView = () => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={{
          width: Dimensions.get('window').width,
          flex: 1,
        }}>
        <View
          style={{
            width: Dimensions.get('window').width,
            flex: 1,
          }}>
          <FastImage
            style={{
              width: Dimensions.get('window').width,
              flex: 1,

              // position: "absolute",
              //  resizeMode: "cover",
            }}
            resizeMode={FastImage.resizeMode.cover}
            //   resizeMode="contain"
            source={Images.gtjOverview}
          />
          <View
            style={{
              width: '100%',
              position: 'absolute',
              alignItems: 'center',
              height: '100%',
              paddingBottom: 30,
              paddingTop: 55,
            }}>
            <View
              style={{
                width: '100%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <FastImage
                //  resizeMode="contain"
                resizeMode={FastImage.resizeMode.contain}
                style={{width: 300, height: 200}}
                source={Images.gtjLogo}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 100,
                backgroundColor: Yellow,
                borderStyle: 'solid',
                borderWidth: 3,
                borderColor: Blue,
                justifyContent: 'center',
                width: '34%',
                height: '7%',
              }}
              onPress={() => {
                if (this.props.auth.sneakpeak === false) {
                  this.sound.play();
                  this.props.navigation.navigate('RewardsCategory');
                } else {
                  this.sound.play();
                  this.props.navigation.navigate('RewardsPage', {
                    childid: '2',
                  });
                }
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 8,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    // fontWeight: "700",
                    color: 'white',
                    textTransform: 'uppercase',
                    fontFamily: fonts.CARTERONE,
                    marginLeft: 20,
                  }}>
                  Explore
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 60,
                  flex: 2,
                }}>
                <FastImage
                  style={{
                    width: 60,
                    height: 60,
                  }}
                  source={Images.asset18}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  renderTopMessage = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 1,
          marginTop: Metrics.ratio(30),
          width: '90%',
          padding: Metrics.ratio(5),
          backgroundColor: Yellow,
          borderRadius: Metrics.ratio(60),
        }}>
        <Text
          style={{
            fontSize: 14,
            color: 'white',
            // fontWeight: "bold",
            textAlign: 'center',
            fontFamily: fonts.CARTERONE,
            lineHeight: Metrics.ratio(17),
            marginTop: Metrics.ratio(5),
          }}>
          CHOOSE ANY SECTION BELOW TO BEGIN {'\n'} YOUR KIDZLIM EXPERIENCE!
        </Text>
      </View>
    );
  };

  renderLoader = () => {
    return (
      <View
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color={Yellow} />
      </View>
    );
  };

  render() {
    return (
      <HomeTemplate renderUser={true}>
        <View
          style={{width: Metrics.screenWidth, alignItems: 'center', flex: 1}}>
          {this.renderTopMessage()}
          {this.renderScrollView()}
        </View>
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {
  getFeaturedImages,
  getRewards,
})(RewardsOverview);
