// @flow
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, ScrollView, Image} from 'react-native';

import styles from './styles';

import {ButtonView, Text} from '../../components';
import {areEqual} from '../../util/commonUtils';
import {Metrics, Colors, Fonts, Images} from '../../theme';

import {getBooksByCatId} from '../../actions/BooksActions';
import {MapSateToProps} from '../../common/MapDisptacher';

import {BookItem, BookmarkItem} from '../../controls';

const BookList = React.memo((props) => {
  const {
    data,
    categoryId,
    showViewAll,
    showCategory,
    showBookmark,
    showHeart,
    showFavorite,
    route,
    dataFor,
    onPress,
    onFavoriteTapped,
    cellMode,
    ...rest
  } = props;

  useEffect(() => {
    if (categoryId) {
      props.getBooksByCatId(categoryId);
    }
  }, []);

  const renderItem = (item, index) => {
    if (cellMode === 'book') {
      return (
        <BookItem
          {...rest}
          item={item}
          index={index}
          showAge={true}
          showCategory={showCategory}
          showBookmark={showBookmark}
          showHeart={showHeart}
          showFavorite={showFavorite}
          route={route}
          dataFor={dataFor}
          onPress={onPress}
          onFavoriteTapped={onFavoriteTapped}
        />
      );
    } else {
      return (
        <BookmarkItem
          {...rest}
          item={item}
          index={index}
          route={route}
          onPress={onPress}
        />
      );
    }
  };

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.scrollview}
      showsHorizontalScrollIndicator={false}>
      {data && data.length > 0 && data.map(renderItem)}

      {showViewAll && (
        <ButtonView style={styles.nextBtn}>
          <Image
            resizeMode={'contain'}
            style={styles.image}
            source={Images.playIcon}
          />
          <Text color={Colors.Blue}>View all</Text>
        </ButtonView>
      )}
    </ScrollView>
  );
}, areEqual);

BookList.propTypes = {
  data: PropTypes.array,
  categoryId: PropTypes.number,
  showViewAll: PropTypes.bool,
  showCategory: PropTypes.bool,
  showBookmark: PropTypes.bool,
  showFavorite: PropTypes.bool,
  showHeart: PropTypes.bool,
  route: PropTypes.string,
  dataFor: PropTypes.string,
  onPress: PropTypes.func,
  onFavoriteTapped: PropTypes.func,
  cellMode: PropTypes.oneOf[('book', 'bookmark')],
  isRelatedBooks: PropTypes.bool,
};

BookList.defaultProps = {
  data: [],
  categoryId: undefined,
  showViewAll: false,
  showCategory: false,
  showBookmark: false,
  showHeart: false,
  showFavorite: false,
  route: 'BookDetails',
  dataFor: undefined,
  onPress: () => {},
  onFavoriteTapped: () => {},
  cellMode: 'book',
  isRelatedBooks: false,
};

const actions = {getBooksByCatId};

export default connect(MapSateToProps, actions)(BookList);
