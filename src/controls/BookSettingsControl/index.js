// @flow
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';

import styles from './styles';

import {areEqual} from '../../util/commonUtils';
import {ButtonView} from '../../components';
import {Metrics, Colors, Fonts, Images} from '../../theme';
import {useNavigation, StackActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DataHelper} from '../../helpers';

export default BookSettingsControl = React.memo((props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAudio, setIsAudio] = useState(props.isAudio);
  const navigation = useNavigation();

  useEffect(() => {
    DataHelper.setBookReaderSound(isAudio);
  }, [isAudio]);

  onSettingsTapped = () => {
    setIsExpanded(!isExpanded);
  };

  const renderExpandedOptions = () => {
    const {onBookmarkTapped, onStartoverTapped} = props;

    return (
      <View style={styles.expandableContainer}>
        <ButtonView onPress={onSettingsTapped} style={styles.button}>
          <Image
            style={styles.buttonImage}
            resizeMethod="resize"
            resizeMode="contain"
            source={Images.asset267}
          />
        </ButtonView>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(StackActions.popToTop());
          }}
          style={styles.button}>
          <Image
            style={styles.childbuttonImage}
            resizeMethod="resize"
            resizeMode="contain"
            source={Images.asset260}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsAudio(!isAudio);
          }}>
          <Image
            style={styles.childbuttonImage}
            resizeMethod="resize"
            resizeMode="contain"
            source={isAudio ? Images.asset259 : Images.asset263}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (onBookmarkTapped) {
              onBookmarkTapped();
            }
          }}>
          <Image
            style={styles.childbuttonImage}
            resizeMethod="resize"
            resizeMode="contain"
            source={Images.asset262}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (onStartoverTapped) {
              onStartoverTapped();
            }
          }}>
          <Image
            style={styles.childbuttonImage}
            resizeMethod="resize"
            resizeMode="contain"
            source={Images.asset261}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderCollapsedOptions = () => {
    return (
      <ButtonView onPress={onSettingsTapped} style={styles.button}>
        <Image
          style={styles.buttonImage}
          resizeMethod="resize"
          resizeMode="contain"
          source={Images.asset267}
        />
      </ButtonView>
    );
  };

  return (
    <View style={styles.container}>
      {isExpanded ? renderExpandedOptions() : renderCollapsedOptions()}
    </View>
  );
}, areEqual);

BookSettingsControl.propTypes = {
  onBookmarkTapped: PropTypes.func,
  onStartoverTapped: PropTypes.func,
};

BookSettingsControl.defaultProps = {
  onBookmarkTapped: undefined,
  onStartoverTapped: undefined,
};
