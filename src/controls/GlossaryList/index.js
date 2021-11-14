import React from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Images, Metrics, Colors} from '../../theme';
import {Text} from '../../components';
import styles from './styles';
import {GlossaryItem} from '../../controls';
import * as Animatable from 'react-native-animatable';
import {DataHelper} from '../../helpers';
import _ from 'lodash';

const GlossaryList = ({customStyle, data, onPress}) => {
  const filtered = data?.filter((thisEl) => {
    return thisEl.glossaryid !== undefined && thisEl.glossaryid !== null;
  });

  const fullObjects = filtered.map((item) => {
    const glossaryObject = DataHelper.getGlossaryObjectFromId(item.glossaryid);
    return glossaryObject;
  });

  const sorted = _.clone(fullObjects).sort((a, b) =>
    a.word.localeCompare(b.word),
  );

  return (
    <>
      <View style={[styles.container, {...customStyle}]}>
        <View style={styles.subContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollview}>
            {sorted?.map((item) => {
              return <GlossaryItem item={item} onPress={onPress} />;
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default GlossaryList;
