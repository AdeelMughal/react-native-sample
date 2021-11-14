// @flow
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';

import styles from './styles';

import {Switch, Text} from '../../components';
import {BookSettingsControl, RatePopup} from '../../controls';
import fonts from '../../common/fonts';
import {areEqual} from '../../util/commonUtils';
import {Metrics, Colors, Fonts, Images} from '../../theme';
import CustomizedPopup from '../../controls/Modals/CustomizedPopup';
import {DataHelper} from '../../helpers';
import {setAutoPlay} from '../../actions/generalActions';
import utils from '../../util';

export default AppHeader = React.memo((props) => {
  const {
    isBack,
    isSneakBack,
    isSettings,
    renderUser,
    isSwitch,
    switchText,
    onBack,
    onUserTap,
    auth,
    showLogo,
    ...rest
  } = props;

  const [isAutoPlayMode, setAutoPlayMode] = useState(
    DataHelper.getAutoPlayMode(),
  );

  useEffect(() => {
    DataHelper.getStore().dispatch(setAutoPlay(isAutoPlayMode));
  }, [isAutoPlayMode]);

  renderBackButton = () => {
    if (isSneakBack || isBack) {
      return (
        <TouchableOpacity
          style={styles.backButtonView}
          activeOpacity={0.8}
          onPress={() => {
            if (onBack) onBack();
          }}>
          <Image
            resizeMethod={'resize'}
            resizeMode={'contain'}
            style={styles.backImage}
            source={Images.backButton}
          />
        </TouchableOpacity>
      );
    }

    return null;
  };

  renderAppLogo = () => {
    return (
      <Image
        resizeMode={FastImage.resizeMode.contain}
        // resizeMode="contain"
        style={styles.appLogoImage}
        source={Images.logo}
      />
    );
  };

  renderUserView = () => {
    const fullName = auth?.user?.name ? auth?.user?.name : 'Guest';
    var displayName;

    if (fullName && fullName.length > 0) {
      const namearr = fullName.split(' ');

      if (namearr && namearr.length > 0) {
        displayName = namearr[0];
      } else {
        displayName = fullName;
      }
    }

    return (
      <TouchableOpacity
        style={styles.userView}
        onPress={() => {
          if (onUserTap) {
            onUserTap();
          }
        }}>
        <Text size={'xxxSmall'} style={styles.userName}>
          {utils.shortenString(displayName.toUpperCase())}
        </Text>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          // resizeMode="cover"
          style={styles.userImage}
          source={
            auth?.user?.image
              ? {uri: `${auth?.user?.image}`}
              : Images.guestKidAsset
          }
        />
      </TouchableOpacity>
    );
  };

  const toggleSwitch = () => setAutoPlayMode((previousState) => !previousState);

  const renderSwitch = () => (
    <View style={styles.switch}>
      <Text
        size={'xxxxSmall'}
        numberOfLines={1}
        color="white"
        style={{textAlign: 'center'}}>
        {switchText}
      </Text>
      <Switch value={isAutoPlayMode} toggleSwitch={toggleSwitch} />
    </View>
  );

  const renderSettings = () => {
    return (
      <View style={styles.settingView}>
        <BookSettingsControl {...rest} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <RatePopup />

      <View style={styles.emptyView} />

      {renderBackButton()}

      {showLogo && renderAppLogo()}

      {isSwitch && renderSwitch()}
      {isSettings && renderSettings()}
      {renderUser && renderUserView()}
    </View>
  );
}, areEqual);

AppHeader.propTypes = {
  isSwitch: PropTypes.bool,
  isBack: PropTypes.bool,
  isSneakBack: PropTypes.bool,
  isSettings: PropTypes.bool,
  renderUser: PropTypes.bool,
  onBack: PropTypes.func,
  onUserTap: PropTypes.func,
  auth: PropTypes.object,
  showLogo: PropTypes.bool,
};

AppHeader.defaultProps = {
  isSwitch: false,
  isBack: false,
  isSneakBack: false,
  isSettings: false,
  renderUser: true,
  onBack: undefined,
  onUserTap: undefined,
  auth: undefined,
  showLogo: true,
};
