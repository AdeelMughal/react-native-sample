import React, {Component} from 'react';
import {
  Text as RNText,
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackBase,
  Image,
} from 'react-native';
import Sound from 'react-native-sound';
// import VideoPlayer from 'react-native-video-player';
import {BaseExclaimModal, VideoModal, VideoPlayer} from '../../controls';
import {ButtonView, Text} from '../../components';
import Video from 'react-native-video';
import {connect} from 'react-redux';
import {removeSneakPeak} from '../../actions/AuthActions';
import {getAllVideos} from '../../actions/BooksActions';
import {MapSateToProps} from '../../common/MapDisptacher';
import HomeTemplate from '../../containers/HomeTemplate';
import ProgressBar from 'react-native-progress/Bar';
import Orientation from 'react-native-orientation-locker';
import {DataHelper} from '../../helpers';

import {Images, Metrics} from '../../theme';

const {width} = Dimensions.get('window');
const height = width * Metrics.moderateRatio(0.5625);

class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isVideoModal: false,
      modalData: {},
      restrictModal: false,
      currentVideoIndex: -1,
      isCurrentlyPlaying: false,
    };
  }
  componentDidMount() {
    this.props.getAllVideos();
  }

  onBuffer = (e) => {};

  videoError = (e) => {};

  renderData = ({item, index}) => {
    return (
      <View style={styles.container}>
        <View style={styles.thumbnail}>
          <Image source={{uri: item.thumbnail}} style={styles.thumbnailImage} />
        </View>
        <View style={styles.overlay}>
          <ButtonView
            style={styles.Btn}
            onPress={() => {
              if (this.props.auth.sneakpeak) {
                this.setState({restrictModal: true});
              } else {
                this.setState(
                  {
                    currentVideoIndex: index,
                    isCurrentlyPlaying: true,
                    modalData: item,
                    isVideoModal: true,
                  },
                  () => {
                    Orientation.lockToLandscapeLeft();
                  },
                );
              }
            }}>
            <Image source={Images.playIcon} style={styles.overlayBtn} />
          </ButtonView>
        </View>
      </View>
    );
  };

  initialLayout = {width: Dimensions.get('window').width};

  handleVideoEnded = () => {
    const {currentVideoIndex, isCurrentlyPlaying} = this.state;
    const videoCount = this.props.books?.videos?.length;

    if (
      DataHelper.getAutoPlayMode() &&
      videoCount &&
      currentVideoIndex > -1 &&
      isCurrentlyPlaying
    ) {
      let nextVideoIndex = currentVideoIndex + 1;

      if (nextVideoIndex >= videoCount) {
        nextVideoIndex = 0;
      }

      const nextVideo = this.props.books?.videos[nextVideoIndex];

      this.setState({currentVideoIndex: nextVideoIndex, modalData: nextVideo});
    }
  };

  render() {
    return (
      <HomeTemplate renderUser={true} isSwitch={true} switchText={'AUTO PLAY'}>
        <View style={{flex: 1}}>
          <ImageBackground
            style={{width: '100%', flex: 1}}
            source={Images.asset124}>
            <View style={{flex: 1}}>
              <FlatList
                keyExtractor={(item, index) => index}
                data={this.props.books.videos}
                renderItem={this.renderData}
              />
            </View>
          </ImageBackground>
        </View>
        <VideoModal
          doShowModal={this.state.isVideoModal}
          data={this.state.modalData}
          onCurrentVideoEnded={this.handleVideoEnded}
          onClose={() => {
            this.setState(
              {isCurrentlyPlaying: false, isVideoModal: false},
              () => {
                Orientation.lockToPortrait();
              },
            );
          }}
        />
        <BaseExclaimModal
          doShowModal={this.state.restrictModal}
          navigation={this.props.navigation}
          onClose={() => {
            this.setState({restrictModal: false});
          }}
          text1={'MEMBERS AREA'}
          text2={'Not a member yet? Join Now!'}
          onSignupTap={() => {
            this.setState({modal: false}, () => {
              this.props.removeSneakPeak();
            });
          }}
        />
      </HomeTemplate>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  thumbnail: {width: '100%', height},
  thumbnailImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(255,255,255,0.4)',
  },
  overlayBtn: {
    width: Metrics.moderateRatio(60),
    height: Metrics.moderateRatio(60),
  },
  Btn: {
    borderWidth: Metrics.moderateRatio(3),
    borderColor: 'white',
    borderRadius: Metrics.moderateRatio(50),
  },
});

export default connect(MapSateToProps, {
  getAllVideos,
  removeSneakPeak,
})(Videos);
