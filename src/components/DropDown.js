import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {TextInputColor} from '../common/Theme';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {Text} from '../components';

import {MapSateToProps} from '../common/MapDisptacher';
import fonts from '../common/fonts';
import DeviceInfo from 'react-native-device-info';
import {Images, Metrics} from '../theme';

// import { Camera } from "expo-camera";

let isTablet = DeviceInfo.isTablet();

const DropDown = (props) => {
  return (
    <View style={{width: '70%'}}>
      <TouchableOpacity
        onPress={() => props.openModal()}
        activeOpacity={0.8}
        style={{
          width: '100%',
          height: Metrics.ratio(45),
          backgroundColor: TextInputColor,
          paddingLeft: 20,
          borderRadius: 100,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '80%',

            justifyContent: 'center',
            height: Metrics.ratio(45),
          }}>
          <Text
            numberOfLines={1}
            style={[
              {
                fontSize: Metrics.ratio(16),
                color: 'gray',
              },
              props.placeholderStyle,
            ]}>
            {props.countryName || 'Choose Country'}
          </Text>
        </View>
        <View
          style={{
            width: '22%',
            justifyContent: 'center',
            alignItems: 'center',
            height: Metrics.ratio(45),
          }}>
          <Image
            style={{
              width: Metrics.ratio(70),
              height: Metrics.ratio(70),
            }}
            source={Images.asset115}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default connect(MapSateToProps)(DropDown);
