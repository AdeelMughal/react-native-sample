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

import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import Inputs from '../../components/Inputs';
import {
  Yellow,
  Blue,
  orange,
  TextInputColor,
  textYellow,
} from '../../common/Theme';
import HomeTabletTemplate from '../../containers/HomeTabletTemplate';
import fonts from '../../common/fonts';

import FastImage from 'react-native-fast-image';
import {SoundHelper} from '../../helpers';
import {Sounds, Images, Metrics} from '../../theme';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: 'First'},
        {key: 'second', title: 'Second'},
      ],
      heart: false,
    };
  }

  FirstRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#ff4081'}]} />
  );

  SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
  );

  renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute,
  });

  _handleIndexChange = (index) => {
    this.setState({index});
  };

  componentDidMount() {
    SoundHelper.playSound(Sounds.glossaryOverview);
  }

  renderGlossary = ({item}) => {
    return (
      <View style={{flex: 1, padding: 5}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15,
            flexDirection: 'row',
            paddingVertical: 8,

            borderRadius: 100,
            backgroundColor: Yellow,
            justifyContent: 'center',
          }}>
          <TouchableOpacity style={{marginRight: 10}}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 40, height: 40}}
              source={Images.heartFull}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: fonts.CARTERONE,
              color: 'white',
              fontSize: 16,
              textTransform: 'uppercase',
              width: 120,
              textAlign: 'left',
            }}>
            {item.word}{' '}
          </Text>
        </View>
      </View>
    );
  };

  renderFavorites = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity style={{alignItems: 'flex-start', top: 60, left: 20}}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 40, height: 40}}
            source={Images.heartFull}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('BookPage', {
              mode: 'read to me',
            });
          }}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={{width: 150, height: 200}}
            source={{uri: item.image, priority: FastImage.priority.high}}
          />
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 30, height: 30, marginHorizontal: 10}}
            source={Images.ocean}
          />
          <Text
            style={{
              fontFamily: fonts.CARTERONE,
              color: 'white',
              fontSize: 11,
              textTransform: 'uppercase',
              width: 120,
              textAlign: 'left',
              lineHeight: 13,
            }}>
            {item.title}{' '}
          </Text>

          {/* <Text numberOfLines={5} style={{ fontFamily: fonts.GOTHAM_LIGHT, color: "black", fontSize: 14, width: "25%" }}>{item.meaning} </Text> */}
        </View>
      </View>
    );
  };

  renderBookmark = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity style={{alignItems: 'flex-start', top: 60, left: 20}}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 40, height: 40}}
            source={Images.cancelBookmark}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('BookPage', {
              mode: 'read to me',
            });
          }}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={{width: 150, height: 200}}
            source={{uri: item.image, priority: FastImage.priority.high}}
          />
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 30, height: 30, marginHorizontal: 10}}
            source={Images.ocean}
          />
          <Text
            style={{
              fontFamily: fonts.CARTERONE,
              color: 'white',
              fontSize: 11,
              textTransform: 'uppercase',
              width: 120,
              textAlign: 'left',
              lineHeight: 13,
            }}>
            {item.title}{' '}
          </Text>

          {/* <Text numberOfLines={5} style={{ fontFamily: fonts.GOTHAM_LIGHT, color: "black", fontSize: 14, width: "25%" }}>{item.meaning} </Text> */}
        </View>
      </View>
    );
  };

  RunAudio = async () => {
    SoundHelper.playSound(Sounds.glossaryOverview);
  };

  initialLayout = {width: Dimensions.get('window').width};

  renderSearchBar = () => {
    return (
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
          //   onPress={() => this.props.searchGlossary(this.state.word)}
          style={{
            width: '18%',
            height: Metrics.ratio(45) * this.props.auth.size,
            backgroundColor: TextInputColor,
            marginLeft: Metrics.ratio(20),
            borderTopLeftRadius: Metrics.ratio(100),
            borderBottomLeftRadius: Metrics.ratio(100),
            borderColor: Yellow,
            borderRightWidth: 0,
            borderWidth: Metrics.ratio(3),
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
          }}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={{width: Metrics.ratio(30), height: Metrics.ratio(30)}}
            source={Images.asset39}
          />
        </TouchableOpacity>
        <Inputs
          marginLeft={Metrics.ratio(-20)}
          width={'70%'}
          borderColor={Yellow}
          //   value={this.state.word}
          changeText={(val) => this.setState({word: val})}
          placeholder="Search Book"
        />
      </View>
    );
  };

  renderBooksSection = () => {
    const {books} = this.props;

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginLeft: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: fonts.CARTERONE,
            color: 'white',
            textTransform: 'uppercase',
            textAlign: 'center',
            fontWeight: 'bold',
            marginHorizontal: 10,
          }}>
          Books
        </Text>

        {books &&
          books.books &&
          books.books.length > 0 &&
          books.books[0].categoryinfo &&
          books.books[0].categoryinfo.bookinfo && (
            <FlatList
              keyExtractor={(item, index) => index}
              data={books.books[0].categoryinfo.bookinfo}
              renderItem={this.renderFavorites}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          )}
      </View>
    );
  };

  renderGlossarySection = () => {
    return (
      <View
        style={{
          flex: 0.7,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginLeft: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: fonts.CARTERONE,
            color: 'white',
            textTransform: 'uppercase',
            textAlign: 'center',
            fontWeight: 'bold',
            marginHorizontal: 10,
          }}>
          Glossary
        </Text>

        <FlatList
          keyExtractor={(item, index) => index}
          data={this.props.books.glossary}
          renderItem={this.renderGlossary}
          horizontal={true}
        />
      </View>
    );
  };

  render() {
    const {books} = this.props;

    return (
      <HomeTemplate renderUser={true}>
        <View style={{flex: 1}}>
          <ImageBackground
            style={{width: '100%', flex: 1}}
            source={Images.asset124}>
            <View
              style={{
                flex: 0.15,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 30,
              }}>
              {this.renderSearchBar()}
            </View>

            {/* For My Favourites */}
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              {this.renderBooksSection()}
              <View
                style={{
                  height: 1,
                  backgroundColor: 'white',
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              {this.renderGlossarySection()}
            </View>
          </ImageBackground>
        </View>
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {
  removeSneakPeak,
})(Explore);
