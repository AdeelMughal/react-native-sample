// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Text, View, SafeAreaView, Image} from 'react-native';
import Video from 'react-native-video';

import {appInitialized} from '../../../actions/AuthActions';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {ThemedNextButton} from '../../../controls';
import {ButtonView} from '../../../components';
import styles from './styles';
import {Videos, Metrics, Images} from '../../../theme';
import utils from '../../../util';
class Splash extends Component {
  componentDidMount() {
    const {auth} = this.props;
    const {user, sneakpeak} = auth;

    // setTimeout(() => {
    //   if (user?.id || sneakpeak) {
    //     this.props.navigation.replace('Dashboard');
    //   } else {
    //     this.props.navigation.replace('Launch');
    //   }
    // }, 3000);

    if (!utils.isRelease()) {
      this.onSkip();
    }
  }

  onSkip = () => {
    const {auth} = this.props;
    const {user, sneakpeak} = auth;

    this.props.appInitialized();

    if (user?.id || sneakpeak) {
      this.props.navigation.replace('Dashboard');
    } else {
      this.props.navigation.replace('Launch');
    }
  };

  render() {
    const videoHeight = Metrics.screenHeight * 0.9;

    return (
      <View style={styles.container}>
        {utils.isRelease() && (
          <Video
            source={Videos.introVid}
            ref={(ref) => {
              this.player = ref;
            }} // Store reference
            style={styles.backgroundVideo}
            onEnd={this.onSkip}
          />
        )}
        <ButtonView
          onPress={this.onSkip}
          style={{
            position: 'absolute',
            top: (Metrics.screenHeight - videoHeight) / 2,
            right: Metrics.smallMargin,
            width: Metrics.ratio(44) * 1.5,
            height: Metrics.ratio(44),
          }}>
          <Image
            resizeMethod={'resize'}
            resizeMode={'contain'}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'contain',
            }}
            source={Images.skipIcon}
          />
        </ButtonView>
      </View>
    );
  }
}

const actions = {appInitialized};

export default connect(MapSateToProps, actions)(Splash);
