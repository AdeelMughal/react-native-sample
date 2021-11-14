import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, ImageBackground, FlatList} from 'react-native';
import {Text, ActivityLoader} from '../../../components';
import Dash from 'react-native-dash';
import {
  UserAvatarTickControl,
  ThemedButton,
  ThemedNextButton,
} from '../../../controls';
import HomeTemplate from '../../../containers/HomeTemplate';
import styles from './styles';
import {Colors, Images, Metrics} from '../../../theme';
import {getAllNotifications} from '../../../actions/NotificationActions';
import {useDispatch, useSelector} from 'react-redux';
import {areEqual} from '../../../util/commonUtils';
import {DataHelper} from '../../../helpers';

export default Notifications = React.memo((props) => {
  const dispatch = useDispatch();

  const allNotifications = useSelector(
    (state) => state.notification?.allNotifications,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(DataHelper.getAllNotifications());
    setLoading(false);
  }, []);

  const _renderItem = ({item, index}) => {
    return (
      <View style={{}}>
        {index !== 0 && separator()}
        <View style={styles.notificationContainer}>
          <View style={styles.subtitle}>
            <View style={{flex: 0.75}}>
              <Text color="white" size="large">
                {item.subject}
              </Text>
            </View>
            <View style={{flex: 0.25}}>
              <Text size="xxSmall">
                {new Date(item.created_at).toLocaleDateString()}
              </Text>
            </View>
          </View>
          <Text color="white" size="xSmall">
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  const separator = () => {
    return (
      <Dash
        dashColor={'white'}
        dashGap={Metrics.ratio(5)}
        dashThickness={Metrics.ratio(1)}
        dashLength={Metrics.ratio(4)}
        style={{flex: 1}}
      />
    );
  };

  return (
    <HomeTemplate renderUser={true} style={styles.container} back>
      <ImageBackground
        style={{width: '100%', flex: 1}}
        source={Images.asset124}>
        <View style={{marginTop: Metrics.moderateRatio(15)}}>
          <ActivityLoader isLoading={loading} />

          <FlatList
            data={allNotifications}
            renderItem={_renderItem}
            keyExtractor={(item, id) => item.id}
          />
        </View>
      </ImageBackground>
    </HomeTemplate>
  );
}, areEqual);
