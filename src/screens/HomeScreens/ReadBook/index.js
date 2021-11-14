import React, {Component, useEffect, useState, useRef} from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {
  ScrollView as GestureHandlerScrollView,
  FlatList,
} from 'react-native-gesture-handler';

import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import {connect} from 'react-redux';
import HomeTemplate from '../../../containers/HomeTemplate';
import styles from './styles';
import {Text, ActivityLoader, FastImageBackground} from '../../../components';

import {Images, Metrics, Colors, Sounds} from '../../../theme';
import {MapSateToProps} from '../../../common/MapDisptacher';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import {PageProgress, ThemedYellowButton} from '../../../controls';
import {useNavigation} from '@react-navigation/native';
import {DataHelper, SoundHelper} from '../../../helpers';
import {
  getBookInsideById,
  addBookStat,
  addBookmarkBook,
} from '../../../actions/BooksActions';
import utils from '../../../util';

let swipeTimer;
let readTimer;

const ReadBook = (props) => {
  const {type, bookId, itemData} = props.route.params;
  const [index, setIndex] = useState(0);
  let [readTime, setReadTime] = useState(0);
  const [pageNumber, setPageNumber] = useState(
    props.route.params?.pageNumber ? props.route.params?.pageNumber : 1,
  );
  const [currentPage, setCurrentPage] = useState(undefined);

  const [playState, setPlayState] = useState('stopped'); //stopped, playing, paused
  const [pagesCollection, setPagesCollection] = useState([]);
  const [isAudioBook, setIsAudioBook] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isBookReadSoundEnabled, setIsBookReadSoundEnabled] = useState(
    props.general.bookReaderSound,
  );

  const navigation = useNavigation();

  const carouselRef = useRef(null);

  useEffect(() => {
    activateKeepAwake();

    playSound(Sounds.bookOpened);
    props.getBookInsideById(bookId);
    invokeOnBookOpen();

    if (pageNumber > 1) {
      setTimeout(() => {
        carouselRef.current.snapToItem(pageNumber - 1, true);
      }, 800);
    }

    return () => {
      onBookReadLeft();
    };
  }, []);

  useEffect(() => {
    if (props.books?.pages && props.books?.pages.length > 0) {
      setPagesCollection(props.books?.pages);
    }
  }, [props.books?.pages]);

  useEffect(() => {
    // onPause();
    setIsBookReadSoundEnabled(props.general.bookReaderSound);
  }, [props.general.bookReaderSound]);

  useEffect(() => {
    onPause();
  }, [isBookReadSoundEnabled]);

  useEffect(() => {
    if (pagesCollection && pagesCollection.length > 0) {
      const pSound = DataHelper.getPageSound(pagesCollection[0].pageid);

      if (pSound) {
        setIsAudioBook(true);
      }
    }
  }, [pagesCollection]);

  useEffect(() => {
    if (playState && (playState === 'paused' || playState === 'stopped')) {
      setIsAudioPlaying(false);
      SoundHelper.stopSound();
    } else if (props.general.bookReaderSound) {
      playSoundForCurrentPage();
    }
  }, [playState]);

  useEffect(() => {
    if (
      isAudioBook &&
      props.general.bookReaderSound &&
      !isAudioPlaying &&
      currentPage &&
      playState === 'playing'
    ) {
      commonPlaybackFunct();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (
      currentPage &&
      isAudioBook &&
      props.general.bookReaderSound &&
      playState === 'playing'
    ) {
      playSoundForCurrentPage();
    }
  }, [currentPage]);

  playSoundForCurrentPage = () => {
    const pSound = DataHelper.getPageSound(currentPage.pageid);

    if (pSound) {
      setIsAudioPlaying(true);
      SoundHelper.playSoundUri(
        pSound,
        () => {
          setIsAudioPlaying(false);
        },
        1,
      );
    }
  };

  const invokeOnBookOpen = () => {
    setTimer(); //start timer

    let childid = DataHelper.getUserObject()?.id;
    DataHelper.onBookOpen({bookid: bookId, readcount: 1, childid});
  };

  const setTimer = () => {
    readTimer = setInterval(() => {
      let t = readTime++;
      setReadTime(t);
    }, 1000);
  };

  const commonPlaybackFunct = () => {
    if (pageNumber != props.books.pages?.length) {
      onChangeSlide(pageNumber + 1);
    } else {
      onBookFinish();
      SoundHelper.stopSound();
      playSound(Sounds.bookEnd);
      navigation.navigate('BookFinished', {bookObject: itemData});
      resetSlider();
    }
  };

  const onChangeSlide = (value) => {
    setPageNumber(value);
    setCurrentPage(props?.books?.pages[value - 1]);
    handleIndex(value - 1);
  };

  const handleIndex = (index) => {
    setTimeout(() => {
      snapToIndex(index);
    }, 250);
  };

  const snapToIndex = (index) => {
    if (carouselRef && carouselRef.current) {
      carouselRef.current.snapToItem(index, true, true);
    }
  };

  const resetSlider = () => {
    clearTimeout(swipeTimer);

    setPlayState('stopped');
    snapToIndex(0);
    setPageNumber(1);
  };

  const onBookFinish = () => {
    if (DataHelper.isChildLoggedIn()) {
      onBookReadLeft();

      let childId = DataHelper.getUserObject()?.id;
      let data = {
        bookid: bookId,
        childid: childId,
      };
      DataHelper.onBookFinish(data);
    }
  };

  const onBookReadLeft = () => {
    deactivateKeepAwake();

    SoundHelper.stopSound();

    clearInterval(readTimer);

    if (DataHelper.isChildLoggedIn()) {
      let data = {
        bookid: bookId,
        childid: DataHelper.getUserObject()?.id,
        pagesflippedcount: pageNumber,
        duration: readTime,
      };
      props.addBookStat(data);
    }
  };

  const onPlaySlideshow = () => {
    setPlayState('playing');

    setCurrentPage(props.books?.pages[pageNumber - 1]);

    if (!isAudioBook || !props.general.bookReaderSound) {
      swipeTimer = setInterval(() => {
        commonPlaybackFunct();
      }, 3000);
    }
  };

  const onPause = () => {
    setPlayState('paused');
    clearTimeout(swipeTimer);
  };

  const playSound = (sound) => {
    SoundHelper.playSound(sound);
  };

  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
        }}
        key={index}>
        <FastImageBackground
          source={{uri: item.image, priority: FastImage.priority.high}}
          containerStyle={{
            flex: 1,
            width: Metrics.screenWidth,
          }}
          resizeMode="stretch"
        />
      </View>
    );
  };

  const {general} = props;

  return (
    <HomeTemplate
      onStartoverTapped={() => {
        resetSlider();
      }}
      onBookmarkTapped={() => {
        const pageid = currentPage
          ? currentPage.pageid
          : pagesCollection[pageNumber - 1].pageid;

        props.addBookmarkBook({
          pageid: pageid,
          childid: DataHelper.getUserObject()?.id,
          bookid: bookId,
        });
      }}
      settings={true}
      renderUser={false}
      backgroundColor="white"
      back>
      <View style={{flex: 1}}>
        <Carousel
          layout="default"
          layoutCardOffset={9}
          ref={carouselRef}
          data={props?.books?.pages}
          renderItem={_renderItem}
          sliderWidth={Metrics.screenWidth}
          itemWidth={Metrics.screenWidth}
          onSnapToItem={(index) => {
            setIndex(index);
            setPageNumber(index + 1);

            SoundHelper.playSound(Sounds.pageFlip, false, undefined, false);
          }}
          useScrollView={true}
        />
        {props?.books?.pages.length === pageNumber && (
          <ThemedYellowButton
            text={'Tap to exit'}
            style={{
              marginHorizontal: Metrics.baseMargin,
              position: 'absolute',
              top: Metrics.baseMargin,
              right: Metrics.baseMargin,
              height: Metrics.ratio(50),
            }}
            onPress={() => {
              playSound(Sounds.bookEnd);
              navigation.navigate('BookFinished', {bookObject: itemData});
            }}
          />
        )}
        {type == 'READ TO ME' && isBookReadSoundEnabled && (
          <PageProgress
            max={props?.books?.pages?.length}
            min={1}
            pageNumber={pageNumber}
            onChangeSlide={(changedIndex) => {
              onPause();
              onChangeSlide(changedIndex);
            }}
            isPaused={playState === 'paused' || playState === 'stopped'}
            onPaused={onPause}
            onPlay={onPlaySlideshow}
          />
        )}
      </View>
      <ActivityLoader isLoading={general.isBookAudioLoading} />
    </HomeTemplate>
  );
};

const actions = {getBookInsideById, addBookStat, addBookmarkBook};

export default connect(MapSateToProps, actions)(ReadBook);
