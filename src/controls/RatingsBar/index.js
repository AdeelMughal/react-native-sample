import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {Images, Metrics} from '../../theme';
import styles from './styles';

const RatingsBar = ({
  maxRating,
  defaultRating,
  setDefaultRating,
  size,
  spacing,
  onRated,
  isReadOnly,
}) => {
  return (
    <View style={styles.container}>
      {maxRating.map((item, key) => {
        return (
          <TouchableWithoutFeedback
            activeOpacity={0.7}
            key={item}
            onPress={() => {
              if (isReadOnly) {
                return;
              }

              if (setDefaultRating) {
                setDefaultRating(item);
              }
            }}>
            <Image
              style={
                (styles.starImageStyle,
                {
                  width: Metrics.moderateRatio(size),
                  height: Metrics.moderateRatio(size),
                  marginHorizontal: Metrics.moderateRatio(spacing),
                })
              }
              source={item <= defaultRating ? Images.star : Images.starempty}
            />
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default RatingsBar;

RatingsBar.propTypes = {
  maxRating: PropTypes.array,
  defaultRating: PropTypes.number,
  setDefaultRating: PropTypes.func,
  size: PropTypes.number,
  spacing: PropTypes.number,
  onRated: PropTypes.func,
  isReadOnly: PropTypes.bool,
};

RatingsBar.defaultProps = {
  maxRating: [],
  defaultRating: 0,
  setDefaultRating: undefined,
  size: 40,
  spacing: 2,
  onRated: undefined,
  isReadOnly: false,
};
