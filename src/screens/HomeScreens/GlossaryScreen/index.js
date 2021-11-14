import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import AuthTemplate from '../../../containers/AuthTemplate';
import HomeTemplate from '../../../containers/HomeTemplate';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {removeSneakPeak} from '../../../actions/AuthActions';
import {getQuiz} from '../../../actions/BooksActions';
import {Text, Inputs, ButtonView} from '../../../components';
import {Yellow, Blue, orange, TextInputColor} from '../../../common/Theme';
import HomeTabletTemplate from '../../../containers/HomeTabletTemplate';
import fonts from '../../../common/fonts';
import Sound from 'react-native-sound';
import FastImage from 'react-native-fast-image';
import {Sounds, Images, Metrics, Colors} from '../../../theme';
import {DataHelper, SoundHelper} from '../../../helpers';
import styles from './styles';
import {
  GlossaryModal,
  ThemedNextButton,
  BaseExclaimModal,
  PopupModal,
  SearchInput,
} from '../../../controls';
import _ from 'lodash';
import util from '../../../util';
import {
  markGlossaryFavorite,
  deleteGlossaryFavorite,
  searchGlossary,
  glossaryAddToFavsLocal,
  glossaryRemoveFromFavsLocal,
} from '../../../actions/GlossaryActions';
import {setShowIsChildLoggedInModal} from '../../../actions/generalActions';

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
class GlossaryScreen extends Component {
  state = {
    heart: true,
    search: '',
    activeIndex: null,
    modalVisible: false,
    modalData: {},
    restrictModal: false,
    mute: false,
    showFavourites: false,
    unmuteId: undefined,
    toggleAlbhabetSearch: false,
  };

  componentDidMount() {
    this.props.searchGlossary('');

    // SoundHelper.playSound(Sounds.glossaryOverview);
  }

  toggleMute = (item) => {
    const {id, audio} = item;
    const isPlaying = id === this.state.unmuteId;

    if (audio && !isPlaying) {
      this.setState({unmuteId: id});
      SoundHelper.playSoundUri(audio);
    } else {
      SoundHelper.stopSound();
      this.setState({unmuteId: false});
    }
  };

