import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {Images, Metrics, Colors} from '../../../theme';
import {Text} from '../../../components';
import HomeTemplate from '../../../containers/HomeTemplate';
import CarouselCards from '../../../controls/CarouselCards';
import {BaseExclaimModal, RatingsBar} from '../../../controls';
import Filters from '../../../controls/Filters';
import ShelfList from '../../../controls/ShelfList';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {getQuiz} from '../../../actions/BooksActions';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const QuizStart = (props) => {
  const navigation = useNavigation();
  const [quiz, setQuiz] = useState([]);
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [restrictModal, setRestrictModal] = React.useState(false);

  useEffect(() => {
    const payload = {
      bookid: props.route.params.bookid,
      quizid: props.route.params.quizid,
    };
    props.getQuiz(payload);
  }, []);
  useEffect(() => {
    setQuiz(props.books.quiz);
  }, [props.books.quiz]);
  return (
    <HomeTemplate
      back
      renderUser={true}
      navigation={props.navigation}
      backgroundColor="white">
      <ImageBackground style={styles.imageBg} source={Images.yellowback}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={styles.scrollview}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <FastImage
                style={styles.titleImage}
                resizeMode={FastImage.resizeMode.contain}
                source={Images.quizAsset}
              />
            </View>

            <View style={styles.actionContainer}>
              <View style={styles.bookContainer}>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.bookImage}
                  source={{uri: props.route.params.image}}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => props.navigation.pop()}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.btnImage}
                    source={Images.skip}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    if (props.auth.user) {
                      if (props.books?.quiz?.questions?.length > 0) {
                        props.navigation.navigate('QuizPage', {
                          mode: 'take quiz',
                          image: props.route.params.image,
                        });
                      } else {
                        alert('Quiz not available, try again later');
                      }
                    } else {
                      setRestrictModal(true);
                    }
                  }}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.btnImage}
                    source={Images.start}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <RatingsBar
              isReadOnly
              maxRating={maxRating}
              defaultRating={defaultRating}
              setDefaultRating={setDefaultRating}
              size={40}
              spacing={4}
            />
            <View style={styles.bottomContainer}>
              <Text style={styles.text}>
                Time to test your knowledge and see how many questions you can
                answer correctly
              </Text>
            </View>
          </View>
        </ScrollView>
        <BaseExclaimModal
          doShowModal={restrictModal}
          navigation={navigation}
          onClose={() => {
            setRestrictModal(false);
          }}
          text1={'MEMBERS AREA'}
          text2={'Not a member yet? Join Now!'}
          onSignupTap={() => {
            this.setState({modal: false}, () => {
              this.props.removeSneakPeak();
            });
          }}
        />
      </ImageBackground>
    </HomeTemplate>
  );
};

export default connect(MapSateToProps, {getQuiz})(QuizStart);
