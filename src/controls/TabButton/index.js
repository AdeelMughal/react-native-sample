// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Image} from 'react-native';
import CardView from 'react-native-cardview';

import styles from './styles';
import {areEqual} from '../../util/commonUtils';
import {Metrics, Colors, Fonts, Images} from '../../theme';
import utils from '../../util';

export default TabButton = React.memo((props) => {
  const {
    isSelected,
    onPress,
    icon,
    iconSelected,
    bgColor,
    selectedbgColor,
    elevation,
  } = props;

  let calcElevation = isSelected ? 9 : elevation;

  return (
    <CardView
      cardElevation={calcElevation}
      cardMaxElevation={9}
      cornerRadius={0}
      style={styles.container}>
      <TouchableOpacity
        style={[
          styles.container,
          {backgroundColor: isSelected ? selectedbgColor : bgColor},
        ]}
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}>
        <Image
          resizeMode={'contain'}
          resizeMethod={'resize'}
          style={{
            width: Metrics.screenWidth / 5 - Metrics.doubleModerateBaseMargin,
            height:
              Metrics.screenWidth / Metrics.moderateRatio(5) -
              Metrics.baseMargin,
          }}
          source={isSelected ? iconSelected : icon}
        />
      </TouchableOpacity>
    </CardView>
  );
}, areEqual);

TabButton.propTypes = {
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  iconSelected: PropTypes.string,
  bgColor: PropTypes.string,
  selectedbgColor: PropTypes.string,
  elevation: PropTypes.number,
};

TabButton.defaultProps = {
  isSelected: false,
  onPress: () => {},
  bgColor: Colors.Yellow,
  selectedbgColor: '#56c1e2',
  elevation: 1,
  iconSelected: '',
};
