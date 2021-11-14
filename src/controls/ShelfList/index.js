import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import {Text} from '../../components';
import {Images, Metrics, Colors} from '../../theme';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const ShelfList = ({route, data, Carousel, Filters, scrollEnabled}) => {
  const navigation = useNavigation();
  const flatListRef = React.useRef();
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));
  const HEADER_HEIGHT = Metrics.carouselItem;
  const FILTER_PADDING_TOP = Metrics.baseMarginTop;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 0],
    extrapolate: 'clamp',
  });
  const paddingTop = scrollY.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, FILTER_PADDING_TOP / 2, FILTER_PADDING_TOP],
    extrapolate: 'clamp',
  });

  const ListFooterComponent = () => (
    <View style={styles.footer}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={styles.footerImage}
        source={data?.length !== 0 ? Images.woodpannel : null}
      />
    </View>
  );
  const ListHeaderComponent = () => (
    <Animated.View style={{backgroundColor: Colors.grey, paddingTop}}>
      {Filters}
    </Animated.View>
  );
  const ItemSeparatorComponent = () => (
    <View style={styles.separator}>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.separatorImage}
        source={data?.length !== 0 ? Images.woodpannel : null}
      />
    </View>
  );
  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const _renderItem = (item, index) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (route === 'QuizShelf') {
            navigation.navigate('QuizStart', {
              quizid: item.id,
              bookid: item.bookid,
              image: item.overviewimage,
            });
          } else {
            navigation.navigate('BookDetails', {
              data: item,
              bookCollection: data,
              selectedIndex: index,
            });
          }
        }}
        style={styles.renderItem}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.renderImage}
          source={{uri: item.image}}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={{height: headerHeight}}>{Carousel}</Animated.View>
      <FlatList
        scrollEnabled={scrollEnabled}
        ref={flatListRef}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}
        stickyHeaderIndices={[0]}
        data={data}
        keyExtractor={(item, id) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => ListHeaderComponent()}
        ListFooterComponent={() => ListFooterComponent()}
        ItemSeparatorComponent={() => ItemSeparatorComponent()}
        renderItem={({item, index}) => _renderItem(item, index)}
        onEndReached={() => {
          // toTop();
        }}
        onEndReachedThreshold={0.01}
        style={{marginHorizontal: Metrics.baseMargin}}
      />
    </View>
  );
};

export default ShelfList;
