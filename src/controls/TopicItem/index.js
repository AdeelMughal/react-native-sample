import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images, Colors} from '../../theme';
import {FastImagePlaceholder} from '../../components';
import styles from './styles';

const TopicItem = ({item, index, onPress, route}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (onPress) {
          onPress(route, {item, index});
        }
      }}>
      <FastImagePlaceholder
        containerStyle={styles.image}
        source={
          typeof item.imageUrl == 'number' ? item.imageUrl : {uri: item.image}
        }
      />
    </TouchableOpacity>
  );
};

export default TopicItem;
