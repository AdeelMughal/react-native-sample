// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';

import {areEqual} from '../../util/commonUtils';
import {Text} from '../../components';
import {Metrics, Colors, Fonts, Images, Sounds} from '../../theme';
import {SoundHelper} from '../../helpers';

export default GenderControl = React.memo((props) => {
  renderSelectOption = (displayText, isSelected, onSelect) => {
    const isLight = props.theme === 'light';
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            SoundHelper.playSound(Sounds.onEveryTap);
            onSelect();
          }}>
          {isLight && !isSelected ? (
            <View
              style={{
                width: Metrics.ratio(40),
                height: Metrics.ratio(40),
                borderRadius: Metrics.ratio(20),
                backgroundColor: '#fff',
              }}
            />
          ) : (
            <FastImage
              style={{
                width: Metrics.ratio(40),
                height: Metrics.ratio(40),
              }}
              source={
                isSelected
                  ? isLight
                    ? Images.asset45
                    : Images.asset46
                  : Images.notSelect
              }
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.Yellow,
            textAlign: 'center',
            // fontWeight: "bold",
            fontSize: Metrics.ratio(18),
            marginLeft: Metrics.smallMargin,
          }}>
          {displayText}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: Metrics.smallMargin,
        marginHorizontal: Metrics.baseMargin,
      }}>
      {renderSelectOption(props.genderNames[0], props.gender == 'male', () => {
        if (props.onGenderSelect) {
          props.onGenderSelect('male');
        }
      })}
      <View style={{width: Metrics.baseMargin}} />
      {renderSelectOption(
        props.genderNames[1],
        props.gender == 'female',
        () => {
          if (props.onGenderSelect) {
            props.onGenderSelect('female');
          }
        },
      )}
    </View>
  );
}, areEqual);

GenderControl.propTypes = {
  gender: PropTypes.bool,
  onGenderSelect: PropTypes.func,
  genderNames: PropTypes.array,
};

GenderControl.defaultProps = {
  onGenderSelect: undefined,
  genderNames: ['Male', 'Female'],
};
