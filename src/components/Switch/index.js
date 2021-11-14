import React from 'react';
import {View, Image} from 'react-native';
import {Switch} from 'react-native-switch';

// import FastImage from 'react-native-fast-image';

import {Text} from '../../components';
import {Colors, Images} from '../../theme';
import styles from './styles';

const CustomSwitch = ({
  value,
  toggleSwitch,
  onText = 'On',
  offText = 'Off',
}) => {
  return (
    <View style={styles.btnContainer}>
      <View activeOpacity={0.8} style={styles.btn}>
        <View style={styles.btnTextContainer}>
          <Text
            color={'white'}
            numberOfLines={1}
            size={'xxxxSmall'}
            style={styles.btnText}>
            {value ? onText : offText}
          </Text>
        </View>
        <View style={styles.btnIconContainer}>
          <Switch
            value={value}
            onValueChange={toggleSwitch}
            activeText={''}
            inActiveText={''}
            circleSize={25}
            circleBorderWidth={0}
            circleInActiveColor={Colors.themeColors.mediumBlue}
            circleActiveColor={Colors.themeColors.mediumBlue}
            backgroundActive={Colors.themeColors.mediumBlue}
            backgroundInactive={Colors.themeColors.mediumBlue}
            renderInsideCircle={() => (
              <Image source={Images.switchIcon} style={styles.switchIcon} />
            )}
            changeValueImmediately={true}
            renderActiveText={true}
            renderInActiveText={true}
            switchBorderRadius={25}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomSwitch;
