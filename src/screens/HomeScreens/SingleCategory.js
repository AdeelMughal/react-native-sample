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
import {getBookById} from '../../actions/BooksActions';
import {Yellow, Blue} from '../../common/Theme';
import HomeTabletTemplate from '../../containers/HomeTabletTemplate';
import Sound from 'react-native-sound';

import fonts from '../../common/fonts';
import FastImage from 'react-native-fast-image';

import {Images, Sounds} from '../../theme';
import {SoundHelper} from '../../helpers';

class SingleCategory extends Component {
  componentDidMount() {
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
              source={{
                uri: this.props.route.params.image,
                priority: FastImage.priority.high,
              }}
            />
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-end',
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
                  // source={{ uri: this.props.route.params.logo,priority: FastImage.priority.high, }}
                  source={{
                    uri:
                      this.props.route.params.info.id !== 8
                        ? this.props.route.params.logo
                        : null,
                  }}
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
                  top: -40,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'white',
                    // fontWeight: "bold",
                    textAlign: 'left',
                    fontFamily: fonts.CARTERONE,
                  }}>
                  {this.props.route.params.otherItems?.text}
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
                    if (this.props.route.params.info.name === 'Glossary') {
                      this.props.navigation.navigate('Glossary', {
                        data: this.props.route.params,
                      });
                    } else {
                      this.props.navigation.navigate('BookShelf', {
                        info: this.props.route.params.info.id,
                        subImage: this.props.route.params.logo,
                      });
                      this.props.getBookById(this.props.route.params.info.id);
                    }
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
                      width: 55,
                      height: 55,
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

export default connect(MapSateToProps, {
  getBookById,
})(SingleCategory);
