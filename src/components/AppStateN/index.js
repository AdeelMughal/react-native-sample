import React, {useEffect, useState} from 'react';
import {AppState as AppStateRN, Platform} from 'react-native';
import {SoundHelper} from '../../helpers';

const AppStateN = (props) => {
  const [appState, setAppState] = useState(AppStateRN.currentState);

  useEffect(() => {
    function handleAppStateChange(nextAppState) {
      const {handleAppState} = props;

      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        if (Platform.OS === 'ios') {
          // AnalyticsHelper.trackiOSAppLaunch();
        }
      }

      if (nextAppState === 'active') {
        SoundHelper.onEnterForeground();
      }

      if (nextAppState === 'background') {
        SoundHelper.onEnterBackground();
      }

      if (handleAppState) {
        handleAppState(nextAppState);
      }

      setAppState(nextAppState);
    }

    AppStateRN.addEventListener('change', handleAppStateChange);

    return () => {
      AppStateRN.removeEventListener('change', handleAppStateChange);
    };
  });

  return null;
};

export default AppStateN;
