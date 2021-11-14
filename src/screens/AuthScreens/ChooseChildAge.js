import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Blue, Yellow, TextInputColor} from '../../common/Theme';
import LinearGradient from 'react-native-linear-gradient';
import AuthTemplate from '../../containers/AuthTemplate';
import Inputs from '../../components/Inputs';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import {registerChild} from '../../actions/AuthActions';
import FastImage from 'react-native-fast-image';
import {Images, Metrics} from '../../theme';

class ChooseChildAge extends Component {
  state = {
    gender: 1,
    avatars: [
      '../../../assets/Images/Male74.png',
      '../../../assets/Images/Male75.png',
      '../../../assets/Images/Male76.png',
      '../../../assets/Images/Male77.png',
      '../../../assets/Images/Male78.png',
      '../../../assets/Images/Male81.png',
    ],
    selectedAge: '',
    year: '',
    loading: false,
  };

  chooseAvatar = (id) => {
    this.setState({
      selectedAge: id,
    });
  };

  childRegister = () => {
    const {name, gender, image, camera, childName} = this.props.route.params;
    const user = DataHelper.getUserObject();

    if (this.state.selectedAge == '' && this.state.year == '') {
      alert("Please select your child's year and age");
      return 0;
    }
    if (this.state.selectedAge == '') {
      alert("Please select your child's age");
      return 0;
    }
    if (this.state.year == '') {
      alert("Please enter your child's birth year");
      return 0;
    }
    this.setState({loading: true});
    const final = {
      name,
      gender,
      image,
      age: this.state.selectedAge,
      birthyear: this.state.year,
      parentid: user?.id,
    };

    this.props.registerChild(final, (customerid) => {
      this.props.navigation.navigate('TopicSelection', customerid);
    });
  };

  componentWillReceiveProps(props) {
    if (props.auth.error) {
      this.setState({loading: false});
      return 0;
    }

    if (props.auth.firstChildSuccess) {
      this.setState({loading: false});
    }
    if (props.auth.secondSuccess) {
      this.setState({loading: false});
    }
    if (props.auth.thirdChildSuccess) {
      this.setState({loading: false});
    }
  }

