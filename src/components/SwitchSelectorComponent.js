import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';

import {TextInputColor, Yellow} from '../common/Theme';
import {connect} from 'react-redux';
import fonts from '../common/fonts';
import {MapSateToProps} from '../common/MapDisptacher';
import DeviceInfo from 'react-native-device-info';
import {Metrics, Colors, Fonts, Images} from '../theme';
import SwitchSelector from 'react-native-switch-selector';
import {color} from 'react-native-reanimated';

// import { Camera } from "expo-camera";
let isTablet = DeviceInfo.isTablet();

const SwitchSelectorComponent = (props) => {
  const passwordInput = useRef(null);
  const [showPass, setshowPass] = useState(false);
  const [value, setValue] = useState(1);
  const options = [
    {
      label: 'Basic',
      value: '1',
      testID: 'switch-one',
      accessibilityLabel: 'switch-one',
    },
    {
      label: 'Premium',
      value: '2',
      testID: 'switch-one-thirty',
      accessibilityLabel: 'switch-one-thirty',
    },
  ];

  // useEffect(() => {
  //   passwordInput?.current?.setNativeProps({
  //     style: {fontFamily: fonts.CARTERONE},
  //   });
  // }, [showPass]);

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <SwitchSelector
        options={options}
        initial={0}
        onPress={(value) => {
          console.log(`Call onPress with value: ${value}`, value);
          setValue(value);
          props.onChange(value);
        }}
        textColor={Colors.white} //'#7a44cf'
        selectedColor={Colors.black}
        buttonColor={Colors.Yellow}
        borderColor={Colors.facebook}
        backgroundColor={Colors.themeColors.purple}
        selectedTextStyle={{fontFamily: fonts.GOTHAM_BOLD}}
        textStyle={{fontFamily: fonts.GOTHAM_BOLD}}
        hasPadding
      />
    </View>
  );
};

export default connect(MapSateToProps)(SwitchSelectorComponent);
