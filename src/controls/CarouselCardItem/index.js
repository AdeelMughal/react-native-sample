import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Metrics} from '../../theme';
import {ButtonView, FastImagePlaceholder} from '../../components';

export const SLIDER_WIDTH = Metrics.screenWidth;
export const ITEM_WIDTH = Metrics.screenWidth;

const CarouselCardItem = ({item, index, onPress}) => {
  return (
    <ButtonView
      style={styles.container}
      key={index}
      onPress={() => {
        if (onPress) {
          onPress(item, index);
        }
      }}>
      <FastImagePlaceholder
        source={{uri: item.image}}
        containerStyle={styles.image}
      />
    </ButtonView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: Metrics.ratio(8),
    width: Metrics.screenWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Metrics.ratio(3),
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: Metrics.screenWidth,
    height: Metrics.carouselItem,
  },
});

export default CarouselCardItem;
