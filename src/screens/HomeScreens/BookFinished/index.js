import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {Images, Metrics, Colors} from '../../../theme';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Separator, Text, FastImagePlaceholder} from '../../../components';
import HomeTemplate from '../../../containers/HomeTemplate';
import CarouselCards from '../../../controls/CarouselCards';
import Filters from '../../../controls/Filters';
import ShelfList from '../../../controls/ShelfList';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../../common/MapDisptacher';
import styles from './styles';
import {Heading, ThemedNextButton, RatingsBar} from '../../../controls';

import {postBookRating} from '../../../actions/BooksActions';
import {DataHelper} from '../../../helpers';
import {getRelatedBooks} from '../../../actions/RelatedBookActions';
import {BookList} from '../../../controls';

const BookFinished = (props) => {
  const [defaultRating, setDefaultRating] = useState(-1);
  const [bookObject, setBookObject] = useState(props.route?.params?.bookObject);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [relatedBooks, setRelatedBooks] = useState(props.relatedBooks);

  useFocusEffect(
    useCallback(() => {
      //View did appear

      if (bookObject) {
        getRelatedBooks(bookObject.id);
      }
    }, []),
  );

  useEffect(() => {
    if (defaultRating > -1 && DataHelper.getUserObject() && bookObject) {
      const {id} = bookObject;

      props.postBookRating({
        rating: defaultRating,
        bookid: id,
        customerid: DataHelper.getUserObject().id,
      });
    }
  }, [defaultRating]);

  useEffect(() => {
    if (bookObject) {
      getRelatedBooks(bookObject.id);
    }
  }, [bookObject]);

  useEffect(() => {
    setRelatedBooks(props.relatedBooks);
  }, [props.relatedBooks]);

  const {data, isLoading} = relatedBooks;

  return (
    <HomeTemplate
      renderUser={true}
      navigation={props.navigation}
      backgroundColor="white"
      back>
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}>
        <View style={styles.subcontainer1}>
          <View style={styles.headingContainer}>
            <Text size="large">BOOK FINISHED!</Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.bookContainer}>
              <FastImagePlaceholder
                resizeMode={'contain'}
                containerStyle={styles.bookImage}
                source={{uri: bookObject.image}}
              />
            </View>
            <View style={styles.btnContainer}>
              {bookObject?.IsQuiz === 1 && (
                <View style={styles.btn}>
                  <ThemedNextButton
                    coloredText={Colors.Yellow}
                    coloredButton={Images.asset41}
                    style={{
                      height: Metrics.moderateRatio(40),
                    }}
                    text={'TAKE'}
                    text2={'QUIZ'}
                    iconStyle={styles.iconStyle}
                    textStyle={styles.textStyle}
                    onPress={() => {}}
                  />
                </View>
              )}
              <View style={styles.btn}>
                <ThemedNextButton
                  coloredText={Colors.Yellow}
                  coloredButton={Images.asset41}
                  style={{
                    height: Metrics.moderateRatio(40),
                  }}
                  text={'STARTOVER'}
                  text2={'BOOK'}
                  iconStyle={styles.iconStyle}
                  textStyle={styles.textStyle}
                  onPress={() => {
                    props.navigation.navigate('ReadBook');
                  }}
                />
              </View>
              {/* Ratings */}
              <RatingsBar
                maxRating={maxRating}
                defaultRating={defaultRating}
                setDefaultRating={setDefaultRating}
                size={30}
                spacing={2}
              />
            </View>
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: Colors.Blue}}>
          <ImageBackground
            style={{width: null, height: null}}
            imageStyle={styles.bgImage}
            source={Images.asset124}>
            <Heading
              text="Related Books"
              textSize={18}
              textColor={Colors.white}
              customStyles={{
                backgroundColor: 'transparent',
                alignSelf: 'flex-start',
              }}
            />

            {!isLoading && (
              <BookList
                isRelatedBooks
                showCategory
                bookTitleColor={'white'}
                data={relatedBooks?.data}
                onPress={(route, data, index) => {
                  props.navigation.push('BookDetails', {
                    data: data.item,
                    bookCollection: [data.item],
                    selectedIndex: 0,
                  });

                  // navigate(route, data, props.books.favourites, index);
                }}
              />
            )}
          </ImageBackground>
        </View>
      </ScrollView>
    </HomeTemplate>
  );
};

export default connect(MapSateToProps, {postBookRating, getRelatedBooks})(
  BookFinished,
);
