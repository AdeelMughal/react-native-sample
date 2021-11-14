import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '../../../components';
import {
  UserAvatarTickControl,
  ThemedButton,
  ThemedNextButton,
} from '../../../controls';
import styles from './styles';
import {Colors, Images, Metrics} from '../../../theme';
import {areEqual} from '../../../util/commonUtils';

export default SettingCarousel = React.memo((props) => {
  const {onClickItem = undefined} = props;
  const userData = [
    {
      name: 'AHMED',
      isParent: true,
      img: Images.male70,
    },
    {
      name: 'HAMZA',
      img: Images.childImg,
    },
    {
      name: 'ADD CHILD',
      img: Images.chooseChild,
      addMore: true,
    },
  ];

  const _renderItem = ({item, index}) => {
    const isParent = !item?.parent; //every child has a parent

    return (
      <View
        style={[
          styles.carouselBox,
          {
            backgroundColor: item?.addMore
              ? Colors.medGrey
              : isParent
              ? Colors.Yellow
              : Colors.themeColors.purple,
          },
        ]}>
        <UserAvatarTickControl
          localImg
          userImage={item?.image ? {uri: item.image} : Images.guestKidAsset}
          imageStyle={styles.carouselImg}
          tickStyle={styles.tickStyle}
          showTick={!item?.addMore}
        />
        <Text numberOfLines={2} size="small" style={styles.carouselItemStyle}>
          {item?.name?.toUpperCase()}
        </Text>

        <ThemedNextButton
          text={'EDIT'}
          iconStyle={{height: Metrics.ratio(40)}}
          onPress={() => {
            onClickItem(isParent, item);
          }}
          style={{
            backgroundColor: Colors.Blue,
            height: Metrics.moderateRatio(22),
            marginHorizontal: Metrics.smallMargin,
          }}
          gradient={['rgba(36,160,193,1)', 'rgba(118,251,252,1)']}
          iconStyle={{width: Metrics.ratio(17), height: Metrics.ratio(17)}}
          textStyle={{fontSize: Metrics.moderateRatio(15)}}
        />
      </View>
    );
  };

  return (
    <Carousel
      // ref={carouselRef}
      data={props?.allUsersData || userData}
      renderItem={_renderItem}
      sliderWidth={Metrics.screenWidth}
      itemWidth={Metrics.ratio(120)}
      activeSlideAlignment="start"
      inactiveSlideOpacity={1}
    />
  );
}, areEqual);
