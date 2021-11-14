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
import {getQuizList} from '../../../actions/BooksActions';

const QuizShelf = (props) => {
  const [quizList, setQuizList] = useState([]);
  const scrollRef = useRef();
  const [filterIsOpened, setFilterIsOpened] = useState(false);
  const categories = props.books?.categories.map((item, index) => {
    return {title: item.categoryinfo.name, imageUrl: item.categoryinfo.icon};
  });

  useEffect(() => {
    props.getQuizList();
  }, []);
  useEffect(() => {
    setQuizList(props.books.quizList);
  }, [props.books.quizList]);

  return (
    <HomeTemplate
      back
      renderUser={true}
      navigation={props.navigation}
      backgroundColor="white">
      <View
        style={{flex: 1}}
        nestedScrollEnabled
        ref={scrollRef}
        showsVerticalScrollIndicator={false}>
        {/* <Filters /> */}
        <ShelfList
          scrollEnabled={!filterIsOpened}
          route="QuizShelf"
          data={quizList}
          Carousel={
            <CarouselCards data={props.books.home.featuredimagesforhome} />
          }
          Filters={
            <Filters
              onToggle={() => {
                setFilterIsOpened(!filterIsOpened);
              }}
              isOpened={filterIsOpened}
              categories={categories}
              onPressItem={(val) => console.log('value', val)}
            />
          }
        />
      </View>
    </HomeTemplate>
  );
};

export default connect(MapSateToProps, {getQuizList})(QuizShelf);
