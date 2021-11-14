import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Image, ScrollView} from 'react-native';
import {Separator, Text, ButtonView} from '../../../components';
import {BookList} from '../../../controls';
import styles from './styles';
import {Images, Colors, Metrics} from '../../../theme';
import {DataHelper} from '../../../helpers';

import {MapSateToProps} from '../../../common/MapDisptacher';

const CategoryList = (props) => {
  const {books} = props;
  const {categories} = books;

  const [categoryData, setCategoryData] = useState(categories);

  useEffect(() => {
    setCategoryData(props.books.categories);
  }, [props.books.categories]);

  const navigate = (
    routeName,
    data = {},
    bookCollection = [],
    selectedIndex,
  ) => {
    props.navigation.navigate(routeName, {
      data,
      bookCollection,
      selectedIndex,
    });
  };

  return (
    <ScrollView nestedScrollEnabled>
      {categoryData &&
        categoryData.length > 0 &&
        categoryData.map((categoryItem) => {
          const {categoryinfo, categoryBooks} = categoryItem;

          const categoryIcon = DataHelper.getCategoryIconForCategoryId(
            categoryinfo.id,
          )?.icon;

          return (
            <>
              <View style={styles.header}>
                <Image
                  resizeMode="contain"
                  style={styles.catImage}
                  source={{uri: categoryIcon}}
                />
                <Text color={Colors.Blue} style={styles.headerText}>
                  {categoryinfo.name}
                </Text>
              </View>

              <BookList
                categoryId={categoryinfo.id}
                data={
                  categoryBooks && categoryBooks.bookinfo
                    ? categoryBooks.bookinfo
                    : []
                }
                onPress={(route, data, index) => {
                  navigate(route, data, categoryBooks.bookinfo, index);
                }}
              />

              <Separator styles={styles.separator} />
            </>
          );
        })}
    </ScrollView>
  );
};

const actions = {};

export default connect(MapSateToProps, actions)(CategoryList);
