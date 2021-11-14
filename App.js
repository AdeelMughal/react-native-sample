import React, {Component} from 'react';
import {
  AppRegistry,
  StatusBar,
  Text,
  View,
  NativeModules,
  LogBox,
} from 'react-native';
import Routes from './Routes';
import {Provider} from 'react-redux';
// import Package from './src/screens/AuthScreens/Package';
import {getAllAvatars} from './src/actions/AuthActions';
import {getLaunchContent} from './src/actions/contentAction';
import Orientation from 'react-native-orientation-locker';

import Utils from './src/util';
import configureStore from './src/store';
import applyConfigSettings from './src/config';
import {DataHelper, NotificationsHelper, SoundHelper} from './src/helpers';
import {onAppStateChanged} from './src/actions/navigationActions';
import {AppStateN as AppStateComponent} from './src/components';
import {Sounds} from './src/theme';

// import * as Sentry from '@sentry/react-native';

// Sentry.init({
//   dsn:
//     'https://1a6d8aaf4ac743378242fa27e38f7ac1@o495598.ingest.sentry.io/5568576',
// });

const reducers = require('./src/reducer').default;

applyConfigSettings();

export default class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
      this.setState({isLoading: false}, () => {
        DataHelper.setStore(this.state.store);

        this.loadingCompleted();
      });
    }),
  };

  componentDidMount() {
    // if (Utils.isPlatformAndroid()) NativeModules.SplashScreen.hide();
    // NativeModules.SplashScreen.hide();

    this.state.store.dispatch(getLaunchContent());
    this.state.store.dispatch(getAllAvatars());

    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();

    this.lockOrientation();
  }

  loadingCompleted = () => {
    NotificationsHelper.appMount();

    NotificationsHelper.getToken();
    NotificationsHelper.refreshToken();

    SoundHelper.playBackgroundSound(Sounds.background);
  };

  lockOrientation = () => {
    Orientation.lockToPortrait();
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }

    console.disableYellowBox = true;

    return (
      <View style={{flex: 1}}>
        <StatusBar hidden />
        <Provider store={this.state.store}>
          <Routes />
        </Provider>
        <AppStateComponent
          handleAppState={(nextState) => {
            this.state.store.dispatch(onAppStateChanged(nextState));
          }}
        />
      </View>
    );
  }
}
