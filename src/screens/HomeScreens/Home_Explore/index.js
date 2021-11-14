import React, {Component} from 'react';
import {View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';
import {
  ScrollView as GestureHandlerScrollView,
  FlatList,
} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import HomeTemplate from '../../../containers/HomeTemplate';
import CarouselCards from '../../../controls/CarouselCards';
import styles from './styles';
import {Heading, BookList} from '../../../controls';
import {Images, Metrics} from '../../../theme';
import BookItem from '../../../controls/BookItem';
import CategoryItem from '../../../controls/CategoryItem';
import TopicItem from '../../../controls/TopicItem';
import HomeBanner from '../../../controls/HomeBanner';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {getHomeData, getFavoriteBooks} from '../../../actions/BooksActions';
import {
  getGlossaryFavorite,
  getAllGlossary,
} from '../../../actions/GlossaryActions';
import {getBookDetails} from '../../../actions/BookDetailsActions';

import _ from 'lodash';
import commonUtils from '../../../util/commonUtils';
import {ActivityLoader} from '../../../components';
class Home_Explore extends Component {
  componentDidMount() {
    this.props.getHomeData();

    if (this.props.auth.user?.id) {
      const payload = {
        childid: this.props.auth.user.id,
      };

      this.props.getFavoriteBooks(payload);
      this.props.getGlossaryFavorite(payload);
      this.props.getAllGlossary();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.bookDetails, this.props.bookDetails)) {
      if (
        !nextProps.bookDetails.isLoading &&
        nextProps.bookDetails.data &&
        nextProps.bookDetails.data.catid
      ) {
        const bookLikeObject = commonUtils.getBookLikeObject(
          nextProps.bookDetails.data,
        );

        this.navigate('BookDetails', bookLikeObject, [bookLikeObject], 0);
      }
    }
  }

  onPress = () => {
    this.props.navigation.navigate('Category_Main');
  };

  navigate = (routeName, data = {}, bookCollection = [], selectedIndex) => {
    this.props.navigation.navigate(routeName, {
      data,
      bookCollection,
      selectedIndex,
    });
  };

  render() {
    return (
      <HomeTemplate
        renderUser={true}
        backgroundColor="white"
        navigation={this.props.navigation}>
        <ScrollView
          ref={(ref) => (this.scrollRef = ref)}
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}>
          <CarouselCards
            data={this.props.books?.home?.featuredimagesforhome}
            onTapCard={(tappedItem, index) => {
              this.props.getBookDetails(tappedItem.id);
            }}
          />
          <Heading
            text="Explore By New Additions"
            onPress={() => this.navigate('NewAdditions')}
          />
          <BookList
            onPress={(route, data, index) => {
              this.navigate(
                route,
                data,
                this.props.books?.home?.newadditionbooks,
                index,
              );
            }}
            showCategory
            data={this.props.books?.home?.newadditionbooks?.slice(0, 5)}
            dataFor="NEW ADDITIONS"
          />
          <Heading
            text="Read By Category"
            onPress={() => this.navigate('Category_Main')}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{margin: Metrics.smallMargin}}>
            {this.props.books?.categories?.map((item, i) => (
              <CategoryItem
                item={item.categoryinfo}
                index={i}
                onPress={(route, data) => {
                  this.navigate(
                    route,
                    data,
                    this.props.books?.categories,
                    data.index,
                  );
                }}
                route={'Category_Main'}
              />
            ))}
          </ScrollView>
          <Heading text="Browse by Topics" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {this.props.books?.home?.topics?.map((item, index) => (
              <TopicItem
                item={item}
                index={index}
                onPress={(route, data) => {
                  this.navigate(
                    route,
                    data,
                    this.props.books?.home?.topics,
                    index,
                  );
                }}
                route={'TopicsScreen'}
              />
            ))}
          </ScrollView>
          <HomeBanner
            image={Images.DeenBanner}
            icon={Images.asset41}
            position="top"
            onPress={(route) => {
              this.navigate(route);
            }}
            route="QuizShelf"
          />
          <Heading text="Top Rated Books" />
          <BookList
            showCategory
            data={this.props.books?.home?.topratedbooks}
            onPress={(route, data, index) => {
              this.navigate(
                route,
                data,
                this.props.books?.home?.topratedbooks,
                index,
              );
            }}
            dataFor="TOP RATED"
          />
          <HomeBanner
            image={Images.GlossaryBanner}
            icon={Images.asset41}
            position="bottom"
            onPress={(route) => {
              this.navigate(route);
            }}
            route="GlossaryScreen"
          />
        </ScrollView>
        <ActivityLoader isLoading={this.props.general.isLoading} />
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {
  getHomeData,
  getFavoriteBooks,
  getGlossaryFavorite,
  getBookDetails,
  getAllGlossary,
})(Home_Explore);