  render() {
    const {name, gender, image} = this.props.route.params;
    return (
      <View style={{width: '100%', flex: 1}}>
        {this.state.loading ? (
          <View
            style={{
              width: '100%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color={Yellow} />
          </View>
        ) : (
          <AuthTemplate
            navigation={this.props.navigation}
            heading={`HOW OLD IS ${name.toUpperCase()}?`}
            text={
              'This allows us to offer a personalized\n selection of age-approrpriate books\n for your child.'
            }>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: Metrics.ratio(30) * this.props.auth.size,
              }}>
              <Text
                style={{
                  color: Yellow,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18 * this.props.auth.size,
                }}>
                CHOOSE AGE
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: Metrics.ratio(10) * this.props.auth.size,
              }}>
              <View style={{width: '70%', alignItems: 'center'}}>
                <Inputs
                  changeText={(val) => this.setState({year: val})}
                  value={this.state.year}
                  placeholder="Enter Birth Year"
                  maxLength={4}
                />
              </View>
            </View>

            <View
              style={{
                width: '100%',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  height: Metrics.ratio(80) * this.props.auth.size,
                  position: 'absolute',
                  backgroundColor: Yellow,
                  marginTop: 20,
                }}></View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{width: Dimensions.get('window').width}}>
                <TouchableOpacity
                  onPress={() => this.chooseAvatar(109)}
                  activeOpacity={1}>
                  <FastImage
                    style={{
                      width: Metrics.ratio(100) * this.props.auth.size,
                      height: Metrics.ratio(120) * this.props.auth.size,
                      marginHorizontal:
                        Metrics.ratio(10) * this.props.auth.size,
                    }}
                    source={
                      this.state.selectedAge == 109
                        ? Images.asset92
                        : Images.asset109
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.chooseAvatar(108)}
                  activeOpacity={1}>
                  <FastImage
                    style={{
                      width: Metrics.ratio(100) * this.props.auth.size,
                      height: Metrics.ratio(120) * this.props.auth.size,
                      marginHorizontal:
                        Metrics.ratio(10) * this.props.auth.size,
                    }}
                    source={
                      this.state.selectedAge == 108
                        ? Images.asset100
                        : Images.asset108
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.chooseAvatar(107)}
                  activeOpacity={1}>
                  <FastImage
                    style={{
                      width: Metrics.ratio(100) * this.props.auth.size,
                      height: Metrics.ratio(120) * this.props.auth.size,
                      marginHorizontal:
                        Metrics.ratio(10) * this.props.auth.size,
                    }}
                    source={
                      this.state.selectedAge == 107
                        ? Images.asset99
                        : Images.asset107
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.chooseAvatar(106)}
                  activeOpacity={1}>
                  <FastImage
                    style={{
                      width: Metrics.ratio(100) * this.props.auth.size,
                      height: Metrics.ratio(120) * this.props.auth.size,
                      marginHorizontal:
                        Metrics.ratio(10) * this.props.auth.size,
                    }}
                    source={
                      this.state.selectedAge == 106
                        ? Images.asset98
                        : Images.asset106
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.chooseAvatar(105)}
                  activeOpacity={1}>
                  <FastImage
                    style={{
                      width: Metrics.ratio(100) * this.props.auth.size,
                      height: Metrics.ratio(120) * this.props.auth.size,
                      marginHorizontal:
                        Metrics.ratio(10) * this.props.auth.size,
                    }}
                    source={
                      this.state.selectedAge == 105
                        ? Images.asset93
                        : Images.asset105
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.chooseAvatar(104)}
                  activeOpacity={1}>
                  <FastImage
                    style={{
                      width: Metrics.ratio(100) * this.props.auth.size,
                      height: Metrics.ratio(120) * this.props.auth.size,
                      marginHorizontal:
                        Metrics.ratio(10) * this.props.auth.size,
                    }}
                    source={
                      this.state.selectedAge == 104
                        ? Images.asset94
                        : Images.asset104
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.chooseAvatar(103)}
                  activeOpacity={1}>
                  <FastImage
                    style={{
                      width: Metrics.ratio(100) * this.props.auth.size,
                      height: Metrics.ratio(120) * this.props.auth.size,
                      marginHorizontal:
                        Metrics.ratio(10) * this.props.auth.size,
                    }}
                    source={
                      this.state.selectedAge == 103
                        ? Images.asset95
                        : Images.asset103
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.chooseAvatar(102)}
                  activeOpacity={1}>
                  <FastImage
                    style={{
                      width: Metrics.ratio(100) * this.props.auth.size,
                      height: Metrics.ratio(120) * this.props.auth.size,
                      marginHorizontal:
                        Metrics.ratio(10) * this.props.auth.size,
                    }}
                    source={
                      this.state.selectedAge == 102
                        ? Images.asset96
                        : Images.asset102
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.chooseAvatar(101)}
                  activeOpacity={1}>
                  <FastImage
                    style={{
                      width: Metrics.ratio(100) * this.props.auth.size,
                      height: Metrics.ratio(120) * this.props.auth.size,
                      marginHorizontal:
                        Metrics.ratio(10) * this.props.auth.size,
                    }}
                    source={
                      this.state.selectedAge == 101
                        ? Images.asset97
                        : Images.asset101
                    }
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: Metrics.ratio(20),
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: Metrics.ratio(100),
                  width: '60%',
                  height: Metrics.ratio(45) * this.props.auth.size,
                  backgroundColor: 'red',
                  overflow: 'hidden',
                }}
                activeOpacity={0.8}
                // onPress={() => this.props.navigation.navigate("TopicSelection")}
                onPress={() => this.childRegister()}>
                <LinearGradient
                  colors={['rgba(118,251,252,1)', 'rgba(36,160,193,1)']}
                  // start={[1, 0]}
                  // end={[1, 1]}
                  style={{
                    zIndex: 1,
                    width: '100%',
                    position: 'absolute',
                    backfaceVisibility: 'hidden',
                    height: Metrics.ratio(45) * this.props.auth.size,
                    backgroundColor: Blue,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: Metrics.ratio(2),
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    flexDirection: 'row',

                    justifyContent: 'flex-end',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 18 * this.props.auth.size,
                        fontWeight: '700',
                        color: 'white',
                      }}>
                      PROCEED
                    </Text>
                  </View>
                  <FastImage
                    style={{
                      width: Metrics.ratio(80) * this.props.auth.size,
                      height: Metrics.ratio(80) * this.props.auth.size,
                      marginRight: Metrics.ratio(-15) * this.props.auth.size,
                    }}
                    source={Images.asset18}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: Metrics.ratio(10),
              }}>
              <View
                style={{
                  width: '60%',
                  borderRadius: Metrics.ratio(100),
                  paddingVertical: Metrics.ratio(5) * this.props.auth.size,
                  backgroundColor: Yellow,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text
                    style={{
                      fontSize: 12 * this.props.auth.size,
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                      color: 'white',
                    }}>
                    Already have an account? SIGN IN
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </AuthTemplate>
        )}
      </View>
    );
  }
}

export default connect(MapSateToProps, {registerChild})(ChooseChildAge);
