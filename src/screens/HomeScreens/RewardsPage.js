import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Modal,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import AuthTemplate from '../../containers/AuthTemplate';
import HomeTemplate from '../../containers/HomeTemplate';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import {removeSneakPeak} from '../../actions/AuthActions';
import {
  getQuiz,
  getRewards,
  getStats,
  getGoodDeeds,
} from '../../actions/BooksActions';
import {Inputs, ActivityLoader} from '../../components';
import {Yellow, Blue, orange, TextInputColor} from '../../common/Theme';
import HomeTabletTemplate from '../../containers/HomeTabletTemplate';
import fonts from '../../common/fonts';
import Sound from 'react-native-sound';
import FastImage from 'react-native-fast-image';
import images from '../../common/test.js';
import {Images, Metrics, Sounds} from '../../theme';
import {DataHelper} from '../../helpers';

const rewardsData = [
  {
    image: Images.pagesFlipped,
    id: 'pagesflipped',
  },
  {
    image: Images.booksRead,
    id: 'bookreadcount',
  },
  {
    image: Images.goodDeeds,
    id: 'gooddeeds',
  },
  {
    image: Images.readTime,
    id: 'readtime',
  },
  {
    image: Images.wrongAnswer,
    id: 'totalwronganswers',
  },
  {
    image: Images.correctAnswer,
    id: 'totalrightanswers',
  },
  {
    image: Images.activityPrinted,
    id: 'printed',
  },
  {
    image: Images.quizTaken,
    id: 'quizzestaken',
  },
];

class RewardsPage extends Component {
  state = {
    stars: 1,
    lookInside: false,
    heart: true,
  };

  componentDidMount() {
    this.getChildData();
  }

  getChildData = () => {
    let childId = DataHelper.getUserObject()?.id;
    this.props.getRewards(childId);
    this.props.getStats(childId);
    this.props.getGoodDeeds(childId);
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.auth.user?.id !== nextProps.auth.user?.id &&
      nextProps.auth.user?.id
    ) {
      this.getChildData();
    }
  }

  renderData = ({item, index}) => {
    const count = this.props?.books?.rewards[item.id] ?? 0;

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          resizeMode={FastImage.resizeMode.contain}
          style={{
            marginLeft: Metrics.smallMargin,
            width: Metrics.moderateRatio(250),
            height: '100%',
          }}
          source={item.image}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              top: Metrics.moderateRatio(100),
            }}>
            <Text
              style={{
                fontFamily: fonts.CARTERONE,
                color: Yellow,
                fontSize: Metrics.moderateRatio(60),
              }}>
              {this.props.auth.sneakpeak ? '0' : count}{' '}
            </Text>

            <Text
              style={{
                fontFamily: fonts.CARTERONE,
                color: 'white',
                fontSize: Metrics.moderateRatio(24),
              }}>
              {`${index == 2 ? 'POINTS' : ''}`}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderLoader = () => {
    return (
      <View style={{zIndex: 1000}}>
        <ActivityLoader isLoading={this.props?.general?.isLoading} />
      </View>
    );
  };

  render() {
    return (
      <HomeTemplate
        renderUser={true}
        navigation={this.props.navigation}
        home
        back>
        <SafeAreaView style={{width: '100%', flex: 1}}>
          <ImageBackground
            style={{width: '100%', flex: 1}}
            source={Images.back}>
            {this.renderLoader()}
            <View
              style={{
                flex: 0.3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FastImage
                // resizeMode="contain"
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: Metrics.screenWidth - Metrics.moderateRatio(40),
                  height: Metrics.moderateRatio(140),
                }}
                source={Images.topImage}
              />
            </View>
            <View style={{flex: 0.7}}>
              <FlatList
                data={rewardsData}
                keyExtractor={(item, index) => item.id}
                horizontal={true}
                renderItem={this.renderData}
              />
            </View>
          </ImageBackground>
        </SafeAreaView>
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {
  getQuiz,
  removeSneakPeak,
  getStats,
  getRewards,
  getGoodDeeds,
})(RewardsPage);
