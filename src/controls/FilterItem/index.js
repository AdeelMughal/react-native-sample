import React from 'react';
import {View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, ButtonView} from '../../components';
import styles from './styles';

const FilterItem = ({icon, item, index, onPress}) => {
  return (
    <ButtonView
      onPress={() => {
        onPress(item.value, index);
      }}
      style={styles.container}>
      <View style={styles.subContainer1}>
        <FastImage style={styles.image} source={icon} />
      </View>
      <View style={styles.subContainer2}>
        <Text size="xSmall" color="white">
          {item.text}
        </Text>
      </View>
    </ButtonView>
  );
};

export default FilterItem;
