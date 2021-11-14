// @flow
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Image, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';

import styles from './styles';

import {areEqual} from '../../../util/commonUtils';
import {Metrics, Colors, Fonts, Images, Sounds} from '../../../theme';
import {Text, ButtonView, Inputs, ActivityLoader} from '../../../components';
import {ThemedNextButton, UserAvatarTickControl} from '../../../controls';
import {render} from 'react-dom';
import {SoundHelper, DataHelper} from '../../../helpers';
import {verifyParent} from '../../../actions/AuthActions';
import {useDispatch, useSelector} from 'react-redux';

export default ConfirmParentModal = React.memo((props) => {
  const {
    doShowModal,
    onClose,
    type,
    onVerify = undefined,
    onDelete = undefined,
  } = props;

  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth?.user?.email);
  const loader = useSelector((state) => state?.general?.isLoading);

  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (doShowModal) {
      SoundHelper.playSound(Sounds.everypopup);
    }
  }, [doShowModal]);

  renderCloseButton = () => {
    return (
      <ButtonView
        onPress={() => {
          if (onClose) {
            onClose();
          }
        }}
        style={styles.closeBtn}>
        <Image
          style={{flex: 1}}
          resizeMethod={'resize'}
          resizeMode={'contain'}
          source={Images.asset15}
        />
      </ButtonView>
    );
  };

  const invalidParent = () => {
    setMsg("You're not parent");
    setTimeout(() => {
      resetForm();
    }, 2000);
  };

  const resetForm = () => {
    setMsg('');
    setPassword('');
  };

  const onConfirmParent = async () => {
    if (!password) {
      return;
    }

    DataHelper.showLoader();
    let data = {email: DataHelper.getParentData()?.email, password};

    const verifyStatus = await dispatch(verifyParent(data));
    if (verifyStatus == 'success') {
      onVerify();
      resetForm();
    } else {
      invalidParent();
    }
    DataHelper.hideLoader();
  };

  const renderChildModal = () => {
    const childName = props?.childName || '';
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffe001',
          justifyContent: 'center',
          borderBottomLeftRadius: Metrics.ratio(25),
          borderBottomRightRadius: Metrics.ratio(25),
        }}>
        <Text
          style={{
            marginHorizontal: Metrics.doubleBaseMargin,
            textAlign: 'center',
            color: '#f89a00',
            marginTop: Metrics.doubleBaseMargin + 2 * Metrics.baseMargin,
          }}
          numberOfLines={2}>
          {`REMOVE ${childName.toUpperCase()} PROFILE?`}
        </Text>

        <Text
          style={{
            marginHorizontal: Metrics.doubleBaseMargin,
            textAlign: 'center',
            color: '#54b7bd',
            marginVertical: Metrics.baseMargin,
          }}
          numberOfLines={3}>
          By doing this all related content will be removed permanently?
        </Text>

        <ButtonView
          onPress={onDelete}
          style={{
            backgroundColor: '#8ec653',
            height: Metrics.ratio(35),
            borderRadius: Metrics.ratio(22),
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: Metrics.doubleBaseMargin,
            marginBottom: Metrics.baseMargin,
          }}>
          <Text color="light">YES</Text>
        </ButtonView>
        <ButtonView
          onPress={onClose}
          style={{
            backgroundColor: Colors.white,
            height: Metrics.ratio(35),
            borderRadius: Metrics.ratio(22),
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: Metrics.doubleBaseMargin,
            marginBottom: Metrics.baseMargin,
          }}>
          <Text color="#54b7bd">NO</Text>
        </ButtonView>
      </View>
    );
  };

  return (
    <Modal
      style={{backgroundColor: 'transparent'}}
      onBackdropPress={() => {
        if (onClose) {
          onClose();
        }
      }}
      backdropOpacity={0.9}
      backdropColor={'black'}
      animated
      useNativeDriver="true"
      animationType="slide"
      isVisible={doShowModal}
      onRequestClose={() => {
        const {onClose} = props;

        if (onClose) {
          onClose();
        }
      }}>
      <View>
        {renderCloseButton()}
        <View
          style={{
            marginHorizontal: Metrics.doubleBaseMargin,
            height: Metrics.ratio(380),
          }}>
          <UserAvatarTickControl
            showTick
            style={{
              zIndex: 10,
              top: Metrics.ratio(-20),
              position: 'absolute',
              left: (Metrics.screenWidth - Metrics.ratio(280)) / 2,
            }}
            tickStyle={{
              width: Metrics.moderateRatio(35),
              height: Metrics.moderateRatio(35),
            }}
          />
          <View
            style={{
              marginHorizontal: 0,
              height: Metrics.ratio(50),
              backgroundColor: Colors.Blue,
              borderTopLeftRadius: Metrics.ratio(25),
              borderTopRightRadius: Metrics.ratio(25),
            }}></View>
          {type == 'affirmative' ? (
            renderChildModal()
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: '#ffe001',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomLeftRadius: Metrics.ratio(25),
                borderBottomRightRadius: Metrics.ratio(25),
              }}>
              <Text
                style={{
                  marginHorizontal: Metrics.doubleBaseMargin,
                  textAlign: 'center',
                  color: '#f89a00',
                  marginTop: Metrics.doubleBaseMargin + 2 * Metrics.baseMargin,
                }}
                numberOfLines={2}>
                CONFIRM IF YOU ARE PARENT?
              </Text>

              <Text
                style={{
                  marginHorizontal: Metrics.doubleBaseMargin,
                  textAlign: 'center',
                  color: '#54b7bd',
                  marginTop: Metrics.baseMargin,
                }}>
                ENTER PASSWORD
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: Metrics.moderateRatio(6),
                  marginBottom: Metrics.moderateRatio(17),
                }}>
                <Inputs
                  width="80%"
                  placeholder="Password"
                  secure={true}
                  value={password}
                  onChangeText={(val) => setPassword(val)}
                />
              </View>
              <ButtonView
                disabled={loader}
                onPress={onConfirmParent}
                style={{
                  backgroundColor: '#8ec653',
                  height: Metrics.moderateRatio(40),
                  borderRadius: Metrics.ratio(22),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: Metrics.doubleBaseMargin * 2,
                  width: '60%',
                  marginBottom: Metrics.baseMargin,
                }}>
                {loader ? (
                  <ActivityLoader isLoading={loader} type="mini" />
                ) : (
                  <Text color="light">PROCEED</Text>
                )}
              </ButtonView>
              {msg ? <Text color={Colors.text.accent}>{msg}</Text> : null}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}, areEqual);

ConfirmParentModal.propTypes = {
  onClose: PropTypes.func,
  doShowModal: PropTypes.bool,
};

ConfirmParentModal.defaultProps = {
  onClose: undefined,
  doShowModal: false,
};
