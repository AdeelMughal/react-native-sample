import React from 'react';
import {View, Text} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from '../CarouselCardItem';
import {Images, Colors, Metrics} from '../../theme';

const CarouselCards = ({data, onTapCard}) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View style={{}}>
      <Carousel
        autoplay
        autoplayDelay={5}
        layout="tinder"
        layoutCardOffset={Metrics.ratio(9)}
        ref={isCarousel}
        data={data}
        renderItem={({item, index}) => {
          return (
            <CarouselCardItem item={item} index={index} onPress={onTapCard} />
          );
        }}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        loop
      />
      <View style={{position: 'absolute', bottom: 0, left: 0}}>
        <Pagination
          dotsLength={data?.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: Colors.Yellow,
          }}
          inactiveDotStyle={{
            width: 8,
            height: 8,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
    </View>
  );
};

export default CarouselCards;
