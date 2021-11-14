import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../../common/fonts';
import {Text} from '../../components';
import {Images} from '../../theme';
import styles from './styles';

const GlossaryCard = ({item, onPress, saved}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardSub1}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.cardImage}
          source={{uri: item.image, priority: FastImage.priority.high}}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => {
              onPress();
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.actionBtn}
              source={saved ? Images.heartFull : Images.heartEmpty}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.actionBtn}
              source={Images.sound}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardSub2}>
        <View style={styles.scrollContainer}>
          <ScrollView
            contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>{item.word} </Text>

            <Text
              style={{
                fontFamily: fonts.GOTHAM_LIGHT,
                color: 'black',
                fontSize: 14,
              }}>
              {item.meaning}{' '}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default GlossaryCard;
