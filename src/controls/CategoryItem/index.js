import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images, Colors} from '../../theme';
import {FastImagePlaceholder} from '../../components';
import styles from './styles';

const CategoryItem = ({item, index, onPress, route}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(route, {index, item});
      }}>
      <FastImagePlaceholder
        source={{uri: item.boximage}}
        containerStyle={styles.image}
      />
    </TouchableOpacity>
  );
};

export default CategoryItem;
