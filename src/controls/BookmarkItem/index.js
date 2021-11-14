import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, ButtonView, FastImagePlaceholder} from '../../components';
import {Images, Colors, Metrics} from '../../theme';
import styles from './styles';
import {DataHelper} from '../../helpers';

const BookmarkItem = ({
  item,
  onPress,
  route,
  index,
  onRemoveBookmarkTapped,
}) => {
  const categoryIcon = DataHelper.getCategoryIconFromCategoryObect(
    item.category,
  )?.icon;

  return (
    <ButtonView
      style={styles.container}
      onPress={() => {
        if (onPress) {
          onPress(route, {item}, index);
        }
      }}>
      <View style={styles.subContainer1}>
        <View style={styles.titleImage}>
          <FastImagePlaceholder
            containerStyle={{flex: 1}}
            source={{
              uri: item.pageimage[0],
              priority: FastImage.priority.normal,
            }}
          />
        </View>
        <ButtonView
          style={styles.hideBookmarkBtn}
          onPress={() => {
            if (onRemoveBookmarkTapped) {
              onRemoveBookmarkTapped(item);
            }
          }}>
          <Image
            resizeMode={'contain'}
            style={{
              flex: 1,
              width: Metrics.ratio(44),
              height: Metrics.ratio(44),
            }}
            source={Images.cancelBookmark}
          />
        </ButtonView>
      </View>
      <View style={styles.subContainer2}>
        <View style={styles.itemLeft}>
          {categoryIcon && (
            <Image
              resizeMode="contain"
              style={styles.itemLeftImage}
              source={{uri: categoryIcon}}
            />
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={1}
            // allowFontScaling
            // adjustsFontSizeToFit
            // minimumFontScale={0.01}
            style={styles.titleText}
            size="xxxxSmall"
            color={Colors.Blue}>
            {item?.booktitle[0]?.toUpperCase()}
          </Text>
        </View>
      </View>
    </ButtonView>
  );
};

BookmarkItem.propTypes = {
  index: PropTypes.number,
  onFavoriteTapped: PropTypes.func,
  onRemoveBookmarkTapped: PropTypes.func,
};

BookmarkItem.defaultProps = {
  index: -1,
  onFavoriteTapped: undefined,
  onRemoveBookmarkTapped: undefined,
};

export default BookmarkItem;
