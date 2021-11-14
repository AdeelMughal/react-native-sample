import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import HomeTemplate from '../../../containers/HomeTemplate';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {Images, Colors, Metrics} from '../../../theme';
import {Inputs, Text, Separator, ButtonView} from '../../../components';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styles from './styles';
import CategoryItem from '../../../controls/CategoryItem';
import BookItem from '../../../controls/BookItem';
import GlossaryList from '../../../controls/GlossaryList';
import {
  EmptyBookmark,
  EmptyFavorite,
  Heading,
  BookList,
  SearchView,
} from '../../../controls';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {isEmpty} from 'lodash';
import CategoryList from '../CategoryList';
import {
  getFavoriteBooks,
  getBookmarkBooks,
  removeFavoriteBook,
  bookRemoveFromFavsLocal,
  deleteBookmark,
  removeBookmarkLocal,
} from '../../../actions/BooksActions';
import {searchBook} from '../../../actions/SearchBookActions';
import {DataHelper} from '../../../helpers';
import {getBookDetails} from '../../../actions/BookDetailsActions';
import commonUtils from '../../../util/commonUtils';

const ExploreScreen = (props) => {
  const tabButtons = [
    {
      name: 'FAVOURITES',
      title: 'MY FAVOURITES',
      bg: Colors.orange,
      onPress: () => toggleViews('FAVOURITES'),
    },
    {
      name: 'BOOKMARKS',
      title: 'MY BOOKMARKS',
      bg: Colors.Yellow,
      onPress: () => toggleViews('BOOKMARKS'),
    },
  ];

  const [search, setSearch] = useState('');

  const [currentView, setCurrentView] = useState('CategoryList');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [bookMarkBook, setBookMarkBook] = useState(props.bookDetails);
  const [selectedBookmark, setSelectedBookmark] = useState(undefined);

  useEffect(() => {
    const payload = {
      childid: props.auth?.user?.id,
    };

    if (search && search.length > 0) {
      setCurrentView('SEARCH');

      props.searchBook(search);
    } else if (isFavorite) {
      setCurrentView('FAVOURITES');

      props.getFavoriteBooks(payload);
    } else if (isBookmark) {
      setCurrentView('BOOKMARKS');

      props.getBookmarkBooks(payload);
    } else {
      setCurrentView('CategoryList');
    }
  }, [isFavorite, isBookmark, search]);

  useEffect(() => {
    if (
      !props.bookDetails.isLoading &&
      props.bookDetails.data &&
      props.bookDetails.data.catid
    ) {
      setBookMarkBook(props.bookDetails);
    }
  }, [props.bookDetails]);

  useEffect(() => {
    if (bookMarkBook.data && bookMarkBook.data.catid && selectedBookmark) {
      const bookLikeObject = commonUtils.getBookLikeObject(bookMarkBook.data);

      const bookmarkedPageId = selectedBookmark?.item?.pageid;

      const bookmarkPageIndexInBook = bookLikeObject?.pages?.findIndex(
        (thisEl) => thisEl.pageid === bookmarkedPageId,
      );

      props.navigation.navigate('ReadBook', {
        bookId: bookLikeObject.id,
        itemData: bookLikeObject,
        type: 'READ TO ME',
        pageNumber: bookmarkPageIndexInBook ? bookmarkPageIndexInBook + 1 : 1,
      });
    }
  }, [bookMarkBook.data]);

  useEffect(() => {
    if (selectedBookmark?.item?.bookid) {
      props.getBookDetails(selectedBookmark?.item?.bookid);
    }
  }, [selectedBookmark]);

  const toggleViews = (menuTapped) => {
    if (menuTapped === 'FAVOURITES') {
      setIsFavorite(!isFavorite);
      setIsBookmark(false);
    } else if (menuTapped === 'BOOKMARKS') {
      setIsFavorite(false);
      setIsBookmark(!isBookmark);
    }
  };

  const navigate = (
    routeName,
    data = {},
    bookCollection = [],
    selectedIndex,
  ) => {
    props.navigation.navigate(routeName, {
      data,
      bookCollection,
      selectedIndex,
    });
  };

  const Favourites = () => {
    const showFavoriteView =
      !isEmpty(props.books.favourites) && !props.auth.sneakpeak;

    return (
      <ScrollView style={{flex: 1}}>
        {showFavoriteView && (
          <>
            <View style={styles.heading}>
              <Text color={Colors.Blue}>BOOKS</Text>
            </View>
            <BookList
              showFavorite
              showCategory
              data={props.books.favourites}
              onPress={(route, data, index) => {
                navigate(route, data, props.books.favourites, index);
              }}
              onFavoriteTapped={(bookItem) => {
                if (DataHelper.isBookFavorite(bookItem)) {
                  props.removeFavoriteBook({
                    childid: DataHelper.getUserObject().id,
                    bookid: bookItem.id,
                  });

                  props.bookRemoveFromFavsLocal(bookItem);
                }
              }}
            />
            <Separator styles={styles.separator} />
          </>
        )}

        {!showFavoriteView && <EmptyFavorite />}

        {props.glossary.favorites && props.glossary.favorites.length > 0 && (
          <View style={styles.pv20}>
            <View style={styles.heading}>
              <Text color={Colors.Blue}>GLOSSARY</Text>
            </View>
            <GlossaryList
              data={props.glossary.favorites}
              customStyle={{
                backgroundColor: 'transparent',
              }}
              onPress={(selectedGlossary) => {
                props.navigation.navigate('GlossaryScreen');
              }}
            />
          </View>
        )}
      </ScrollView>
    );
  };

  const Bookmarks = () => {
    if (!isEmpty(props.books.bookmarks) && !props.auth.sneakpeak) {
      return (
        <BookList
          cellMode={'bookmark'}
          showCategory
          showBookmark
          data={props.books.bookmarks}
          onRemoveBookmarkTapped={(bookmarkObject) => {
            props.deleteBookmark(bookmarkObject.id);
            props.removeBookmarkLocal(bookmarkObject);
          }}
          onPress={(route, data, index) => {
            if (data?.item?.bookid) {
              setSelectedBookmark(data);
            }
          }}
        />
      );
    } else {
      return <EmptyBookmark />;
    }
  };

  const renderSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.subContainer}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.searchIcon}
            source={Images.asset39}
          />
          <Inputs
            value={search}
            styles={styles.input}
            changeText={(val) => setSearch(val)}
            placeholder="Search Books"
          />
        </View>
      </View>
    );
  };

  const renderButtons = () => (
    <View style={{flexDirection: 'row'}}>
      {tabButtons.map((button, index) => (
        <>
          <ButtonView
            onPress={button.onPress}
            style={{
              width: Metrics.screenWidth / 2,

              height: Metrics.ratio(44),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                button.name === currentView ? Colors.Yellow : Colors.orange,
            }}>
            <Text size="xxSmall" color={Colors.white}>
              {button.title}
            </Text>
          </ButtonView>
          {index === 0 && (
            <View
              style={{
                width: Metrics.hairLineWidth,
                marginVertical: Metrics.smallMargin,
                backgroundColor: 'white',
              }}></View>
          )}
        </>
      ))}
    </View>
  );

  const renderViews = () => {
    if (currentView === 'CategoryList')
      return <CategoryList navigation={props.navigation} />;
    else if (currentView === 'FAVOURITES')
      return <Favourites navigation={props.navigation} />;
    else if (currentView === 'BOOKMARKS')
      return <Bookmarks navigation={props.navigation} />;
    else if (currentView === 'SEARCH')
      return (
        <SearchView
          data={props.searchBooks.data}
          onNavigate={(route, data, index) => {
            navigate(route, data, props.searchBooks.data, index);
          }}
        />
      );
  };

  return (
    <HomeTemplate
      renderUser={true}
      navigation={props.navigation}
      backgroundColor="white">
      <ImageBackground
        style={{width: '100%', flex: 1}}
        source={Images.asset122}>
        {renderSearchBar()}

        <View style={{flex: 1}}>
          {renderButtons()}
          {renderViews()}
        </View>
      </ImageBackground>
    </HomeTemplate>
  );
};

const actions = {
  getFavoriteBooks,
  getBookmarkBooks,
  removeFavoriteBook,
  bookRemoveFromFavsLocal,
  searchBook,
  getBookDetails,
  deleteBookmark,
  removeBookmarkLocal,
};

export default connect(MapSateToProps, actions)(ExploreScreen);
