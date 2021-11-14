import React, {Component} from 'react';
import {Text, View, Platform, Dimensions, ColorPropType} from 'react-native';
import ChooseAvatar from './src/screens/AuthScreens/createParentsProfile';
import Signup from './src/screens/AuthScreens/Signup';
import ConfirmVerification from './src/screens/AuthScreens/ConfirmVerification';

import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CreateFirstChild from './src/screens/AuthScreens/CreateFirstChild';
import ChooseChildAge from './src/screens/AuthScreens/ChooseChildAge';
import TopicSelection from './src/screens/AuthScreens/TopicSelection';
import {connect} from 'react-redux';
import {MapSateToProps} from './src/common/MapDisptacher';
import {MakeItTablet, MakeItMobile} from './src/actions/OrientationActions';
import CategoriesScreen from './src/screens/HomeScreens/CategoriesScreen';
import SingleCategory from './src/screens/HomeScreens/SingleCategory';
import BookShelf from './src/screens/HomeScreens/BookShelf';
import BookOverview from './src/screens/HomeScreens/BookOverview';
import BookPage from './src/screens/HomeScreens/BookPage';
import QuizScreen from './src/screens/HomeScreens/QuizScreen';

import SplashScreen from './src/screens/AuthScreens/SplashScreen';
import Login from './src/screens/AuthScreens/Login';
import SelectUserProfile from './src/screens/AuthScreens/SelectUserProfile';
import Package from './src/screens/AuthScreens/Package';
import ReadMyself from './src/screens/HomeScreens/ReadMyself';
import CardPayment from './src/screens/AuthScreens/CardPayment';
import LaunchScreen from './src/screens/AuthScreens/LaunchScreen';
import VerifyCode from './src/screens/AuthScreens/VerifyCode';
import ForgotPassword from './src/screens/AuthScreens/ForgotPassword';
import Glossary from './src/screens/HomeScreens/Glossary';
import ResetPassword from './src/screens/HomeScreens/ResetPassword';
import RewardsOverview from './src/screens/HomeScreens/RewardsOverview';
import RewardsPage from './src/screens/HomeScreens/RewardsPage';
import RewardsCategory from './src/screens/HomeScreens/RewardsCategory';
import Explore from './src/screens/HomeScreens/Explore';
import ExploreScreen from './src/screens/HomeScreens/ExploreScreen';
import Videos from './src/screens/HomeScreens/Videos';

import {
  Dashboard,
  LaunchScreen2,
  Splash,
  CategoryMain,
  Home_Explore,
  CategoryShelf,
  NewAdditions,
  EditProfile,
  EditParentProfile,
  EditChildProfile,
  BookDetails,
  ReadBook,
  RewardScreen,
  TopicsScreen,
  GlossaryScreen,
  BookFinished,
  QuizShelf,
  QuizStart,
  Notifications,
  Feedback,
  PrivacyPolicy,
  QuizPage,
  InternalWebView,
} from './src/screens';

import {TabButton} from './src/controls';
import {Images, Colors, Metrics, Sounds} from './src/theme';
import {DataHelper, SoundHelper} from './src/helpers';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const playSound = (sound) => {
  SoundHelper.playSound(sound);
};

const SplashScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="Splash" component={Splash} />
    </Stack.Navigator>
  );
};

const AuthScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="Launch" component={LaunchScreen2} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SelectUserProfile" component={SelectUserProfile} />
      <Stack.Screen name="chooseAvatar" component={ChooseAvatar} />
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen name="Payment" component={CardPayment} />
      <Stack.Screen
        name="confirmVerification"
        component={ConfirmVerification}
      />
      <Stack.Screen name="verifyCode" component={VerifyCode} />
      <Stack.Screen name="CreateFirstChild" component={CreateFirstChild} />
      <Stack.Screen name="ChooseChildAge" component={ChooseChildAge} />
      <Stack.Screen name="TopicSelection" component={TopicSelection} />
      <Stack.Screen name="Package" component={Package} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="InternalWebView" component={InternalWebView} />
    </Stack.Navigator>
  );
};

function resetRoute(routeName, navigation) {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: routeName}],
  });
  navigation.dispatch(resetAction);
}

