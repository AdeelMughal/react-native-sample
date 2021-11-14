// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Modal, TouchableOpacity, ScrollView, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

import {areEqual} from '../../../util/commonUtils';
import {Metrics, Colors, Fonts, Images} from '../../../theme';
import {Text, ButtonView} from '../../../components';
import {ThemedNextButton} from '../../../controls';
import {DataHelper} from '../../../helpers';
import commonUtils from '../../../util/commonUtils';

export default AddChildModal = React.memo((props) => {
  const {
    doShowModal,
    data,
    authObject,
    isSetting = false,
    onClose,
    userType,
    onSkip,
  } = props;

  const name = props.data?.name;
  const image = props.data?.image;

  const child = authObject?.allUsersData?.child;

  let firstChild, secondChild, thirdChild;

  if (
    authObject?.allUsersData?.child &&
    authObject?.allUsersData?.child.length > 0
  ) {
    firstChild = authObject?.allUsersData?.child[0];
    secondChild = authObject?.allUsersData?.child[1];
    thirdChild = authObject?.allUsersData?.child[2];
  }

  const renderGreenTick = () => {
    return (
      <Image
        style={{
          width: Metrics.ratio(20),
          height: Metrics.ratio(20),
          marginTop: Metrics.ratio(-20),
        }}
        source={Images.asset13}
      />
    );
  };

  const renderChildCell = (childObject, displayText, disableVal) => {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onNext}
          disabled={disableVal}
          style={{
            width: Metrics.ratio(100),
            height: Metrics.ratio(100),
          }}>
          <FastImage
            style={
              commonUtils.isCustomAvatar(childObject?.image)
                ? {
                    flex: 1,
                    borderRadius: Metrics.ratio(50),
                  }
                : {
                    flex: 1,
                  }
            }
            resizeMode={FastImage.resizeMode.contain}
            source={
              childObject?.image
                ? {uri: childObject?.image}
                : Images.chooseChild
            }
          />
        </TouchableOpacity>
        {childObject?.image && renderGreenTick()}

        <Text
          style={{
            fontSize: 18,
            color: 'white',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            marginTop: Metrics.ratio(10),
          }}>
          {childObject?.name?.split(' ')[0]}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: disableVal == true ? 'grey' : 'white',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}>
          ({displayText})
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          marginHorizontal: Metrics.doubleBaseMargin,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: Metrics.baseMargin,
        }}>
        {!isSetting && (
          <Text
            numberOfLines={2}
            color={'light'}
            size={'xxxxxSmall'}
            style={{
              flex: 1,
              fontWeight: 'bold',

              textAlign: 'left',
              lineHeight: Metrics.ratio(12),
            }}>
            Create additional profiles at anytime later on!
          </Text>
        )}

        <View style={{width: Metrics.screenWidth, alignItems: 'flex-end'}}>
          <ThemedNextButton
            style={{
              width: Metrics.ratio(120),
              height: Metrics.ratio(30),
              marginRight: Metrics.baseMargin,
            }}
            text={'SKIP'}
            iconStyle={{
              width: Metrics.ratio(25),
              height: Metrics.ratio(25),
            }}
            textStyle={{
              fontSize: Metrics.ratio(13),
              marginRight: Metrics.baseMargin,
            }}
            onPress={() => {
              if (onSkip) {
                onSkip();
              }

              if (onClose) {
                onClose();
              }
            }}
          />
        </View>
      </View>
    );
  };

  const onNext = () => {
    const {onClose, authObject} = props;

    const {allUsersData} = authObject;

    if (authObject?.allUsersData?.child?.length === 3) {
      alert('You have already created three reader');
      return;
    }

    if (onClose) {
      onClose();
    }
    props.navigation.navigate('CreateFirstChild', {isSetting});
  };

  return (
    <Modal
      transparent
      animated
      useNativeDriver="true"
      animationType="slide"
      visible={doShowModal}
      onRequestClose={() => {
        const {onClose} = props;

        if (onClose) {
          onClose();
        }
      }}>
      <ScrollView
        alwaysBounceVertical
        // contentContainerStyle={{flex: 1}}
        style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.9)'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 2 * Metrics.smallMargin,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <FastImage
              style={{
                width: Metrics.ratio(150),
                height: Metrics.ratio(150),
                borderRadius: Metrics.ratio(75),
                marginTop: Metrics.ratio(5),
              }}
              resizeMode={FastImage.resizeMode.contain}
              source={
                image
                  ? {
                      uri: DataHelper.getProfileImage(image),
                      priority: FastImage.priority.high,
                    }
                  : Images.guestKidAsset
              }
            />
            <Image
              style={{
                width: Metrics.ratio(40),
                height: Metrics.ratio(40),
                position: 'absolute',
              }}
              source={Images.asset13}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <Text
              numberOfLines={2}
              style={{
                color: Colors.Yellow,
                fontSize: Metrics.ratio(18),
                marginHorizontal: Metrics.baseMargin,
              }}>
              {name?.toUpperCase()}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: Metrics.ratio(13),
              }}>
              (PARENT)
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {renderChildCell(firstChild, 'CHILD 1', false)}
            {renderChildCell(
              secondChild,
              'CHILD 2',
              userType == 1 ? false : true,
            )}
            {renderChildCell(
              thirdChild,
              'CHILD 3',
              userType == 1 ? false : true,
            )}
          </View>

          <View
            style={{
              width: '100%',
              marginTop: Metrics.ratio(10),
              marginBottom: Metrics.baseMargin,
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: Metrics.ratio(19),
                marginTop: Metrics.ratio(20),
                color: '#F5EC00',
                lineHeight: Metrics.ratio(21),
              }}>
              You can add up to three child {'\n'} profiles and can edit at
              anytime {'\n'} later on.
            </Text>

            <ThemedNextButton
              onPress={onNext}
              style={{
                marginHorizontal: Metrics.baseMargin,
                borderRadius: Metrics.ratio(17),
                width: '90%',
                height: Metrics.ratio(60),
                marginTop: Metrics.ratio(20),
              }}
              text={'CREATE ANOTHER PROFILE'}
              textStyle={{fontSize: Metrics.ratio(18)}}
            />

            {/* {!isSetting && !DataHelper.isSubscribed() && (
              <ThemedNextButton
                gradient={['#F5EC00', '#F5EC00']}
                onPress={() => {
                  const {onClose} = props;

                  if (onClose) {
                    onClose();
                  }

                  props.navigation.navigate('Package');
                }}
                style={{
                  marginHorizontal: Metrics.baseMargin,
                  borderRadius: Metrics.ratio(17),
                  width: '90%',
                  height: Metrics.ratio(60),
                  marginTop: Metrics.ratio(5),
                }}
                text={'SELECT PACKAGE'}
                textStyle={{fontSize: Metrics.ratio(18), color: Colors.Blue}}
                icon={Images.nextYellowIcon}
              />
            )} */}

            {renderFooter()}
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}, areEqual);

AddChildModal.propTypes = {
  onClose: PropTypes.func,
  onSkip: PropTypes.func,
  doShowModal: PropTypes.bool,
  userType: PropTypes.bool,
  data: PropTypes.object,
  authObject: PropTypes.object,
};

AddChildModal.defaultProps = {
  onClose: undefined,
  onSkip: undefined,
  doShowModal: false,
  userType: false,
  data: undefined,
  authObject: {},
};
