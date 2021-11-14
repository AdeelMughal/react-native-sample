// @flow
import {connect} from 'react-redux';
import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {AppHeader} from '../../../controls';

const InternalWebView = (props) => {
  const {route, navigation} = props;
  const {uri = '', onComplete = () => {}} = route.params;
  const [isLoading, setLoader] = useState(true);
  const _onLoad = (state) => {
    setLoader(false);
  };

  const renderHeader = () => {
    const {back, showLogo, renderUser} = {
      back: true,
      showLogo: false,
      renderUser: false,
    };

    return (
      <AppHeader
        showLogo={showLogo}
        isBack={back}
        renderUser={renderUser}
        onBack={() => {
          navigation.pop();
        }}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      {isLoading && (
        <View style={styles.loaderView}>
          <ActivityIndicator />
        </View>
      )}
      {renderHeader()}
      <WebView
        androidHardwareAccelerationDisabled={true}
        // ref={(ref) => {
        //   this.webView = ref;
        // }}
        source={{uri: uri}}
        onNavigationStateChange={_onLoad}
        style={[
          // {
          //   opacity: 0.99,
          //   overflow: 'hidden',
          // },
          styles.container,
        ]}
        onError={(syntheticEvent) => {
          const {nativeEvent} = syntheticEvent;
          console.log('WebView error: ', nativeEvent);
        }}
        onLoadProgress={(e) => console.log(e.nativeEvent.progress)}
        // renderLoading={() => <ActivityIndicator />}
      />
    </View>
  );
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(InternalWebView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loaderView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    left: 0,
    zIndex: 2,
  },
});
