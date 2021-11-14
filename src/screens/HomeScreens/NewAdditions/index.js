import React from 'react';
import {View, Text, ImageBackground, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import HomeTemplate from '../../../containers/HomeTemplate';
import {Heading} from '../../../controls';
import BookItem from '../../../controls/BookItem';
import styles from './styles';
import {Images} from '../../../theme';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {connect} from 'react-redux';

const NewAddtions = (props) => {
  return (
    <HomeTemplate renderUser={true} backgroundColor="white" back>
      <ImageBackground
        style={{width: '100%', flex: 1}}
        source={Images.asset122}>
        <ScrollView contentContainerStyle={styles.container}>
          <Heading text="New Additions" customStyles={styles.header} />
          <FlatList
            data={props.books?.home?.newadditionbooks}
            keyExtractor={(item, id) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <BookItem
                index={index}
                item={item}
                showCategory={true}
                showAge={true}
                onPress={(route, data, index) => {
                  props.navigation.navigate('BookDetails', {
                    data,
                    bookCollection: props.books?.home?.newadditionbooks,
                    selectedIndex: index,
                  });
                }}
              />
            )}
          />
        </ScrollView>
      </ImageBackground>
    </HomeTemplate>
  );
};

export default connect(MapSateToProps, {})(NewAddtions);
