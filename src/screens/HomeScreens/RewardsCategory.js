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
} from 'react-native';
import AuthTemplate from '../../containers/AuthTemplate';
import HomeTemplate from '../../containers/HomeTemplate';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';

import {Yellow, Blue} from '../../common/Theme';
import HomeTabletTemplate from '../../containers/HomeTabletTemplate';
import Sound from 'react-native-sound';

import fonts from '../../common/fonts';
import FastImage from 'react-native-fast-image';

import {Images, Sounds} from '../../theme';
import {SoundHelper} from '../../helpers';

class RewardsCategory extends Component {
  componentDidMount() {
    // Audio.requestPermissionsAsync();
    // this.sound = new Sound(Sounds.mainSound, (error) => {
    //   if (error) {
    //   } else {
    //     this.sound.play();
    //   }
    // });
    SoundHelper.playSound(Sounds.mainSound);
  }

  render() {
    return (
      <HomeTemplate
        renderUser={true}
        navigation={this.props.navigation}
        back
        home>
        <View style={{width: '100%', flex: 1}}>
          <View
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
                // resizeMode: "cover",
                zIndex: 0,
              }}
              resizeMode={FastImage.resizeMode.cover}
              //   resizeMode="contain"
              source={Images.gtjOverview}
            />
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                position: 'absolute',
                height: '100%',
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  height: '100%',
                  position: 'absolute',
                }}>
                <FastImage
                  // resizeMode="contain"
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: 300, height: 200, marginTop: 20}}
                  source={Images.gtjLogo}
                />
              </View>
              <View
                style={{
                  width: 200,
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  marginLeft: 20,
                  borderRadius: 20,
                  padding: 15,
                  marginTop: 250,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'white',
                    // fontWeight: "bold",
                    textAlign: 'left',
                    fontFamily: fonts.CARTERONE,
                  }}>
                  This section gives your child to learn about the creative arts
                  to live a balanced and disciplined life.
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 100,
                    backgroundColor: Yellow,
                    borderStyle: 'solid',
                    borderWidth: 3,
                    borderColor: Blue,
                    paddingVertical: 0,
                    marginTop: 50,
                    height: 40,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('RewardsPage', {
                      childid: '2',
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      // fontWeight: "700",
                      color: 'white',
                      fontFamily: fonts.CARTERONE,
                    }}>
                    EXPLORE
                  </Text>

                  <FastImage
                    style={{
                      width: 50,
                      height: 50,
                      marginRight: -25,
                    }}
                    source={Images.asset18}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {})(RewardsCategory);
