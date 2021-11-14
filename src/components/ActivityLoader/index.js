// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes} from 'react-native';
import Spinner from 'react-native-spinkit';

import {areEqual} from '../../util/commonUtils';
import {Metrics, Colors, Fonts, Images} from '../../theme';

const LOADER_SIZE = 100;

export default ActivityLoader = React.memo((props) => {
  const {
    isLoading,
    type,
    style,
    loaderSize = 25,
    color = Colors.Yellow,
  } = props;

  if (type == 'mini') {
    return (
      <Spinner
        style={style}
        isVisible={isLoading}
        size={Metrics.ratio(loaderSize)}
        type={'Circle'}
        color={color}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: (Metrics.screenWidth - Metrics.ratio(LOADER_SIZE)) / 2,
        top:
          (Metrics.screenHeight - Metrics.ratio(LOADER_SIZE)) / 2 -
          Metrics.ratio(50),
      }}>
      <Spinner
        style={{
          marginBottom: Metrics.ratio(50),
        }}
        isVisible={isLoading}
        size={Metrics.ratio(LOADER_SIZE)}
        type={'Bounce'}
        color={Colors.Blue}
      />
    </View>
  );
}, areEqual);

ActivityLoader.propTypes = {
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  style: PropTypes.object,
  loaderSize: PropTypes.number,
  color: PropTypes.string,
};

ActivityLoader.defaultProps = {
  isLoading: false,
  type: 'Bounce',
  style: {},
  loaderSize: 25,
  color: Colors.Yellow,
};
