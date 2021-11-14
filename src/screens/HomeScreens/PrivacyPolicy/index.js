import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Text, ActivityLoader} from '../../../components';
import Dash from 'react-native-dash';
import {
  UserAvatarTickControl,
  ThemedButton,
  ThemedNextButton,
} from '../../../controls';
import HomeTemplate from '../../../containers/HomeTemplate';
import {styles} from './styles';
import {Colors, Images, Metrics} from '../../../theme';
import {getAllNotifications} from '../../../actions/NotificationActions';
import {useDispatch, useSelector} from 'react-redux';
import {areEqual} from '../../../util/commonUtils';
import {DataHelper} from '../../../helpers';

export default PrivacyPolicy = React.memo((props) => {
  const dispatch = useDispatch();

  const privacyPolicy = useSelector((state) => state?.content?.privacyPolicy);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // if (!privacyPolicy) {
    dispatch(DataHelper.getPrivacyPolicy());
    // }
    setLoading(false);
    console.log(privacyPolicy?.text, 'privacyPolicy');
  }, []);

  const loadingIndicatorView = () => <ActivityLoader />;

  return (
    <HomeTemplate renderUser={true} style={styles.container} back>
      <ImageBackground
        style={styles.imgBackgroundContainer}
        source={Images.asset124}>
        <View style={styles.notificationContainer}>
          <Text color="white" size="xxLarge">
            {privacyPolicy?.type || ''}
          </Text>

          <View style={styles.webViewContainer}>
            <WebView
              originWhitelist={['*']}
              source={{html: privacyPolicy?.text || ''}}
              renderLoading={loadingIndicatorView}
              startInLoadingState={true}
              style={{backgroundColor: 'transparent'}}
              scalesPageToFit={false}
            />
          </View>
        </View>
      </ImageBackground>
    </HomeTemplate>
  );
}, areEqual);
