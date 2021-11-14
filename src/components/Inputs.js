import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';

import {TextInputColor, Yellow} from '../common/Theme';
import {connect} from 'react-redux';
import fonts from '../common/fonts';
import {MapSateToProps} from '../common/MapDisptacher';
import DeviceInfo from 'react-native-device-info';
import {Metrics, Colors, Fonts, Images} from '../theme';

// import { Camera } from "expo-camera";
let isTablet = DeviceInfo.isTablet();

const Inputs = (props) => {
  const passwordInput = useRef(null);
  const [showPass, setshowPass] = useState(false);
  useEffect(() => {
    passwordInput?.current?.setNativeProps({
      style: {fontFamily: fonts.CARTERONE},
    });
  }, [showPass]);

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TextInput
        ref={passwordInput}
        maxLength={props.maxLength}
        autoCapitalize="none"
        value={props.value}
        secureTextEntry={props.secure && !showPass}
        onChangeText={(val) => props.changeText(val)}
        placeholder={props.placeholder}
        placeholderTextColor="gray"
        style={[
          {
            width: props.secure ? '70%' : props.width || '80%',
            fontFamily: fonts.CARTERONE,
            fontWeight: '200',
            height: Metrics.ratio(45),
            backgroundColor: TextInputColor,
            paddingRight: props.secure ? Metrics.ratio(45) : Metrics.ratio(20),
            paddingLeft: Metrics.ratio(20),
            borderRadius: Metrics.ratio(100),
            fontSize: Metrics.ratio(16),
            borderColor: props.borderColor ? Colors.Yellow : null,
            borderWidth: props.borderColor ? Metrics.ratio(3) : 0,
            marginLeft: props.marginLeft ? props.marginLeft : 0,
            color: 'black',
          },
          {...props.styles},
        ]}
        {...props}
      />
      {props.secure && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setshowPass(!showPass)}
          style={{
            position: 'absolute',
            right: 0,
            paddingVertical: Metrics.moderateRatio(10),
            paddingLeft: Metrics.moderateRatio(10),
            paddingRight: Metrics.moderateRatio(15),
          }}>
          <Image
            resizeMode={'contain'}
            style={{
              width: Metrics.ratio(25),
              height: Metrics.ratio(25),
            }}
            source={showPass ? Images.eyeOpen : Images.eyeClosed}
          />
        </TouchableOpacity>
      )}
      {props.clearWhenHaveValue && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={props.clearText}
          style={{
            position: 'absolute',
            right: 0,
            paddingVertical: Metrics.moderateRatio(10),
            paddingLeft: Metrics.moderateRatio(10),
            paddingRight: Metrics.moderateRatio(15),
          }}>
          <Image
            resizeMode={'contain'}
            style={{
              width: Metrics.ratio(25),
              height: Metrics.ratio(25),
            }}
            source={props.value != '' ? Images.asset14 : null}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default connect(MapSateToProps)(Inputs);
