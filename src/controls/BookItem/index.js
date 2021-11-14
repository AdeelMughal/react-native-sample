import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, ButtonView, FastImagePlaceholder} from '../../components';
import {Images, Colors, Metrics} from '../../theme';
import styles from './styles';
import {DataHelper} from '../../helpers';

const BookItem = ({
  item,
  showCategory,
  showAge,
  showHeart,
  showBookmark,
  onPress,
  route,
  dataFor,
  index,
  onFavoriteTapped,
  showFavorite,
  bookTitleColor,
  isRelatedBooks,
}) => {
  renderFavoriteButton = () => {
    if (showFavorite) {
      return (
        <ButtonView
          style={styles.favIconContainer}
          onPress={() => {
            if (onFavoriteTapped) {
              onFavoriteTapped(item);
            }
          }}>
          <Image
            style={styles.favIcon}
            resizeMode="contain"
            source={Images.asset37}
          />
        </ButtonView>
      );
    }

    return null;
  };

  const categoryIcon = DataHelper.getCategoryIconForCategoryId(item.catid)
    ?.icon;

  const bookTitle = item.title || item.name;

  return (
    <ButtonView
      style={styles.container}
      onPress={() => {
        if (onPress) {
          onPress(route, {dataFor, item}, index);
        }
      }}>
      <View style={styles.subContainer1}>
        <View style={styles.titleImage}>
          <FastImagePlaceholder
            containerStyle={{flex: 1}}
            source={
              typeof item.imageUrl == 'number'
                ? item.imageUrl
                : {uri: item.image, priority: FastImage.priority.normal}
            }
          />
          {renderFavoriteButton()}
        </View>

        {showHeart && (
          <Image
            resizeMode={'contain'}
            style={styles.heartFul}
            source={Images.heartFull}
          />
        )}
        {showBookmark && (
          <Image
            resizeMode={'contain'}
            style={styles.showBookmark}
            source={Images.cancelBookmark}
          />
        )}
      </View>
      <View style={styles.subContainer2}>
        <View style={styles.itemLeft}>
          {showCategory && categoryIcon && (
            <Image
              resizeMode="contain"
              style={styles.itemLeftImage}
              source={{uri: categoryIcon}}
            />
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text
            // allowFontScaling
            numberOfLines={1}
            // adjustsFontSizeToFit
            // minimumFontScale={0.01}
            style={styles.titleText}
            size="xxxxSmall"
            color={bookTitleColor}>
            {bookTitle.toUpperCase()}
          </Text>
        </View>
        {showAge ? (
          <View style={styles.itemRight}>
            <Image
              resizeMode="contain"
              style={styles.itemRightImage}
              source={Images.youngChild}
            />
            <Text
              size="xxxxxSmall"
              color={isRelatedBooks ? Colors.white : Colors.orange}
              style={styles.lh10}>
              AGE
            </Text>
            <Text
              size="xxxxxxSmall"
              color={isRelatedBooks ? Colors.white : Colors.orange}
              style={styles.lh10}>
              {`${item?.overeview?.minage ?? '0'}-${
                item?.overeview?.maxage ?? '0'
              }`}
            </Text>
          </View>
        ) : null}
      </View>
    </ButtonView>
  );
};

BookItem.propTypes = {
  index: PropTypes.number,
  onFavoriteTapped: PropTypes.func,
  bookTitleColor: PropTypes.string,
};

BookItem.defaultProps = {
  index: -1,
  onFavoriteTapped: () => {},
  bookTitleColor: Colors.Blue,
};

export default BookItem;
