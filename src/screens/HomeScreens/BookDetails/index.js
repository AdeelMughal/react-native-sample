import {connect} from 'react-redux';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  Image,
  Platform,
  Animated,
  Easing,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import HomeTemplate from '../../../containers/HomeTemplate';
import {Images, Colors, Metrics, Sounds} from '../../../theme';
import {
  ButtonView,
  Separator,
  Text,
  ActivityLoader,
  FastImagePlaceholder,
} from '../../../components';
import fonts from '../../../common/fonts';
import BookControl from '../../../controls/BookControl';

import Sound from 'react-native-sound';
import styles from './styles';
import {
  Heading,
  BookPreviewModal,
  PopupModal,
  BaseExclaimModal,
  BookList,
  HorizontalBooksSlider,
} from '../../../controls';
import BookItem from '../../../controls/BookItem';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {SoundHelper, DataHelper} from '../../../helpers';
import {MapSateToProps} from '../../../common/MapDisptacher';
import utils from '../../../util';
import _ from 'lodash';
import CustomizedPopup from '../../../controls/Modals/CustomizedPopup';
import {
  addFavoriteBook,
  removeFavoriteBook,
  getChildBookStats,
  bookAddToFavsLocal,
  bookRemoveFromFavsLocal,
} from '../../../actions/BooksActions';
import {getRelatedBooks} from '../../../actions/RelatedBookActions';

import {setShowIsChildLoggedInModal} from '../../../actions/generalActions';
import {removeSneakPeak} from '../../../actions/AuthActions';

const ITEM_SIZE =
  Platform.OS === 'ios'
    ? Metrics.screenWidth * 0.8
    : Metrics.screenWidth * 0.74;
const EMPTY_ITEM_SIZE = (Metrics.screenWidth - ITEM_SIZE) / 2;
const ITEM_MARGIN = Metrics.baseMargin;

