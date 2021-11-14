import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {countryList, fetchUser} from '../../actions/AuthActions';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import AsyncStorage from '@react-native-community/async-storage';

class SplashScreen extends Component {
  async componentDidMount() {
    this.props.countryList();

    const user = await AsyncStorage.getItem('user');
    // const user = null;
    // AsyncStorage.removeItem("user");

    if (user) {
      this.props.fetchUser(JSON.parse(user));
    } else {
      this.props.navigation.navigate('Launch');
    }

    this.props.navigation.addListener('focus', () => {
      if (this.props.auth.fromsneakpeak) {
        this.props.navigation.navigate('SignUp');
      }
    });
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text> Splash </Text>
      </View>
    );
  }
}

export default connect(MapSateToProps, {countryList, fetchUser})(SplashScreen);
