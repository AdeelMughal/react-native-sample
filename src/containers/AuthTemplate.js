import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';

import FastImage from 'react-native-fast-image';

import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {MapSateToProps} from '../common/MapDisptacher';
import fonts from '../common/fonts';
import DeviceInfo from 'react-native-device-info';
import {Images, Metrics, Colors} from '../theme';
import {ThemeNavigationButton} from '../controls';

// import { Camera } from "expo-camera";
let isTablet = DeviceInfo.isTablet();
class AuthTemplate extends Component {
  state = {
    gender: 1,
  };

  renderNavigationBackButton = () => {
    let exclamation;

    if (this.props.alhamd) {
      exclamation = 'ALHAMDULILLAH';
    }

    if (this.props.mash) {
      exclamation = 'MASHAALLAH';
    }

    return (
      <ThemeNavigationButton
        heading={this.props.heading}
        exclamation={exclamation}
        noBack={this.props.noBack}
        onBack={() => {
          this.props.noBack ? null : this.props.navigation.goBack();
        }}
      />
    );
  };

  renderFullHeader = () => (
    <ImageBackground source={Images.headerBackdrop} style={styles.headBox1}>
      {this.props.noBack ? null : (
        <TouchableOpacity
          style={styles.backBtnContainer}
          onPress={() => this.props.navigation.goBack()}>
          <FastImage source={Images.asset55} style={styles.backBtn} />
        </TouchableOpacity>
      )}
      <FastImage source={Images.logo} style={styles.logo} />
    </ImageBackground>
  );

  render() {
    const {
      fullHeader,
      noHeading,
      scroll,
      children,
      behavior,
      keyboardVerticalOffset,
    } = this.props;

    return (
      <KeyboardAvoidingView
        style={{flex: 1, height: '100%'}}
        behavior={
          behavior ? behavior : Platform.OS === 'ios' ? 'padding' : null
        }
        keyboardVerticalOffset={
          keyboardVerticalOffset ? keyboardVerticalOffset : Metrics.ratio(10)
        }>
        <ImageBackground
          source={Images.asset122}
          style={{width: '100%', flex: 1}}
          resizeMode="cover">
          <SafeAreaView
            style={{
              width: '100%',
              flex: 1,
              marginTop: fullHeader ? 0 : StatusBar.currentHeight,
            }}>
            {fullHeader ? (
              this.renderFullHeader()
            ) : (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginTop: Metrics.baseMargin,
                }}>
                {noHeading ? null : this.renderNavigationBackButton()}
              </View>
            )}
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              style={{width: '100%'}}
              scrollEnabled={scroll || false}>
              {children}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  headBox1: {
    width: '100%',
    alignItems: 'center',
    height: Metrics.moderateRatio(152),
    position: 'relative',
  },
  logo: {
    marginTop: Metrics.moderateRatio(41),
    width: Dimensions.get('window').width / 1.4,
    height: Dimensions.get('screen').width / 3,
    zIndex: 1,
  },
  backBtn: {
    height: Metrics.moderateRatio(30),
    width: Metrics.moderateRatio(30),
    position: 'absolute',
    top: Metrics.moderateRatio(5),
  },
  backBtnContainer: {
    position: 'absolute',
    top: Metrics.moderateRatio(10),
    left: Metrics.moderateRatio(20),
    padding: Metrics.moderateRatio(20),
  },
});

export default connect(MapSateToProps)(AuthTemplate);