const BookDetails = (props) => {
  const {
    books,
    auth,
    addFavoriteBook,
    removeFavoriteBook,
    bookAddToFavsLocal,
    bookRemoveFromFavsLocal,
    setShowIsChildLoggedInModal,
    removeSneakPeak,
    route,
    getRelatedBooks,
  } = props;

  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [restrictModal, setRestrictModal] = useState(false);
  const [showFavourites, setFavourites] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const [comingsoonModal, setComingsoonModal] = useState(false);
  const [bookData, setBookData] = useState(route?.params?.bookCollection);
  const [currentIndex, setCurrentIndex] = useState(
    route?.params?.selectedIndex,
  );
  const [relatedBooks, setRelatedBooks] = useState(props.relatedBooks);
  const scrollY = useRef(new Animated.Value(0)).current;

  const bookListRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      //View did appear

      if (
        currentIndex &&
        currentIndex > -1 &&
        bookListRef &&
        bookListRef.current
      ) {
        setTimeout(() => {
          bookListRef.current.onSnap(currentIndex);
          setShowLoader(false);

          var currentBook = bookData[currentIndex];

          getRelatedBooks(currentBook.id);
        }, 1000);
      }
    }, []),
  );

  useEffect(() => {
    if (currentIndex && currentIndex > -1) {
      setShowLoader(true);
    }

    props.getChildBookStats();
    return () => {
      SoundHelper.stopSound();
    };
  }, []);

  useEffect(() => {
    if (
      bookListRef &&
      bookListRef.current &&
      currentIndex &&
      currentIndex > -1
    ) {
      setTimeout(() => {
        bookListRef.current.onSnap(currentIndex);
        setShowLoader(false);
      }, 3000);
    }
  }, [bookListRef]);

  useEffect(() => {
    const currentBook = bookData[currentIndex];

    getRelatedBooks(currentBook.id);
  }, [currentIndex]);

  useEffect(() => {
    setRelatedBooks(props.relatedBooks);
  }, [props.relatedBooks]);

  const playSound = (sound) => {
    typeof sound === 'string'
      ? SoundHelper.playSoundUri(sound)
      : SoundHelper.playSound(sound, false, undefined, true, false, 1);
  };

  const onFavouritePress = (item) => {
    if (DataHelper.isChildLoggedIn()) {
      if (DataHelper.isBookFavorite(item)) {
        removeFavoriteBook({
          childid: DataHelper.getUserObject().id,
          bookid: item.id,
        });

        bookRemoveFromFavsLocal(item);
      } else {
        addFavoriteBook({
          childid: DataHelper.getUserObject().id,
          bookid: item.id,
        });

        bookAddToFavsLocal(item);

        setFavourites(true);

        setTimeout(() => {
          setFavourites(false);
        }, 5000);
      }
    } else {
      setShowIsChildLoggedInModal(true);
    }
  };

  const renderFavBtn = (item) => {
    return (
      <TouchableOpacity
        style={styles.favBtn}
        onPress={() => {
          playSound(Sounds.addbookmarkfavorite);
          onFavouritePress(item);
        }}
        activeOpacity={0.8}>
        <Image
          style={{width: Metrics.ratio(50), height: Metrics.ratio(50)}}
          resizeMode={'contain'}
          source={
            DataHelper.isBookFavorite(item) ? Images.asset67 : Images.asset67_2
          }
        />
      </TouchableOpacity>
    );
  };

  const renderSearchBtn = () => {
    return (
      <TouchableOpacity
        style={styles.searchBtn}
        onPress={() => {
          if (bookData && bookData[currentIndex]) {
            const pagesLookInside = bookData[currentIndex]?.pages?.filter(
              (thisEl) => thisEl.lookinside,
            );

            if (pagesLookInside && pagesLookInside.length > 0) {
              playSound(Sounds.lookInside);
              setVisible(true);
            } else {
              utils.showToast('Preview not available');
            }
          } else {
          }
        }}
        activeOpacity={0.8}>
        <Image
          style={{width: Metrics.ratio(50), height: Metrics.ratio(50)}}
          resizeMode="contain"
          source={Images.asset64}
        />
      </TouchableOpacity>
    );
  };

  const renderBookCard = (item) => {
    return (
      <View style={styles.bookCard}>
        {renderFavBtn(item)}
        <FastImagePlaceholder
          resizeMode={'contain'}
          containerStyle={{
            flex: 1,
            margin: Metrics.smallMargin,
            marginBottom: 0,

            marginTop: Metrics.ratio(20),
          }}
          source={{uri: item?.overeview?.image}}
        />

        {renderSearchBtn()}
      </View>
    );
  };

  const renderDetails = (item) => {
    const categoryData = DataHelper.getCategoryIconForCategoryId(item.catid);

    return (
      <View style={styles.detailContainer}>
        <View style={styles.detailLeft}>
          <FastImage
            style={styles.detailImage}
            resizeMode={FastImage.resizeMode.contain}
            source={{uri: categoryData?.icon}}
          />

          <Text
            style={{textAlign: 'center'}}
            size="xxxxSmall"
            color={Colors.white}>
            {categoryData?.name}
          </Text>
        </View>
        <View style={styles.detailMiddle}>
          <Text style={{textAlign: 'center'}} color="white">
            {item.name}
          </Text>
        </View>
        <View style={styles.detailRight}>
          <FastImage
            style={styles.detailImage}
            resizeMode={FastImage.resizeMode.contain}
            source={Images.child}
          />
          <Text size="xxxxSmall" color={Colors.white}>
            AGE
          </Text>
          <Text size="xxxxSmall" color={Colors.white}>
            {`${item?.overeview?.minage ?? '0'}-${
              item?.overeview?.maxage ?? '0'
            }`}
          </Text>
        </View>
      </View>
    );
  };

  const navigateRoute = (route, data, itemData) => {
    if (auth.sneakpeak) {
      setRestrictModal(true);
    } else if (route === 'ReadBook' && data.itemData.IsPages) {
      navigation.navigate(route, data);
    } else if (route === 'Quizzes' && data.itemData.IsQuiz) {
      navigation.navigate(route, data);
    } else {
      setComingsoonModal(true);
    }
  };

  const renderButtons = (item) => {
    const {IsQuiz} = item;

    return (
      <View style={styles.buttonContainer}>
        <BookControl
          text={'BOOK OVERVIEW'}
          image={Images.asset56}
          image2={Images.sound}
          isMain={true}
          secondBtnPress={() => {
            playSound(item?.overeview?.audio);
          }}
          sound={Sounds.alwahabOverview}
          disabled={true}
        />
        <View style={styles.descContainer}>
          <Text
            numberOfLines={4}
            style={{
              fontSize: Metrics.ratio(13),
              color: 'white',
              textAlign: 'center',
            }}>
            {item?.overeview?.text ?? '-'}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <BookControl
            text={'READ TO ME'}
            image={Images.asset57}
            onPress={navigateRoute}
            route="ReadBook"
            data={item}
          />
          <BookControl
            text={'READ MYSELF'}
            image={Images.asset58}
            onPress={navigateRoute}
            route="ReadBook"
            data={item}
          />
          {IsQuiz === 1 && (
            <BookControl
              text={'TAKE QUIZ'}
              image={Images.asset59}
              onPress={navigateRoute}
              route="Quizzes"
              data={item}
            />
          )}
          {IsQuiz === 0 && <View style={{height: Metrics.ratio(55)}}></View>}
        </View>
      </View>
    );
  };

  const renderRelatedBooks = () => {
    const {data, isLoading} = relatedBooks;

    return (
      <View
        style={{flex: 1, backgroundColor: Colors.Blue}}
        imageStyle={styles.bgImage}
        source={Images.asset8}>
        <Heading
          text="Related Books"
          textSize={18}
          textColor="white"
          customStyles={{
            backgroundColor: 'transparent',
            alignSelf: 'flex-start',
          }}
        />
        {!isLoading && (
          <BookList
            isRelatedBooks
            showCategory
            bookTitleColor={'white'}
            data={relatedBooks?.data}
            onPress={(route, data, index) => {
              props.navigation.push('BookDetails', {
                data: data.item,
                bookCollection: [data.item],
                selectedIndex: 0,
              });
            }}
          />
        )}
        <View
          style={{
            marginHorizontal: Metrics.baseMargin,
            marginVertical: Metrics.baseMargin,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isLoading && <Text color="white">Loading...</Text>}
          {!isLoading && data.length === 0 && (
            <Text color="white">No related books found.</Text>
          )}
        </View>
      </View>
    );
  };

  const renderHorizontalList = () => {
    return (
      <HorizontalBooksSlider
        ref={bookListRef}
        data={bookData}
        renderItem={renderHorizontalListItem}
        onSnapToItem={(index) => {
          setCurrentIndex(index);

          SoundHelper.stopSound();
        }}
      />
    );
  };

  const renderHorizontalListItem = ({item}) => {
    const margin = scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [ITEM_MARGIN, 0],
      extrapolate: 'clamp',
      easing: Easing.linear(),
    });

    if (utils.isPlatformAndroid()) {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollItem}>
          <Animated.View
            style={{
              marginTop: margin,
              marginHorizontal: margin,
              borderRadius: Metrics.ratio(20),
            }}>
            <ImageBackground
              style={{flex: 1, width: null, height: null}}
              imageStyle={styles.bgImage}
              source={Images.asset8}>
              {renderBookCard(item)}
              {renderDetails(item)}
              {renderButtons(item)}
              <Separator styles={styles.separator} />
            </ImageBackground>
          </Animated.View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollItem}>
          <Animated.View
            style={{
              marginTop: margin,
              marginHorizontal: margin,
              borderRadius: Metrics.ratio(20),
            }}>
            <ImageBackground
              style={{flex: 1, width: null, height: null}}
              imageStyle={styles.bgImage}
              source={Images.asset8}>
              {renderBookCard(item)}
              {renderDetails(item)}
              {renderButtons(item)}
              <Separator styles={styles.separator} />
              {renderRelatedBooks()}
            </ImageBackground>
          </Animated.View>
        </ScrollView>
      );
    }
  };

  const renderAndroidView = () => {
    return (
      <ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        {renderHorizontalList()}

        {renderRelatedBooks()}
      </ScrollView>
    );
  };

  const renderiOSView = () => {
    return renderHorizontalList();
  };

  return (
    <HomeTemplate renderUser={true} backgroundColor="white" back>
      {utils.isPlatformAndroid() ? renderAndroidView() : renderiOSView()}

      <BookPreviewModal
        doShowModal={visible}
        data={
          bookData && bookData[currentIndex]
            ? bookData[currentIndex]
            : undefined
        }
        onClose={() => {
          setVisible(false);
        }}
      />
      <PopupModal
        isAdded={true}
        favourite={true}
        bookmark={false}
        doShowModal={showFavourites}
        text={bookData[currentIndex].name}
        onClose={() => {
          setFavourites(false);
        }}
      />
      <BaseExclaimModal
        doShowModal={restrictModal}
        navigation={navigation}
        onClose={() => {
          setRestrictModal(false);
        }}
        text1={'MEMBERS AREA'}
        text2={'Not a member yet? Join Now!'}
        onSignupTap={() => {
          removeSneakPeak();
        }}
      />
      <CustomizedPopup
        type="success"
        onClose={() => {
          setComingsoonModal(false);
        }}
        doShowModal={comingsoonModal}
        msg2="Coming Soon"
        buttons={[
          [
            'OK',
            true,
            () => {
              setComingsoonModal(false);
            },
          ],
        ]}
      />
      <ActivityLoader
        isLoading={showLoader || props.general.isBookAudioLoading}
      />
    </HomeTemplate>
  );
};

const actions = {
  addFavoriteBook,
  removeFavoriteBook,
  bookAddToFavsLocal,
  bookRemoveFromFavsLocal,
  setShowIsChildLoggedInModal,
  removeSneakPeak,
  getChildBookStats,
  getRelatedBooks,
};

export default connect(MapSateToProps, actions)(BookDetails);
