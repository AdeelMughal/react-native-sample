// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';

import styles from './styles';

import {Text} from '../../components';
import {areEqual} from '../../util/commonUtils';
import {Metrics, Colors, Fonts, Images} from '../../theme';
import FastImage from 'react-native-fast-image';

export default PackageCell = React.memo((props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (props.onPress) {
          props.onPress(props.item);
        }
      }}
      style={[
        styles.container,
        {backgroundColor: props.isSelected ? Colors.Yellow : '#B3B3B3'},
      ]}>
      {/* <View>
      <TouchableOpacity
        style={styles.rememberMeContainer}
        onPress={this.toggleRememberMe}> */}
      <FastImage
        source={
          props.isSelected ? Images.rememberMeFull : Images.rememberMeEmpty
        }
        style={styles.rememberMeIcon}
      />
      {/* </TouchableOpacity>
        </View> */}
      <View style={styles.titleView}>
        <Text size={'small'} style={styles.title}>
          {props.item.displayTitle}
        </Text>
      </View>
      <View style={styles.priceView}>
        <Text size={'small'} style={styles.price}>
          {props.item.price}
        </Text>
      </View>

      <View style={{flex: 0.3}}>
        <Text size={'xxxxxSmall'} style={styles.text1}>
          BILLED{' '}
          {props.item.saveRate ? ' (SAVE ' + props.item.saveRate + ')' : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
}, areEqual);

PackageCell.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
};

PackageCell.defaultProps = {
  item: undefined,
  index: -1,
  onPress: undefined,
  isSelected: false,
};