  renderData = ({item}) => {
    const isUnMuted = this.state.unmuteId === item.id;

    return (
      <ButtonView
        onPress={() => {
          this.setState({modalData: item, modalVisible: true});
        }}
        style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardSub1}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={styles.cardImage}
              source={{uri: item.image, priority: FastImage.priority.high}}
            />
          </View>
          <View style={styles.cardSub2}>
            <View style={{flex: 0.7}}>
              <Text style={styles.heading}>{item.word} </Text>
              <Text style={styles.meaning}>
                {util.truncateString(item.meaning, 100)}
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({modalData: item}, () => {
                    this.onFavouritePress(item, this.isGlossaryFavorite(item));
                  });
                }}>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.actionBtn}
                  source={
                    this.isGlossaryFavorite(item)
                      ? Images.heartFull
                      : Images.heartEmpty
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleMute(item)}>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.actionBtn}
                  source={isUnMuted ? Images.sound : Images.muteSound}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ButtonView>
    );
  };

  _renderItem = ({item, index}) => {
    const {activeIndex, toggleAlbhabetSearch} = this.state;

    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={[
            styles.itemBtn,
            {
              backgroundColor:
                activeIndex == index && toggleAlbhabetSearch
                  ? Colors.Yellow
                  : '#D15202',
            },
          ]}
          onPress={() => {
            this.onCharPress(item, index);
          }}>
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.subContainer}>
          <ButtonView onPress={() => this.onSearch()}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.searchIcon}
              source={Images.asset39}
            />
          </ButtonView>
          <Inputs
            value={this.state.search}
            styles={styles.input}
            changeText={(val) => {
              this.setState({search: val}, () => {
                if (this.state.search.length > 2) {
                  this.onSearch();
                }
              });
            }}
            placeholder="Search Glossary"
          />
        </View>
      </View>
    );
  };

  onSearch = () => {
    this.props.searchGlossary(this.state.search);
    this.setState({activeIndex: null});
  };

  onCharPress = (item, index) => {
    let newToggleState;

    if (this.state.activeIndex === index) {
      newToggleState = !this.state.toggleAlbhabetSearch;
    } else {
      newToggleState = this.state.toggleAlbhabetSearch;
    }

    this.setState(
      {toggleAlbhabetSearch: newToggleState, activeIndex: index},
      () => {
        if (this.state.toggleAlbhabetSearch) {
          this.props.searchGlossary(item);
        }
      },
    );
  };

  RunAudio = async () => {
    SoundHelper.playSound('https://waar.ae/kidzlim/mediafiles/glossary/1.mp3');
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  onFavouritePress = (glossaryObject, isGlossaryFav) => {
    const {auth} = this.props;

    if (DataHelper.isChildLoggedIn()) {
      if (isGlossaryFav) {
        this.props.deleteGlossaryFavorite({
          childid: auth.user?.id,
          glossaryid: glossaryObject.id,
        });

        this.props.glossaryRemoveFromFavsLocal(glossaryObject);
      } else {
        this.props.markGlossaryFavorite({
          childid: auth.user?.id,
          glossaryid: glossaryObject.id,
        });

        this.props.glossaryAddToFavsLocal(glossaryObject, auth.user?.id);

        this.setState(
          {
            showFavourites: !this.state.showFavourites,
          },
          () => {
            setTimeout(() => {
              this.setState({showFavourites: false});
            }, 2000);
          },
        );
      }
    } else {
      this.props.setShowIsChildLoggedInModal(true);
    }
  };

  isGlossaryFavorite = (glossaryObject) => {
    const {glossary} = this.props;

    const foundIndex = glossary?.favorites?.findIndex(
      (thisEl) => thisEl.glossaryid === glossaryObject.id,
    );

    return foundIndex > -1;
  };

  render() {
    const {books, auth, navigation, glossary} = this.props;
    const {
      modalData,
      unmuteId,
      modalVisible,
      toggleAlbhabetSearch,
      search,
    } = this.state;

    const glossaryList =
      (search && search.length > 0) || toggleAlbhabetSearch
        ? glossary.search
        : glossary.data;

    const isSneakPeak = util.checkSneakPeak(auth.sneakpeak, glossaryList);

    return (
      <HomeTemplate
        backgroundColor="white"
        renderUser={true}
        navigation={this.props.navigation}
        home
        back>
        <SafeAreaView style={styles.scroll}>
          <ImageBackground style={styles.background} source={Images.asset127}>
            <View style={styles.topContainer}>
              <View style={styles.search}>{this.renderSearchBar()}</View>
              <View style={styles.charList}>
                <FlatList
                  style={{flex: 1}}
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
                data={glossaryList}
                keyExtractor={(item, index) => index}
                renderItem={this.renderData}
              />
              {isSneakPeak && (
                <View style={{flex: 1, alignItems: 'center'}}>
                  <ThemedNextButton
                    gradient={Colors.yellowGradient}
                    style={styles.btn}
                    text={'MORE'}
                    iconStyle={styles.iconStyle}
                    textStyle={styles.textStyle}
                    onPress={() => {
                      this.setState({restrictModal: true});
                    }}
                  />
                </View>
              )}
            </View>
          </ImageBackground>
        </SafeAreaView>
        <GlossaryModal
          doShowModal={modalVisible}
          data={modalData}
          onLikePress={(tappedItem) => {
            this.onFavouritePress(
              tappedItem,
              this.isGlossaryFavorite(tappedItem),
            );
          }}
          isLiked={this.isGlossaryFavorite(modalData)}
          onMutePress={() => this.toggleMute(modalData)}
          isMuted={!(modalData.id == unmuteId)}
          onClose={() => {
            this.setModalVisible(false);
            SoundHelper.stopSound();
          }}
        />
        <PopupModal
          isAdded={true}
          favourite={true}
          bookmark={false}
          doShowModal={this.state.showFavourites}
          text={modalData?.word}
          onClose={() => {
            this.setState({showFavourites: false});
          }}
        />
        <BaseExclaimModal
          doShowModal={this.state.restrictModal}
          navigation={navigation}
          onClose={() => {
            this.setState({restrictModal: false});
          }}
          text1={'MEMBERS AREA'}
          text2={'Not a member yet? Join Now!'}
          onSignupTap={() => {
            this.setState({restrictModal: false}, () => {
              this.props.removeSneakPeak();
            });
          }}
        />
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {
  getQuiz,
  removeSneakPeak,

  searchGlossary,

  setShowIsChildLoggedInModal,

  markGlossaryFavorite,
  deleteGlossaryFavorite,

  glossaryAddToFavsLocal,
  glossaryRemoveFromFavsLocal,
})(GlossaryScreen);
