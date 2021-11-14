// @flow
import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

import Carousel from 'react-native-snap-carousel';

import styles from './styles';

import {areEqual} from '../../util/commonUtils';
import {Metrics, Colors, Fonts, Images} from '../../theme';

import {DataHelper} from '../../helpers';

export default HorizontalBooksSlider = React.memo(
  forwardRef((props, ref) => {
    const realBookListRef = useRef(null);

    useEffect(() => {}, []);

    useImperativeHandle(ref, () => ({
      onSnap: (currentIndex) => {
        if (realBookListRef && realBookListRef.current) {
          realBookListRef.current.snapToItem(currentIndex, true);
        }
      },
      testMethod2: () => {
        console.log('SDFSFDSF');
      },
    }));

    const {data, renderItem, onSnapToItem} = props;

    return (
      <Carousel
        ref={realBookListRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={Metrics.screenWidth}
        itemWidth={Metrics.screenWidth}
        onSnapToItem={onSnapToItem}
        enableMomentum={false}
        decelerationRate={'normal'}
        loop={false}
        useScrollView={true}
        swipeThreshold={15}
      />
    );
  }),
  areEqual,
);

HorizontalBooksSlider.propTypes = {
  data: PropTypes.array,
  renderItem: PropTypes.func,
  onSnapToItem: PropTypes.func,
};

HorizontalBooksSlider.defaultProps = {
  data: [],
  renderItem: () => {},
  onSnapToItem: () => {},
};
