// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

import styles from './styles';

import {areEqual} from '../../util/commonUtils';
import {Metrics, Colors, Fonts, Images} from '../../theme';

export default Empty = React.memo((props) => {
  return <View style={styles.container} />;
}, areEqual);

Empty.propTypes = {};

Empty.defaultProps = {};
