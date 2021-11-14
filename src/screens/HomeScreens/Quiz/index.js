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
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {getQuiz} from '../../../actions/BooksActions';
import styles from './styles';

const Quiz = (props) => {
  const [quiz, setQuiz] = useState([]);
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  return (
    <HomeTemplate
      back
      renderUser={true}
      navigation={props.navigation}
      backgroundColor="white">
      <ImageBackground style={styles.imageBg} source={Images.asset8}>
        <ScrollView style={styles.scrollview}>
          <View
            style={{
              width: Metrics.screenWidth,
              flex: 1,
              alignItems: 'center',
              marginBottom: 20,
            }}></View>
        </ScrollView>
      </ImageBackground>
    </HomeTemplate>
  );
};

export default connect(MapSateToProps, {})(Quiz);