const HomeScreens = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let icon;
          let selectedIcon;
          let onPress;
          let elevation;

          let bgColor = Colors.Yellow;
          let selectedColor = '#56c1e2';

          if (route.name === 'Category') {
            elevation = 3;
            icon = Images.home;
            selectedIcon = Images.homeSelected;
            onPress = () => {
              playSound(Sounds.home);
              resetRoute('Category', navigation);
            };
          } else if (route.name === 'Explore') {
            elevation = 4;
            icon = Images.explore;
            selectedIcon = Images.exploreSelected;
            onPress = () => {
              playSound(Sounds.explore);
              navigation.navigate('Explore');
            };
          } else if (route.name === 'Rewards') {
            elevation = 5;
            icon = Images.rewards;
            selectedIcon = Images.rewardsSelected;
            onPress = () => {
              playSound(Sounds.rewards);
              resetRoute('Rewards', navigation);
            };
          } else if (route.name === 'Videos') {
            elevation = 6;
            icon = Images.videos;
            selectedIcon = Images.videoSelected;
            onPress = () => {
              playSound(Sounds.videos);
              navigation.navigate('Videos');
            };
          } else if (route.name === 'EditProfile') {
            elevation = 7;
            icon = Images.settings;
            selectedIcon = Images.settingSelected;
            onPress = () => {
              if (DataHelper.isSneakPeek()) {
                DataHelper.setShowConfirmParentModal(false);
              } else {
                DataHelper.setShowConfirmParentModal(true);
              }

              playSound(Sounds.settings);
              navigation.navigate('EditProfile');
            };

            // bgColor = '#f29222';
            // selectedColor = '#ffed00';
          }

          return (
            <TabButton
              isSelected={focused}
              icon={icon}
              iconSelected={selectedIcon}
              selectedbgColor={selectedColor}
              onPress={onPress}
              elevation={elevation}
            />
          );
        },
      })}
      tabBarOptions={{
        activeBackgroundColor: Colors.transparent,
        showLabel: false,
        style: {
          height: Metrics.screenWidth / Metrics.moderateRatio(5),
          width: Metrics.screenWidth,
        },
      }}>
      <Tab.Screen name="Category" component={HomeStack} />
      <Tab.Screen name="Explore" component={ExploreStack} />
      <Tab.Screen name="Rewards" component={RewardStack} />
      <Tab.Screen name="Videos" component={VideoStack} />
      <Tab.Screen name="EditProfile" component={SettingStack} />
    </Tab.Navigator>
  );

  return (
    <Stack.Navigator
      // initialRouteName="BookPage"
      screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Category" component={CategoriesScreen} />
      <Stack.Screen name="SingleCategory" component={SingleCategory} />
      <Stack.Screen name="BookShelf" component={BookShelf} />
      <Stack.Screen name="BookOverview" component={BookOverview} />
      <Stack.Screen name="BookPage" component={BookPage} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="QuizPage" component={QuizPage} />
      <Stack.Screen name="ReadMyself" component={ReadMyself} />
      <Stack.Screen name="Glossary" component={Glossary} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Rewards" component={RewardsOverview} />
      <Stack.Screen
        name="RewardsPage"
        component={RewardsPage}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="RewardsCategory" component={RewardsCategory} />
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Videos" component={Videos} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="SelectUserProfile" component={SelectUserProfile} />
      <Stack.Screen name="CreateFirstChild" component={CreateFirstChild} />
      <Stack.Screen name="TopicSelection" component={TopicSelection} />
    </Stack.Navigator>
  );
};

const AuthUserSelect = (navigation) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="SelectUserProfile" component={SelectUserProfile} />
    </Stack.Navigator>
  );
};

const AuthSelectPackage = (navigation) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="Package" component={Package} />
    </Stack.Navigator>
  );
};

const AuthAddChildren = (navigation) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen
        name="confirmVerification"
        component={ConfirmVerification}
      />
      <Stack.Screen name="CreateFirstChild" component={CreateFirstChild} />
      <Stack.Screen name="TopicSelection" component={TopicSelection} />
      <Stack.Screen name="Package" component={Package} />
    </Stack.Navigator>
  );
};

const AuthCompleteProfile = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="chooseAvatar" component={ChooseAvatar} />
      <Stack.Screen name="SignUp" component={Signup} />
    </Stack.Navigator>
  );
};

// const AuthSelectTopic = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{headerShown: false, gestureEnabled: false}}>
//       <Stack.Screen name="TopicSelection" component={TopicSelection} />
//     </Stack.Navigator>
//   );
// };

