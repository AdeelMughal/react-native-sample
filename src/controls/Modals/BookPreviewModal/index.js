// @flow
import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Modal, TouchableOpacity, ScrollView, Image} from 'react-native';

import styles from './styles';

import {Metrics, Colors, Fonts, Images} from '../../../theme';
import {Text, ButtonView, FastImagePlaceholder} from '../../../components';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const BookPreviewModal = React.memo((props) => {
  const {doShowModal, data, onClose} = props;
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);
  const [sampleBookPages, setSampleBookPages] = useState([]);

  useEffect(() => {
    if (data && data.pages) {
      const pagesLookInside = data?.pages.filter((thisEl) => thisEl.lookinside);
      setSampleBookPages(pagesLookInside);
    }
  }, [data]);

  const CarouselItem = ({item, index}) => {
    return (
      <View style={{flex: 1}} key={index}>
        <FastImagePlaceholder
          source={{uri: item.image}}
          containerStyle={styles.carouselItem}
          resizeMode={'cover'}
        />
      </View>
    );
  };

  renderCloseButton = () => {
    return (
      <View
        style={{
          width: Metrics.screenWidth - 4 * Metrics.baseMargin,
          height: Metrics.ratio(44),

          alignItems: 'flex-end',
        }}>
        <ButtonView
          onPress={() => {
            if (onClose) {
              onClose();
            }
          }}
          style={styles.close}>
          <Image
            style={{
              flex: 1,
              width: Metrics.ratio(35),
              height: Metrics.ratio(35),
            }}
            resizeMethod={'resize'}
            resizeMode={'contain'}
            source={Images.asset15}
          />
        </ButtonView>
      </View>
    );
  };

  return (
    <Modal
      transparent
      animated
      useNativeDriver="true"
      animationType="fade"
      visible={doShowModal}
      onRequestClose={() => {
        if (onClose) {
          onClose();
        }
      }}>
      <View style={styles.container}>
        {renderCloseButton()}
        <View style={styles.carousel}>
          <Carousel
            autoplay={false}
            layout="tinder"
            layoutCardOffset={9}
            ref={isCarousel}
            data={sampleBookPages}
            renderItem={CarouselItem}
            sliderWidth={Metrics.screenWidth - 4 * Metrics.baseMargin}
            itemWidth={Metrics.screenWidth - 4 * Metrics.baseMargin}
            onSnapToItem={(index) => setIndex(index)}
            useScrollView={true}
            loop
          />
        </View>

        <View style={styles.pagination}>
          <Pagination
            dotsLength={sampleBookPages.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={styles.dotStyle}
            inactiveDotStyle={styles.inactiveDotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </View>
      </View>
    </Modal>
  );
});

export default BookPreviewModal;

BookPreviewModal.propTypes = {
  onClose: PropTypes.func,
  doShowModal: PropTypes.bool,
  data: PropTypes.object,
};

BookPreviewModal.defaultProps = {
  onClose: undefined,
  doShowModal: false,
  data: undefined,
};
