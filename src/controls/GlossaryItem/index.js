import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text} from '../../components';
import {Images, Colors, Metrics} from '../../theme';
import styles from './styles';

const GlossaryItem = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (props.onPress) {
            props.onPress(props.item);
          }
        }}
        style={styles.item}>
        <FastImage style={styles.icon} source={Images.heartFull} />
        <Text size="small" color="white" style={styles.text}>
          {props?.item?.word}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GlossaryItem;
