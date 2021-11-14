// @flow
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';

import {areEqual} from '../../util/commonUtils';
import {Metrics, Colors, Fonts, Images, Sounds} from '../../theme';
import {ImagePicker, Text} from '../../components';
import {SoundHelper} from '../../helpers';
import commonUtils from '../../util/commonUtils';

export default AvatarScroll = React.memo((props) => {
  const renderGreenTick = () => {
    return (
      <Image
        style={{
          width: Metrics.ratio(30),
          height: Metrics.ratio(30),
          position: 'absolute',
          bottom: Metrics.ratio(5),
        }}
        source={Images.asset13}
      />
    );
  };

  renderAvatarCell = (avItem, index, onCellPress) => {
    const {selectedAvatarId, userSelection, avatarSize} = props;

    let srcImg;

    if (userSelection) {
      srcImg = avItem.image ? {uri: avItem.image} : Images.guestKidAsset;
    } else {
      srcImg = {
        uri: selectedAvatarId == avItem.id ? avItem.selected : avItem.image,
        priority: FastImage.priority.high,
      };
    }

    let isCustomImage = true;

    if (srcImg && srcImg.uri) {
      isCustomImage = commonUtils.isCustomAvatar(srcImg.uri);
    }

    return (
      <View style={{alignItems: 'center', width: Metrics.ratio(170)}}>
        <TouchableOpacity
          onPress={onCellPress}
          activeOpacity={1}
          key={index}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={
              isCustomImage
                ? {
                    width: Metrics.ratio(avatarSize - 20),
                    height: Metrics.ratio(avatarSize - 20),
                    borderRadius: Metrics.ratio(avatarSize - 20 / 2),
                  }
                : {
                    width: Metrics.ratio(avatarSize),
                    height: Metrics.ratio(avatarSize),
                  }
            }
            source={srcImg}
          />
          {selectedAvatarId == avItem.id ? renderGreenTick() : null}
        </TouchableOpacity>
        {userSelection && (
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text color={Colors.Blue} size="large" numberOfLines={1}>
              {avItem?.name?.toUpperCase()}
            </Text>
            <Text
              style={{
                color: Colors.text.quaternary,
                fontSize: Fonts.size.small,
                marginTop: Metrics.moderateRatio(-6),
              }}>
              {`(${avItem?.parent ? 'CHILD' : 'PARENT'})`}
            </Text>
          </View>
        )}
      </View>
    );
  };

  renderSelectCameraCell = () => {
    const {onPickedImage, isSelectedFromCamera, pickedImage} = props;

    return (
      <View style={{alignItems: 'center'}}>
        <ImagePicker
          width={Metrics.ratio(150)}
          height={Metrics.ratio(150)}
          isCropping
          mediaType={'photo'}
          openCameraIcon={Images.openCamera}
          source={
            pickedImage && pickedImage.uri
              ? {uri: pickedImage.uri}
              : pickedImage
              ? {uri: pickedImage}
              : undefined
          }
          containerStyle={styles.roundImg}
          imageStyle={{
            width: Metrics.ratio(105),
            height: Metrics.ratio(105),
          }}
          onImagePicked={onPickedImage}
        />
        {isSelectedFromCamera ? renderGreenTick() : null}
      </View>
    );
  };

  return (
    <View
      style={{
        width: Metrics.screenWidth,
        height: props.userSelection
          ? Metrics.ratio(props.avatarSize) + Metrics.ratio(47)
          : Metrics.ratio(120),
        marginVertical: Metrics.smallMargin,
      }}>
      <View
        style={[
          {
            width: '100%',
            height: Metrics.ratio(80),
            position: 'absolute',
            top: (Metrics.ratio(props.avatarSize) - Metrics.ratio(80)) / 2,
            backgroundColor: Colors.Yellow,
          },
          props.containerStyle,
        ]}></View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        style={{flex: 1}}>
        <View style={{width: Metrics.baseMargin}} />
        {props.avatarList.map((item, i) => {
          return renderAvatarCell(item, i, () => {
            const {onAvatarSelected} = props;

            if (onAvatarSelected) {
              SoundHelper.playSound(Sounds.onEveryTap);

              onAvatarSelected(item);
            }
          });
        })}
        {!props.userSelection && renderSelectCameraCell()}
        <View style={{width: Metrics.baseMargin}} />
      </ScrollView>
    </View>
  );
}, areEqual);

AvatarScroll.propTypes = {
  avatarList: PropTypes.array,
  onAvatarSelected: PropTypes.func,
  onPickedImage: PropTypes.func,
  pickedImage: PropTypes.object,
  isSelectedFromCamera: PropTypes.bool,
  selectedAvatarId: PropTypes.string,
  avatarSize: PropTypes.number,
};

AvatarScroll.defaultProps = {
  avatarList: [],
  onAvatarSelected: undefined,
  onPickedImage: undefined,
  pickedImage: undefined,
  isSelectedFromCamera: false,
  selectedAvatarId: '',
  avatarSize: 120,
};
