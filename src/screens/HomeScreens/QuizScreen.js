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
} from 'react-native';
import AuthTemplate from '../../containers/AuthTemplate';
import HomeTemplate from '../../containers/HomeTemplate';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import {getQuiz} from '../../actions/BooksActions';
import {Yellow, Blue} from '../../common/Theme';
import HomeTabletTemplate from '../../containers/HomeTabletTemplate';
import fonts from '../../common/fonts';
import FastImage from 'react-native-fast-image';
import {Images} from '../../theme';

class QuizScreen extends Component {
  state = {
    stars: 1,
    heart: false,
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      if (this.props.books.quiz?.questions?.length > 0) {
        return 0;
      }

      this.props.getQuiz(this.props.books.selectedBook.id);
    });
  }

  render() {
    return (
      <HomeTemplate
        renderUser={true}
        navigation={this.props.navigation}
        back
        home>
        <ImageBackground
          style={{width: '100%', flex: 1}}
          source={Images.yellowback}>
          <View style={{width: '100%', flex: 1}}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{
                width: '100%',
                flex: 1,
                paddingTop: 0,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FastImage
                  style={{
                    width: 300,
                    height: 200,
                    // resizeMode: "contain",
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  source={Images.quizAsset}
                />

                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <FastImage
                      // resizeMode="contain"
                      resizeMode={FastImage.resizeMode.contain}
                      style={{
                        width: 150,
                        height: 250,

                        zIndex: 1,
                        flex: 1,
                      }}
                      source={{uri: this.props.route.params.image}}
                    />
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      justifyContent: 'space-evenly',
                      marginHorizontal: 20,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => this.props.navigation.pop()}>
                      <FastImage
                        // resizeMode="cover"
                        resizeMode={FastImage.resizeMode.cover}
                        style={{
                          width: 60,
                          height: 60,

                          zIndex: 1,
                        }}
                        source={Images.skip}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        if (this.props.books?.quiz?.questions?.length > 0) {
                          this.props.navigation.navigate('QuizPage', {
                            mode: 'take quiz',
                          });
                        } else {
                          alert('Quiz not available, try again later');
                        }
                      }}>
                      <FastImage
                        // resizeMode="cover"
                        resizeMode={FastImage.resizeMode.cover}
                        style={{
                          width: 60,
                          height: 60,

                          zIndex: 1,
                          marginTop: 20,
                        }}
                        source={Images.start}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        stars: 1,
                      })
                    }
                    activeOpacity={0.5}>
                    <FastImage
                      style={{
                        width: 30,
                        height: 30,
                        marginHorizontal: 5,
                        // backgroundColor:'red'
                      }}
                      source={
                        this.state.stars == 1 || this.state.stars > 1
                          ? Images.star
                          : Images.starempty
                      }
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        stars: 2,
                      })
                    }
                    activeOpacity={0.5}>
                    <FastImage
                      style={{
                        width: 30,
                        height: 30,
                        marginHorizontal: 5,
                      }}
                      source={
                        this.state.stars == 2 || this.state.stars > 2
                          ? Images.star
                          : Images.starempty
                      }
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        stars: 3,
                      })
                    }
                    activeOpacity={0.5}>
                    <FastImage
                      style={{
                        width: 30,
                        height: 30,
                        marginHorizontal: 5,
                      }}
                      source={
                        this.state.stars == 3 || this.state.stars > 3
                          ? Images.star
                          : Images.starempty
                      }
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        stars: 4,
                      })
                    }
                    activeOpacity={0.5}>
                    <FastImage
                      style={{
                        width: 30,
                        height: 30,
                        marginHorizontal: 5,
                      }}
                      source={
                        this.state.stars == 4 || this.state.stars > 4
                          ? Images.star
                          : Images.starempty
                      }
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        stars: 5,
                      })
                    }
                    activeOpacity={0.5}>
                    <FastImage
                      style={{
                        width: 30,
                        height: 30,
                        marginHorizontal: 5,
                      }}
                      source={
                        this.state.stars == 5 || this.state.stars > 5
                          ? Images.star
                          : Images.starempty
                      }
                    />
                  </TouchableOpacity>
                </View>
                <View style={{width: '90%', alignItems: 'center'}}>
                  <View style={{width: '70%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'rgba(255,0,0,0.6)',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontFamily: fonts.CARTERONE,
                        lineHeight: 18,
                      }}>
                      Time to test your knowledge and see how many questions you
                      can answer correctly
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {
  getQuiz,
})(QuizScreen);
