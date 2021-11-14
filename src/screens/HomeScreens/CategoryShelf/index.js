import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Images, Metrics, Colors} from '../../../theme';
import {Text} from '../../../components';
import HomeTemplate from '../../../containers/HomeTemplate';
import CarouselCards from '../../../controls/CarouselCards';
import Filters from '../../../controls/Filters';
import ShelfList from '../../../controls/ShelfList';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {getBooksByCatId, getFilteredBooks} from '../../../actions/BooksActions';
import {getBookDetails} from '../../../actions/BookDetailsActions';
import commonUtils from '../../../util/commonUtils';

const CategoryShelf = (props) => {
  const scrollRef = useRef();
  const [filterIsOpened, setFilterIsOpened] = useState(false);
  const [selectedCategoryId, setCategoryId] = useState(
    props?.route?.params?.categoryid,
  );
  const categories = props.books?.categories.map((item, index) => {
    return {
      id: item.categoryinfo.id,
      title: item.categoryinfo.name,
      imageUrl: item.categoryinfo.icon,
    };
  });

  useEffect(() => {
    props.getBooksByCatId(selectedCategoryId);
  }, []);

  useEffect(() => {
    if (
      !props.bookDetails.isLoading &&
      props.bookDetails.data &&
      props.bookDetails.data.catid
    ) {
      const bookLikeObject = commonUtils.getBookLikeObject(
        props.bookDetails.data,
      );

      props.navigation.navigate('BookDetails', {
        data: bookLikeObject,
        bookCollection: [bookLikeObject],
        selectedIndex: 0,
      });
    }
  }, [props.bookDetails]);

  const getBooksByCategory = (categoryid) => {
    setCategoryId(categoryid);
    props.getBooksByCatId(categoryid);
  };

  const onFilterPress = (val, index, catId) => {
    let payload = {
      isLowerAgeRange: 0,
      isUpperAgeRange: 0,
      isnewaddition: 0,
      ispopularbooks: 0,
      israted: 0,
      isfeatured: 0,
      categoryId: selectedCategoryId,
    };
    payload[val] = 1;
    props.getFilteredBooks(payload);
  };

  onHeaderTapped = (item, index) => {
    console.log(item);

    props.getBookDetails(item.id);
  };

  return (
    <HomeTemplate
      renderUser={true}
      navigation={props.navigation}
      backgroundColor="white"
      back>
      <View
        style={{flex: 1}}
        nestedScrollEnabled
        ref={scrollRef}
        showsVerticalScrollIndicator={false}>
        {/* <Filters /> */}
        <ShelfList
          scrollEnabled={!filterIsOpened}
          data={props.books?.books?.bookinfo}
          Carousel={
            <CarouselCards
              data={props.books?.books?.featuredimages}
              onTapCard={onHeaderTapped}
            />
          }
          Filters={
            <Filters
              selectedCategory={props?.route?.params?.categoryid}
              onToggle={() => {
                setFilterIsOpened(!filterIsOpened);
              }}
              onFilterPress={(val, i) => {
                onFilterPress(val, i);
              }}
              isOpened={filterIsOpened}
              categories={categories}
              onPressItem={(val) => getBooksByCategory(val)}
            />
          }
        />
      </View>
    </HomeTemplate>
  );
};
const actions = {getBooksByCatId, getFilteredBooks, getBookDetails};
export default connect(MapSateToProps, actions)(CategoryShelf);
