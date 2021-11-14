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
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import AuthTemplate from '../../containers/AuthTemplate';
import HomeTemplate from '../../containers/HomeTemplate';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import {removeSneakPeak} from '../../actions/AuthActions';
import {getQuiz} from '../../actions/BooksActions';
import {searchGlossary} from '../../actions/GlossaryActions';
import Inputs from '../../components/Inputs';
import {Yellow, Blue, orange, TextInputColor} from '../../common/Theme';
import HomeTabletTemplate from '../../containers/HomeTabletTemplate';
import fonts from '../../common/fonts';
import Sound from 'react-native-sound';
import FastImage from 'react-native-fast-image';
import {Sounds, Images, Metrics} from '../../theme';
import {SoundHelper} from '../../helpers';

const alphabets = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
class Glossary extends Component {
  state = {
    stars: 1,
    lookInside: false,
    heart: true,
  };

  componentDidMount() {
    this.props.searchGlossary('');

    SoundHelper.playSound(Sounds.glossaryOverview);
  }

  playAudio = (audio) => {
    SoundHelper.playSound(audio);
  };

  // soundObject = new Audio.Sound();
  renderData = ({item}) => {
    return (
      <View style={{flex: 1, padding: Metrics.ratio(20)}}>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            borderRadius: Metrics.ratio(30),
            flexDirection: 'row',
            paddingVertical: Metrics.ratio(5),
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginLeft: Metrics.ratio(10),
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={{width: Metrics.ratio(130), height: Metrics.ratio(130)}}
              source={{uri: item.image, priority: FastImage.priority.high}}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: Metrics.ratio(10),
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => this.setState({saved: !this.state.saved})}>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: Metrics.ratio(50),
                    height: Metrics.ratio(50),
                    margin: Metrics.ratio(5),
                  }}
                  source={
                    this.state.saved ? Images.heartFull : Images.heartEmpty
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.playAudio(file)}>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: Metrics.ratio(50),
                    height: Metrics.ratio(50),
                    margin: Metrics.ratio(5),
                  }}
                  source={Images.sound}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginHorizontal: Metrics.ratio(10),
            }}>
            <Text
              style={{
                fontFamily: fonts.CARTERONE,
                color: Yellow,
                fontSize: 20,
                textTransform: 'uppercase',
              }}>
              {item.word}{' '}
            </Text>

            <Text
              numberOfLines={5}
              style={{
                fontFamily: fonts.GOTHAM_LIGHT,
                color: 'black',
                fontSize: 14,
                width: '25%',
              }}>
              {item.meaning}{' '}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  _renderItem = ({item}) => {
    return (
      <View style={{borderRightColor: '#333', borderRightWidth: 1}}>
        <TouchableOpacity
          onPress={() => this.props.searchGlossary(item)}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: 'brown',
          }}>
          <Text
            style={{
              backgroundColor: '#D15202',
              fontFamily: fonts.CARTERONE,
              color: 'white',
              fontSize: 22,
              paddingHorizontal: Metrics.ratio(20),
              textTransform: 'uppercase',
            }}>
            {item}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  RunAudio = async () => {
    SoundHelper.playSound('https://waar.ae/kidzlim/mediafiles/glossary/1.mp3');
  };

  render() {
    return (
      <HomeTemplate
        renderUser={true}
        navigation={this.props.navigation}
        home
        back>
        <SafeAreaView style={{width: '100%', flex: 1}}>
          <ImageBackground
            style={{width: '100%', flex: 1}}
            source={Images.asset127}>
            <View
              style={{
                flex: 0.2,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: Metrics.ratio(30),
                backgroundColor: '#D15202',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.props.searchGlossary(this.state.word)}
                  style={{
                    width: '18%',
                    height: Metrics.ratio(45) * this.props.auth.size,
                    backgroundColor: TextInputColor,
                    marginLeft: Metrics.ratio(20),
                    borderTopLeftRadius: Metrics.ratio(100),
                    borderBottomLeftRadius: Metrics.ratio(100),
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20,
                  }}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      width: Metrics.ratio(30),
                      height: Metrics.ratio(30),
                    }}
                    source={Images.asset39}
                  />
                </TouchableOpacity>
                <Inputs
                  marginLeft={Metrics.ratio(-20)}
                  width={'70%'}
                  value={this.state.word}
                  changeText={(val) => this.setState({word: val})}
                  placeholder="Search Glossary"
                />
              </View>
              <View style={{flex: 0.6}}>
                <FlatList
                  data={alphabets}
                  keyExtractor={(item, index) => index}
                  horizontal={true}
                  renderItem={this._renderItem}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            <View style={{flex: 1}}>
              <FlatList
                data={this.props.books.letterGlossary}
                keyExtractor={(item, index) => index}
                renderItem={this.renderData}
              />
            </View>
          </ImageBackground>
        </SafeAreaView>
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {
  getQuiz,
  removeSneakPeak,

  searchGlossary,
})(Glossary);
