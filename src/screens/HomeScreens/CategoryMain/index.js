import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AuthTemplate from '../../../containers/AuthTemplate';
import HomeTemplate from '../../../containers/HomeTemplate';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {getFeaturedImages} from '../../../actions/BooksActions';
import {Yellow, Blue} from '../../../common/Theme';
import HomeTabletTemplate from '../../../containers/HomeTabletTemplate';
import fonts from '../../../common/fonts';
import Sound from 'react-native-sound';
import FastImage from 'react-native-fast-image';

import {Images, Sounds, Metrics, Colors} from '../../../theme';
import {Text, FastImagePlaceholder} from '../../../components';
import {ThemedNextButton} from '../../../controls';
import {SoundHelper} from '../../../helpers';
import styles from './styles';

class CategoryMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.playSound();

    if (this.props?.route?.params?.selectedIndex !== undefined) {
      this._scrollToSection(this.props?.route?.params?.selectedIndex);

      this.handleSlideSound(this.props?.route?.params?.selectedIndex);
    }
  }

  componentWillUnmount() {
    SoundHelper.stopSound();
  }

  playSound = () => {
    SoundHelper.playSound(Sounds.mainSound, false, undefined, false);
  };

  _scrollToSection = (index) => {
    if (this.carouselRef) {
      this.carouselRef.snapToItem(index, true);
    }
  };

  componentDidUpdate() {
    if (this.props?.route?.params?.selectedIndex) {
      let i = this.props?.route?.params?.selectedIndex;
      // this.handleSlideSound(i);
    }
  }

  getCategoriesState = () => {
    const {books} = this.props;
    return [
      ...books.categories,
      {
        categoryinfo: {
          categorydetail: {
            audio: Sounds.quizScreen,
            image: Images.quizScreen,
            text:
              'Test your knowledge about the Quran & Sunnah, by taking our series of numerous quizzes that help your child learn, and memorize more facts about Deen.',
          },
          logo: Images.deenQuizLogo,
          name: 'QUIZZES',
        },
      },
      {
        categoryinfo: {
          categorydetail: {
            audio: Sounds.glossaryOverview,
            image: Images.glossaryScreen,
            text:
              'This section will help kids to understand Islamic terminology and memorize common words & their meanings with visual depictions.',
          },
          logo: null,
          name: 'ISLAMIC GLOSSARY',
        },
      },
    ];
  };

  renderCategoryImage = (itemImage) => {
    if (typeof itemImage == 'number') {
      return (
        <FastImage
          style={styles.bgImage}
          resizeMode={'cover'}
          source={itemImage}
        />
      );
    } else {
      return (
        <FastImagePlaceholder
          containerStyle={styles.bgImage}
          resizeMode={'cover'}
          source={{
            uri: itemImage,
            priority: FastImage.priority.high,
          }}
        />
      );
    }
  };

  _renderItem = ({item, i}) => (
    <View key={i} style={styles.item}>
      {this.renderCategoryImage(item.categoryinfo?.categorydetail?.image)}
      <View style={styles.subContainer}>
        <View style={styles.logoContainer}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.logo}
            source={
              typeof item.categoryinfo.logo == 'number'
                ? item.categoryinfo.logo
                : {
                    uri: item.categoryinfo.logo,
                  }
            }
          />
        </View>
        {this.renderPaginationControl()}
        <View style={styles.overlay}>
          <View style={styles.textContainer}>
            <Text size={10} color={Colors.white} style={styles.text}>
              {item.categoryinfo?.categorydetail?.text}
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <ThemedNextButton
              gradient={Colors.yellowGradient}
              style={styles.btn}
              text={'DISCOVER'}
              iconStyle={styles.iconStyle}
              textStyle={styles.textStyle}
              onPress={() => {
                SoundHelper.stopSound();

                if (item.categoryinfo.name === 'QUIZZES') {
                  this.playSound();
                  this.props.navigation.navigate('QuizShelf');
                } else if (item.categoryinfo.name === 'ISLAMIC GLOSSARY') {
                  this.playSound();
                  this.props.navigation.navigate('GlossaryScreen');
                } else {
                  this.playSound();
                  this.props.navigation.navigate('CategoryShelf', {
                    categoryid: item.categoryinfo.id,
                  });
                }
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );

  handleSlideSound = (i) => {
    const categories = this.getCategoriesState();
    const {categoryinfo} = categories[i];

    SoundHelper.stopSound(); //Stop previous sound

    if (categoryinfo.name == 'QUIZZES') {
      SoundHelper.playSound(Sounds.deenQuizOverview, true, undefined, false);
    } else if (categoryinfo.name == 'ISLAMIC GLOSSARY') {
      SoundHelper.playSound(Sounds.glossaryOverview, true, undefined, false);
    }

    if (categoryinfo?.categorydetail?.audio) {
      if (
        typeof categoryinfo.categorydetail.audio !== 'number' &&
        categoryinfo.categorydetail.audio.search(/http/i) > -1
      ) {
        SoundHelper.playSoundUri(categoryinfo.categorydetail.audio);
      } else {
        SoundHelper.playSound(
          categoryinfo.categorydetail.audio,
          true,
          undefined,
          false,
        );
      }
    }
  };

  renderScrollView = () => {
    const {navigation, books, route} = this.props;
    let newCategories = this.getCategoriesState();

    return (
      <HomeTemplate renderUser={true} navigation={navigation} back>
        <Carousel
          ref={(ref) => (this.carouselRef = ref)}
          data={newCategories}
          keyExtractor={(item) => item.categoryinfo.id}
          firstItem={route.params ? route.params?.selectedIndex : 0}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              this._scrollToSection(info.index);
            });
          }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          sliderWidth={Metrics.screenWidth}
          itemWidth={Metrics.screenWidth}
          style={{
            flex: 1,
            zIndex: 0,
          }}
          renderItem={this._renderItem}
          onSnapToItem={(i) => {
            this.setState({currentIndex: i}, () => {
              this.handleSlideSound(i);
            });
          }}
          enableMomentum={false}
          decelerationRate={'normal'}
          loop={false}
          useScrollView={true}
          swipeThreshold={15}
        />
      </HomeTemplate>
    );
  };

  renderPaginationControl = () => {
    let newCategories = this.getCategoriesState();

    return (
      <View
        style={{
          height: Metrics.doubleBaseMargin * 4,
        }}>
        <Pagination
          dotsLength={newCategories.length}
          activeDotIndex={this.state.currentIndex}
          carouselRef={this.carouselRef}
          dotStyle={{
            width: Metrics.ratio(8),
            height: Metrics.ratio(8),
            borderRadius: Metrics.ratio(5),
            marginHorizontal: 0,
            backgroundColor: Colors.Yellow,
          }}
          inactiveDotStyle={{
            width: Metrics.ratio(8),
            height: Metrics.ratio(8),
            borderRadius: Metrics.ratio(5),
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
    );
  };

  render() {
    return <View style={styles.container}>{this.renderScrollView()}</View>;
  }
}

export default connect(MapSateToProps, {
  getFeaturedImages,
})(CategoryMain);
