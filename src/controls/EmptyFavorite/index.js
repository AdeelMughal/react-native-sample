import React from 'react';
import {View, Image} from 'react-native';
import {Images, Colors} from '../../theme';
import {Text} from '../../components';
import styles from './styles';

const EmptyFavorite = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode={'contain'}
          style={styles.image}
          source={Images.emptyFavorites}
        />
      </View>

      <View style={styles.textContainer}>
        <Text size="xxxSmall" color={Colors.Blue}>
          OPEN A BOOK, EXPLORE ART WORLD & DO FUN ACTIVITY
        </Text>
        <Text style={{textAlign: 'center'}} color={Colors.Blue}>
          And TAP THE <Text color={Colors.orange}>"FAVOURITE"</Text>under BUTTON
        </Text>
      </View>
    </View>
  );
};

export default EmptyFavorite;
