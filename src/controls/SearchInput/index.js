import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput} from 'react-native';
import {Colors, Images, Metrics} from '../../theme';
import styles from './styles';
import {ButtonView} from '../../components';
import FastImage from 'react-native-fast-image';

const SearchInput = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.SectionStyle}>
        <ButtonView
          onPress={() => {
            if (props.onSearch) props.onSearch();
          }}>
          <FastImage source={Images.asset39} style={styles.ImageStyle} />
        </ButtonView>
        <TextInput
          autoCapitalize="none"
          value={props.value}
          onChangeText={(val) => props.changeText(val)}
          placeholder={props.placeholder}
          placeholderTextColor={Colors.black}
          style={styles.inputStyle}
          placeholder={props.placeholder}
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
};

export default SearchInput;
SearchInput.propTypes = {
  // maxRating: PropTypes.array,
  // defaultRating: PropTypes.number,
  // setDefaultRating: PropTypes.func,
  // size: PropTypes.number,
  // spacing: PropTypes.number,
};

SearchInput.defaultProps = {
  // maxRating: [],
  // defaultRating: 0,
  // setDefaultRating: undefined,
  // size: 40,
  // spacing: 2,
};
