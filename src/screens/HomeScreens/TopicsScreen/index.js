import React, {useEffect, useRef, useState} from 'react';
import {View, ImageBackground, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import HomeTemplate from '../../../containers/HomeTemplate';
import {Heading} from '../../../controls';
import {Text} from '../../../components';
import BookItem from '../../../controls/BookItem';
import styles from './styles';
import {Images, Colors, Metrics} from '../../../theme';
import TopicItem from '../../../controls/TopicItem';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {getBooksByTopicId} from '../../../actions/BooksActions';

const TopicsScreen = (props) => {
  const {params} = props.route;
  const topicFlatlist = useRef(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const [currentIndex, setCurrentIndex] = useState(params.selectedIndex);
  const [topicList, setTopicList] = useState(props.books?.home?.topics);

  useEffect(() => {
    props.getBooksByTopicId(params?.item?.id);

    _scrollToIndex(currentIndex);
  }, []);

  useEffect(() => {
    const selectedTopic = topicList[currentIndex];

    fetchBooksByTopic(selectedTopic);
  }, [currentIndex]);

  const fetchBooksByTopic = (topic) => {
    setCurrentTopic(topic.topic);
    props.getBooksByTopicId(topic.id);
  };

  const _scrollToIndex = (index) => {
    if (topicFlatlist && topicFlatlist.current) {
      topicFlatlist.current.scrollToIndex({animated: true, index: index});

      setCurrentIndex(index);
    }
  };

  return (
    <HomeTemplate renderUser={true} backgroundColor="white" back>
      <ImageBackground
        style={{width: '100%', flex: 1}}
        source={Images.asset122}>
        <View style={styles.container}>
          <View style={{flex: 0.3}}>
            <View style={styles.header}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Browse by Topics</Text>
              </View>
            </View>
            <FlatList
              ref={topicFlatlist}
              data={topicList}
              keyExtractor={(item, id) => id}
              horizontal
              initialScrollIndex={params?.index}
              onScrollToIndexFailed={(info) => {
                const wait = new Promise((resolve) => setTimeout(resolve, 500));
                wait.then(() => {
                  _scrollToIndex(info.index);
                });
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <TopicItem
                  item={item}
                  onPress={() => fetchBooksByTopic(item)}
                />
              )}
            />
          </View>
          <View style={{flex: 0.7}}>
            <View style={{paddingVertical: Metrics.moderateRatio(10)}}>
              <Text style={styles.text}>
                Books Related to{' '}
                <Text color={Colors.Blue}>
                  {currentTopic || params?.item?.topic}
                </Text>
              </Text>
            </View>
            <FlatList
              contentContainerStyle={styles.topicList}
              data={props.books?.booksByTopics}
              keyExtractor={(item, id) => item.id}
              numColumns={2}
              ListEmptyComponent={() => (
                <View style={styles.emptyList}>
                  <Text style={styles.emptyText}>No Books Found</Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <BookItem
                  item={item}
                  showCategory={true}
                  showAge={true}
                  onPress={(route, data, index) => {
                    props.navigation.navigate('BookDetails', {
                      data,
                      bookCollection: [item],
                      selectedIndex: 0,
                    });
                  }}
                />
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </HomeTemplate>
  );
};

const actions = {getBooksByTopicId};

export default connect(MapSateToProps, actions)(TopicsScreen);
