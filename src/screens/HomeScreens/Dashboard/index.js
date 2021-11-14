// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Text, View, SafeAreaView, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {MapSateToProps} from '../../../common/MapDisptacher';
import {Metrics, Colors, Images, Sounds} from '../../../theme';
import {AppHeader, TabButton} from '../../../controls';
import {SoundHelper, DataHelper} from '../../../helpers';
import {
  logout,
  removeSneakPeak,
  // fetchNav
} from '../../../actions/AuthActions';

import {Home, Explore, Rewards, Videos, Settings} from '../../';

import styles from './styles';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'home',
    };
  }

  onLogout = () => {
    // AsyncStorage.removeItem('user');

    // this.props.logout();
    // this.props.removeSneakPeak();

    DataHelper.logoutUser();
  };

  confirmLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Do you want to logout ?',
      [
        {
          text: 'Yes',
          onPress: () => {
            this.onLogout();
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  renderHeader = () => {
    return (
      <AppHeader
        isSneakBack={this.props.auth.sneakpeak}
        isBack={this.props.back}
        isSettings={this.props.settings}
        onBack={() => {
          if (this.props.auth.sneakpeak) {
            this.onLogout();
          } else if (this.props.back) {
            this.props.navigation.pop();
          }
        }}
        onUserTap={() => {
          this.props.navigation.navigate('SelectUserProfile');
          // this.confirmLogout();
        }}
        auth={this.props.auth}
      />
    );
  };

  renderTabMenu = () => {
    const {noTabs} = this.props;

    if (noTabs) {
      return null;
    }

    return (
      <View style={styles.tab}>
        <TabButton
          isSelected={this.state.selectedTab === 'home'}
          onPress={() => {
            // this.props.fetchNav(1);
            this.setState({selectedTab: 'home'});
            // this.props.navigation.replace('Category');

            SoundHelper.playSound(Sounds.home);
          }}
          icon={Images.home}
          iconSelected={Images.homeSelected}
          elevation={3}
        />
        <TabButton
          isSelected={this.state.selectedTab === 'explore'}
          onPress={() => {
            // this.props.fetchNav(2);
            this.setState({selectedTab: 'explore'});
            // this.props.navigation.replace('Explore');

            SoundHelper.playSound(Sounds.explore);
          }}
          icon={Images.explore}
          iconSelected={Images.exploreSelected}
          elevation={4}
        />
        <TabButton
          isSelected={this.state.selectedTab === 'rewards'}
          onPress={() => {
            // this.props.fetchNav(3);
            this.setState({selectedTab: 'rewards'});
            // this.props.navigation.replace('Rewards');

            SoundHelper.playSound(Sounds.rewards);
          }}
          icon={Images.rewards}
          iconSelected={Images.rewardsSelected}
          elevation={5}
        />

        <TabButton
          isSelected={this.state.selectedTab === 'videos'}
          onPress={() => {
            // this.props.fetchNav(4);
            this.setState({selectedTab: 'videos'});
            // this.props.navigation.replace('Videos');

            SoundHelper.playSound(Sounds.videos);
          }}
          icon={Images.videos}
          iconSelected={Images.videoSelected}
          elevation={6}
        />
        <TabButton
          isSelected={this.state.selectedTab === 'settings'}
          onPress={() => {
            // this.props.fetchNav(5);
            this.setState({selectedTab: 'settings'});
            // this.props.navigation.replace('ResetPassword');

            SoundHelper.playSound(Sounds.settings);
          }}
          icon={Images.settings}
          iconSelected={Images.settingSelected}
          bgColor={'#f29222'}
          selectedbgColor={'#ffed00'}
          elevation={7}
        />
      </View>
    );
  };

  renderContent = () => {
    const {selectedTab} = this.state;

    switch (selectedTab) {
      case 'home':
        return <Home navigation={this.props.navigation} />;
      case 'explore':
        return <Explore navigation={this.props.navigation} />;
      case 'rewards':
        return <Rewards navigation={this.props.navigation} />;
      case 'videos':
        return <Videos navigation={this.props.navigation} />;
      case 'settings':
        return <Settings navigation={this.props.navigation} />;
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        {this.renderContent()}

        {this.renderTabMenu()}
      </SafeAreaView>
    );
  }
}

const actions = {logout, removeSneakPeak};

export default connect(MapSateToProps, actions)(Dashboard);
