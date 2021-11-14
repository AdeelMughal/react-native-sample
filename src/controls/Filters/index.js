import React, {useState} from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Images, Metrics, Colors} from '../../theme';
import {Text} from '../../components';
import styles from './styles';
import FilterItem from '../FilterItem';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const Filters = ({
  categories,
  onPressItem,
  isOpened,
  onToggle,
  onFilterPress,
}) => {
  const navigation = useNavigation();
  const [FiltersArr, setFiltersArr] = useState([
    {
      text: 'AGE 4-7',
      image: Images.asset68,
      value: 'isLowerAgeRange',
      isTapped: 0,
    },
    {
      text: 'AGE 8-12',
      image: Images.asset69,
      value: 'isUpperAgeRange',
      isTapped: 0,
    },
    {
      text: 'NEW ADDITION',
      image: Images.asset72,
      value: 'isnewaddition',
      isTapped: 0,
    },
    {
      text: 'POPULAR BOOKS',
      image: Images.asset73,
      value: 'ispopularbooks',
      isTapped: 0,
    },
    {
      text: 'FEATURED',
      image: Images.asset71,
      value: 'isfeatured',
      isTapped: 0,
    },
    {
      text: 'BEST RATED',
      image: Images.asset70,
      value: 'israted',
      isTapped: 0,
    },
  ]);

  let newCategories = [...categories];
  newCategories.push(
    {
      imageUrl: Images.bookCat3,
      title: 'DEEN QUIZZES',
    },
    {
      imageUrl: Images.bookCat5,
      title: 'ISLAMIC GLOSSARY',
    },
  );

  const navigate = (index) => {
    navigation.navigate('Category_Main', {selectedIndex: index});
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.subContainer1}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollview}>
            {newCategories?.map((item, i) => (
              <TouchableOpacity
                onPress={() => {
                  if (
                    item.title === 'DEEN QUIZZES' ||
                    item.title === 'ISLAMIC GLOSSARY'
                  ) {
                    navigate(i);
                  } else {
                    onPressItem(item.id);
                  }
                }}
                style={styles.scrollItem}>
                <FastImage
                  style={styles.itemImage}
                  source={
                    typeof item.imageUrl == 'number'
                      ? item.imageUrl
                      : {uri: item.imageUrl}
                  }
                />
                <Text size="xxxxxSmall" style={styles.categoryText}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.subContainer2}>
          <TouchableOpacity
            onPress={() => {
              onToggle();
            }}
            style={styles.filterBtn}>
            <FastImage style={styles.filterImage} source={Images.filter} />
            <Text size="xxxSmall">Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isOpened ? (
        <Animatable.View
          style={{
            width: '100%',
            backgroundColor: 'rgba(0,172,238,0.5)',
          }}
          animation={'bounceIn'}>
          <ScrollView
            style={{width: '100%'}}
            showsVerticalScrollIndicator={true}>
            {FiltersArr.map((item, index) => (
              <FilterItem
                icon={item.image}
                item={item}
                index={index}
                // onPress={() => onFilterPress()}
                onPress={(val, index) => {
                  if (onFilterPress) {
                    onFilterPress(val, index);
                  }

                  onToggle();
                }}
              />
            ))}
          </ScrollView>
        </Animatable.View>
      ) : null}
    </>
  );
};

export default Filters;
