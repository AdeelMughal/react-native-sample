import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  SafeAreaView,
  Platform,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {changeUserRole} from '../../actions/AuthActions';
import fonts from '../../common/fonts';
import {MapSateToProps} from '../../common/MapDisptacher';
import {Blue, Yellow, TextInputColor} from '../../common/Theme';
import {Inputs, Text} from '../../components';
import AuthTemplate from '../../containers/AuthTemplate';
import FastImage from 'react-native-fast-image';
import {ThemedNextButton, ThemedYellowButton} from '../../controls';
import {ButtonView} from '../../components';
import {Images, Metrics, Colors} from '../../theme';
import {ScrollView} from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';

let isTablet = DeviceInfo.isTablet();

class CardPayment extends Component {
  state = {
    email: '',
    password: '',
    paymentPackage: 0,
  };

  renderHeader = () => {
    const logoWidth = Metrics.screenWidth - 2 * Metrics.doubleBaseMargin;
    const logoHeight = logoWidth / 1.97;
    const headerHeight = logoHeight + Metrics.smallMargin;

    return (
      <View
        style={{
          zIndex: 2,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: headerHeight,
          backgroundColor: Colors.Blue, // '#4bccec',
        }}>
        <View
          style={{
            position: 'absolute',
            left: Metrics.doubleBaseMargin,
            right: Metrics.doubleBaseMargin,
            top: Metrics.doubleBaseMargin,
          }}>
          <Image
            resizeMethod={'resize'}
            resizeMode={'contain'}
            source={Images.logo}
            style={{flex: 1, width: logoWidth, height: logoHeight}}
          />
        </View>
        <ButtonView
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{
            width: Metrics.ratio(44),
            height: Metrics.ratio(44),
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: Metrics.smallMargin,
            left: Metrics.smallMargin,
          }}>
          <Image
            source={Images.asset55}
            style={{width: Metrics.ratio(30), height: Metrics.ratio(30)}}
          />
        </ButtonView>
      </View>
    );
  };

  renderNextButton = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          // marginTop: Metrics.smallMargin,
          zIndex: 0,
        }}>
        <ThemedNextButton
          text="FINISH PAYMENT"
          style={{width: '70%', marginHorizontal: Metrics.baseMargin}}
          onPress={() => {
            // this.props.changeUserRole();
            this.props.navigation.navigate('confirmVerification', {
              showAddModal: true,
            });
          }}
        />
      </View>
    );
  };
  renderAlreadySignin = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: Metrics.ratio(15) * this.props.auth.size,
          zIndex: 0,
          marginBottom: Metrics.ratio(10),
        }}>
        <View
          style={{
            width: '70%',
            borderRadius: Metrics.ratio(100),
            paddingVertical: isTablet ? Metrics.ratio(3) : Metrics.ratio(2),
            backgroundColor: Colors.Yellow,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            zIndex: 0,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text
              color={'light'}
              style={{
                fontSize: isTablet ? 18 : 13,
                // fontWeight: "bold",
                textDecorationLine: 'underline',
              }}>
              Already have an account? SIGN IN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderContactus = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          height: Metrics.ratio(40),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => this.props.navigation.navigate('Login')}>
        <Text
          style={{
            fontSize: 11 * this.props.auth.size,
            textDecorationLine: 'underline',
            color: 'grey',
          }}>
          Need help ? Contact Us
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{flex: 1, height: '100%'}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Metrics.ratio(10)}>
        <ImageBackground
          source={Images.asset122}
          style={{width: '100%', flex: 1}}
          resizeMode="cover">
          <SafeAreaView
            style={{
              flex: 1,
            }}>
            {this.renderHeader()}

            <ScrollView>
              <View
                style={{
                  width: '100%',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: Metrics.ratio(10),
                }}>
                <Text
                  style={{
                    color: Yellow,
                    fontSize: 18,
                    fontFamily: fonts.CARTERONE,
                  }}>
                  ENTER CARD DETAILS
                </Text>

                <View style={{width: '70%', marginTop: Metrics.ratio(10)}}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.setState({paymentPackage: 0})}
                      style={{
                        width: '48%',
                        borderRadius: Metrics.ratio(10),
                        backgroundColor:
                          this.state.paymentPackage == 0 ? Yellow : '#B3B3B3',
                        paddingVertical: Metrics.ratio(5),
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: Metrics.ratio(1),
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                      }}>
                      <FastImage
                        style={{
                          width: Metrics.ratio(60),
                          height: Metrics.ratio(60),
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        // resizeMode="contain"
                        source={{
                          uri:
                            'https://paymentweek.com/wp-content/uploads/2017/07/Old_Visa_Logo.svg_.png',
                          priority: FastImage.priority.high,
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.setState({paymentPackage: 1})}
                      style={{
                        width: '48%',
                        borderRadius: Metrics.ratio(10),
                        backgroundColor:
                          this.state.paymentPackage == 1 ? Yellow : '#B3B3B3',
                        paddingVertical: Metrics.ratio(5),
                        alignItems: 'center',
                        justifyContent: 'center',

                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: Metrics.ratio(1),
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                      }}>
                      <FastImage
                        style={{
                          width: Metrics.ratio(70),
                          height: Metrics.ratio(70),
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        // resizeMode="contain"
                        source={Images.masterCard}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    width: '70%',
                    marginTop: Metrics.ratio(20),
                  }}>
                  <View style={{width: '100%', alignItems: 'center'}}>
                    <Inputs
                      width="100%"
                      autoCorrect={false}
                      autoCapitalize={'words'}
                      value={this.state.name}
                      changeText={(val) => this.setState({name: val})}
                      placeholder="Enter Card Holder Name"
                    />
                  </View>

                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      marginTop: Metrics.ratio(10),
                    }}>
                    <TextInputMask
                      keyboardType={'phone-pad'}
                      // selectionColor={Colors.darkStaleBlue}
                      underlineColorAndroid="transparent"
                      onChangeText={(formatted, extracted) =>
                        this.setState({
                          number: extracted,
                        })
                      }
                      mask={'[0000] [0000] [0000] [0000]'}
                      value={this.state.number}
                      placeholder="Enter Card Number"
                      placeholderTextColor={Colors.text.gray}
                      returnKeyType="done"
                      enablesReturnKeyAutomatically
                      style={{
                        width: '100%',
                        fontFamily: fonts.CARTERONE,
                        fontWeight: '200',
                        height: Metrics.ratio(45),
                        backgroundColor: TextInputColor,
                        paddingLeft: Metrics.ratio(20),
                        borderRadius: Metrics.ratio(100),
                        fontSize: Metrics.ratio(16),
                        borderColor: null,
                        borderWidth: 0,
                        marginLeft: 0,
                      }}
                    />
                  </View>

                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      marginTop: Metrics.ratio(10),
                      justifyContent: 'space-between',
                    }}>
                    <View style={{width: '48%', alignItems: 'flex-end'}}>
                      <TextInputMask
                        keyboardType={'phone-pad'}
                        // selectionColor={Colors.darkStaleBlue}
                        underlineColorAndroid="transparent"
                        onChangeText={(formatted, extracted) =>
                          this.setState({
                            expiry: extracted,
                          })
                        }
                        mask={'[00]/[00]'}
                        value={this.state.expiry}
                        // style={styles.textfield}
                        placeholder={'Expiry'}
                        placeholderTextColor={Colors.text.gray}
                        returnKeyType="done"
                        enablesReturnKeyAutomatically
                        style={{
                          width: '100%',
                          fontFamily: fonts.CARTERONE,
                          fontWeight: '200',
                          height: Metrics.ratio(45),
                          backgroundColor: TextInputColor,
                          paddingLeft: Metrics.ratio(20),
                          borderRadius: Metrics.ratio(100),
                          fontSize: Metrics.ratio(16),
                          borderColor: null,
                          borderWidth: 0,
                          marginLeft: 0,
                        }}
                      />
                    </View>
                    <View style={{width: '48%', alignItems: 'flex-start'}}>
                      <Inputs
                        width="100%"
                        maxLength={3}
                        keyboardType={'number-pad'}
                        value={this.state.ccv}
                        changeText={(val) => this.setState({ccv: val})}
                        placeholder="Cvv"
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: Metrics.ratio(20),
                  }}>
                  {this.renderNextButton()}
                  {this.renderAlreadySignin()}
                  {this.renderContactus()}
                  {/* <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      marginTop: Metrics.ratio(20),
                    }}>
                    <ThemedNextButton
                      textStyle={{fontSize: Metrics.ratio(11)}}
                      text="FINISH PAYMENT"
                      style={{height: Metrics.ratio(35)}}
                      iconStyle={{
                        width: Metrics.ratio(30),
                        height: Metrics.ratio(30),
                      }}
                      onPress={() => this.props.changeUserRole()}
                    />

                    <ThemedYellowButton
                      text={'Already have an account? SIGN IN'}
                      textStyle={{fontSize: 10 * this.props.auth.size}}
                      style={{marginVertical: Metrics.smallMargin}}
                      onPress={() => this.props.navigation.navigate('Login')}
                    />

                    <View
                      style={{
                        width: '90%',
                        alignItems: 'center',
                        marginTop: Metrics.ratio(10),
                      }}>
                      <TouchableOpacity activeOpacity={0.8}>
                        <Text
                          style={{
                            paddingTop: Metrics.ratio(20),
                            fontSize: 11 * this.props.auth.size,
                            fontWeight: 'bold',
                            textDecorationLine: 'underline',
                            color: 'grey',
                            fontFamily: fonts.CARTERONE,
                          }}>
                          Need help ? Contact Us
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View> */}
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(MapSateToProps, {
  changeUserRole,
})(CardPayment);