const SettingStack = ({navigation}) => {
  return (
    <Stack.Navigator
      // initialRouteName="BookPage"
      screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditParentProfile" component={EditParentProfile} />
      <Stack.Screen name="EditChildProfile" component={EditChildProfile} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="SelectUserProfile" component={SelectUserProfile} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="CreateFirstChild" component={CreateFirstChild} />
      <Stack.Screen name="TopicSelection" component={TopicSelection} />
    </Stack.Navigator>
  );
};

const ExploreStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="SelectUserProfile" component={SelectUserProfile} />
      <Stack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

const VideoStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="Videos" component={Videos} />
      <Stack.Screen name="SelectUserProfile" component={SelectUserProfile} />
    </Stack.Navigator>
  );
};

const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator
      // initialRouteName="BookPage"
      screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="Home_Main" component={Home_Explore} />
      <Stack.Screen
        name="Category_Main"
        component={CategoryMain}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="CategoryShelf" component={CategoryShelf} />
      <Stack.Screen name="TopicsScreen" component={TopicsScreen} />
      <Stack.Screen name="NewAdditions" component={NewAdditions} />
      <Stack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="QuizShelf" component={QuizShelf} />
      <Stack.Screen name="QuizStart" component={QuizStart} />
      <Stack.Screen name="QuizPage" component={QuizPage} />
      <Stack.Screen
        name="ReadBook"
        component={ReadBook}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="BookFinished"
        component={BookFinished}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="GlossaryScreen" component={GlossaryScreen} />
      <Stack.Screen name="SelectUserProfile" component={SelectUserProfile} />
    </Stack.Navigator>
  );
};

const RewardStack = ({navigation}) => {
  return (
    <Stack.Navigator
      // initialRouteName="BookPage"
      screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="RewardScreen" component={RewardScreen} />
      <Stack.Screen
        name="RewardDetails"
        component={RewardsPage}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="SelectUserProfile" component={SelectUserProfile} />
    </Stack.Navigator>
  );
};

class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInitialized: false,
    };
  }

  componentDidMount() {
    if (
      Dimensions.get('window').width > Dimensions.get('window').height ||
      Dimensions.get('window').width == Dimensions.get('window').height
    ) {
      this.props.MakeItTablet();
    } else {
      this.props.MakeItMobile();
    }
  }

  handleAppInitialization = () => {
    const isAppInitialized = this.props.auth?.isAppInitialized;
    const isLoggedIn = DataHelper.isUserAuthenticated();
    const isProfileComplete = DataHelper.isProfileComplete();
    const isChildrenAdded = DataHelper.isChildrenAdded();
    const isTopicForChildrenAdded = DataHelper.isTopicSelectedForChild();
    const isSignupCompleted = DataHelper.isSignupCompleted();
    const isSubscribed = DataHelper.isSubscribed();
    const isUserSelected = this.props.auth?.userSelected;
    const isSneakPeak = this.props.auth?.sneakpeak;

    if (isAppInitialized) {
      if (isSneakPeak) {
        return (
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeScreens}
          />
        );
      } else if (isLoggedIn) {
        if (isProfileComplete) {
          if (
            isChildrenAdded &&
            (isTopicForChildrenAdded || isSignupCompleted)
          ) {
            if (isSubscribed) {
              if (isUserSelected) {
                return (
                  <Stack.Screen
                    options={{headerShown: false}}
                    name="Home"
                    component={HomeScreens}
                  />
                );
              } else {
                return (
                  <Stack.Screen
                    options={{headerShown: false}}
                    name="Auth"
                    component={AuthUserSelect}
                  />
                );
              }
            } else {
              return (
                <Stack.Screen
                  options={{headerShown: false}}
                  name="Home"
                  component={AuthSelectPackage}
                />
              );
            }
          } else {
            return (
              <Stack.Screen
                options={{headerShown: false}}
                name="Auth"
                component={AuthAddChildren}
              />
            );
          }
        } else {
          //
          return (
            <Stack.Screen
              options={{headerShown: false}}
              name="Auth"
              component={AuthCompleteProfile}
            />
          );
        }
      } else {
        return (
          <Stack.Screen
            options={{headerShown: false}}
            name="Auth"
            component={AuthScreens}
          />
        );
      }
    } else {
      return (
        <Stack.Screen
          options={{headerShown: false}}
          name="Splash"
          component={SplashScreens}
        />
      );
    }
  };

  render() {
    return (
      <NavigationContainer screenOptions={{headerShown: false}}>
        <Stack.Navigator screenOptions={{gestureEnabled: false}}>
          {this.handleAppInitialization()}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(MapSateToProps, {MakeItMobile, MakeItTablet})(Routes);
