import React from 'react';
import {View, Image} from 'react-native';
import {Images, Colors} from '../../theme';
import {Text} from '../../components';
import styles from './styles';

const EmptyBookmark = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode={'contain'}
          style={styles.image}
          source={Images.emptyBookmarks}
        />
      </View>

      <View style={styles.textContainer}>
        <Text size="xxxSmall" color={Colors.Blue}>
          Read the books across all categories
        </Text>
        <Text style={{textAlign: 'center'}} color={Colors.Blue}>
          And TAP THE <Text color={Colors.orange}>"BOOKMARKS"</Text> under
          setting dropdown
        </Text>
      </View>
    </View>
  );
};

export default EmptyBookmark;
