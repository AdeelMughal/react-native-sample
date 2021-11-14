import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AuthTemplate from '../../../containers/AuthTemplate';
import HomeTemplate from '../../../containers/HomeTemplate';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {getFeaturedImages, getRewards} from '../../../actions/BooksActions';
import {Yellow, Blue} from '../../../common/Theme';
import HomeTabletTemplate from '../../../containers/HomeTabletTemplate';
import {Text} from '../../../components';
import fonts from '../../../common/fonts';
import Sound from 'react-native-sound';
import FastImage from 'react-native-fast-image';
import {Metrics, Images, Sounds, Colors} from '../../../theme';
import styles from './styles';
import {ThemedNextButton} from '../../../controls';
import {SoundHelper, DataHelper} from '../../../helpers';

class RewardsScreen extends Component {
  componentDidMount() {
    if (DataHelper.isChildLoggedIn()) {
      this.props.getRewards(DataHelper.getUserObject().id);
    }

    setTimeout(() => this.playSound(Sounds.gateToJannah), 2000);
  }

  playSound = (sound) => {
    SoundHelper.playSound(sound);
  };

  renderScrollView = () => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.scrollview}>
        <View style={styles.subContainer}>
          <FastImage
            style={styles.bgImage}
            resizeMode={FastImage.resizeMode.cover}
            source={Images.gtjOverview}
          />

          <View style={styles.bottom}>
            <View style={styles.textContainer}>
              <Text size={10} color={Colors.white} style={styles.text}>
                A reward system to know your child reading statistics, it is a
                book reading motivation scale which will help the child to know
                more about deen and improve the score.
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <ThemedNextButton
                gradient={Colors.yellowGradient}
                style={{
                  height: Metrics.moderateRatio(40),
                  borderWidth: Metrics.moderateRatio(3),
                  borderColor: Colors.Blue,
                }}
                text={'DISCOVER'}
                iconStyle={styles.iconStyle}
                textStyle={styles.textStyle}
                onPress={() => {
                  this.playSound(Sounds.gtjpointsystem);
                  this.props.navigation.navigate('RewardDetails');
                }}
              />
            </View>
          </View>
          <View style={styles.logoContainer}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.logo}
              source={Images.gtjLogo}
            />
          </View>
        </View>
      </ScrollView>
    );
  };

  renderLoader = () => {
    return (
      <View
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color={Yellow} />
      </View>
    );
  };

  render() {
    return (
      <HomeTemplate renderUser={true}>
        <View
          style={{width: Metrics.screenWidth, alignItems: 'center', flex: 1}}>
          {this.renderScrollView()}
        </View>
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {
  getFeaturedImages,
  getRewards,
})(RewardsScreen);
