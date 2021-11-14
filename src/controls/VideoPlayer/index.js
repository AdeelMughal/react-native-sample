// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TouchableWithoutFeedback,
//   Image,
// } from 'react-native';
// import Video from 'react-native-video';
// import ProgressBar from 'react-native-progress/Bar';
// import {Metrics, Images} from '../../theme';
// import utils from '../../util';
// import styles from './styles';

// const VideoPlayer = ({item}) => {
//   const [paused, setPaused] = React.useState(true);
//   const [progress, setProgress] = React.useState(0);
//   const [duration, setDuration] = React.useState(0);
//   const player = React.useRef(null);

//   const handleLoad = (meta) => {
//     setDuration(meta.duration);
//   };
//   const handleProgress = (progress) => {
//     setProgress(progress.currentTime / duration);
//   };

//   const handleEnd = () => {
//     setPaused(true);
//     setProgress(0);
//     setDuration(0);
//   };
//   const handleMainButtonTouch = () => {
//     if (progress >= 1) {
//       player.seek(0);
//     }
//     setPaused(!paused);
//   };
//   const handleProgressPress = (e) => {
//     const position = e.nativeEvent.locationX;
//     const progress = (position / 250) * duration;
//     player.seek(progress);
//   };
//   return (
//     <View style={styles.container} key={item}>
//       <Video
//         paused={paused}
//         source={{uri: item.video}}
//         style={styles.video}
//         resizeMode="contain"
//         onLoad={handleLoad}
//         onProgress={handleProgress}
//         onEnd={handleEnd}
//         ref={player}
//       />
//       <View style={styles.controls}>
//         <TouchableWithoutFeedback onPress={handleProgressPress}>
//           <ProgressBar
//             progress={progress}
//             color="white"
//             unfilledColor="rgba(255,255,255,0.4)"
//             filed
//             borderColor="#FFF"
//             width={Metrics.moderateRatio(250)}
//             height={Metrics.moderateRatio(20)}
//           />
//         </TouchableWithoutFeedback>
//         <Text style={styles.duration}>
//           {utils.secondsToTime(Math.floor(progress * duration))}
//         </Text>
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableWithoutFeedback onPress={handleMainButtonTouch}>
//           <Image
//             source={!paused ? Images.pauseIcon : Images.playIcon}
//             style={styles.btnImage}
//           />
//         </TouchableWithoutFeedback>
//       </View>
//     </View>
//   );
// };

// export default VideoPlayer;

// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/

// import React in our code
import React, {useState, useRef, useEffect} from 'react';

// import all the components we are going to use
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

//Import React Native Video to play video
import Video from 'react-native-video';

//Media Controls to control Play/Pause/Seek and full screen
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {Metrics} from '../../theme';

const VideoPlayer = ({item, onVideoEnd}) => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

  useEffect(() => {
    onReplay();
  }, [item]);

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => {
    if (onVideoEnd) {
      onVideoEnd();
    }

    return setPlayerState(PLAYER_STATES.ENDED);
  };

  const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = (currentTime) => setCurrentTime(currentTime);

  return (
    <View style={{flex: 1}}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{
          uri: item.video,
        }}
        style={styles.mediaPlayer}
        volume={10}
      />
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={renderToolbar()}
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: Metrics.moderateRatio(30),
    backgroundColor: 'white',
    padding: Metrics.moderateRatio(10),
    borderRadius: Metrics.moderateRatio(5),
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});
