import React, {Component} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

import fonts from '../../common/fonts';
import {MapSateToProps} from '../../common/MapDisptacher';
import {TextInputColor} from '../../common/Theme';
import Inputs from '../../components/Inputs';
import AuthTemplate from '../../containers/AuthTemplate';
import {
  Text,
  ButtonView,
  ActivityLoader,
  SwitchSelectorComponent,
} from '../../components';
import {ThemedNextButton, PackageCell, AddChildModal} from '../../controls';
import DeviceInfo from 'react-native-device-info';

import {Images, Metrics, Colors} from '../../theme';
import {DataHelper, IAPHelper} from '../../helpers';

import {setSignupCompleted} from '../../actions/AuthActions';

let isTablet = DeviceInfo.isTablet();
const packages = [
  Images.asset269,
  Images.asset270,
  Images.asset271,
  Images.asset272,
  Images.asset273,
  Images.asset274,
  Images.asset275,
  Images.asset276,
];

const purchasePackages = IAPHelper.getProductsItems();

class Package extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      selectedPackageIndex: 0,
      promoCode: '',
      selectedPackageTypeIndex: 1,
      modal: false,
    };
  }

  componentDidMount() {
    IAPHelper.onMount();
  }

  componentWillUnmount() {
    IAPHelper.onUnMount();
  }

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
        {/* <ButtonView
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
        </ButtonView> */}
      </View>
    );
  };

  renderNewHorizontalScrollItem = (packageImage) => {
    return (
      <View
        style={{
          width: Metrics.screenWidth / 3,
          height: Metrics.ratio(50),
          marginHorizontal: Metrics.baseMargin,
          marginTop: Metrics.baseMargin,
        }}>
        <Image
          resizeMethod={'resize'}
          resizeMode={'contain'}
          style={{width: Metrics.screenWidth / 3, height: Metrics.ratio(50)}}
          source={packageImage}
        />
      </View>
    );
  };

  renderHorizontalScroll = () => {
    return (
      <ScrollView
        style={{flex: 1, flexDirection: 'row', marginTop: Metrics.baseMargin}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {packages.map((thisPackage) => {
          return this.renderNewHorizontalScrollItem(thisPackage);
        })}
      </ScrollView>
    );
  };

  renderOptions = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          // marginTop: Metrics.smallMargin,
          // flexDirection: 'row',
          justifyContent: 'center',
          padding: Metrics.ratio(10),
        }}>
        {purchasePackages.map((item, index) => {
          return (
            <PackageCell
              isSelected={this.state.selectedPackageIndex == index}
              item={item}
              index={index}
              onPress={(selectedPackage) => {
                this.setState({selectedPackageIndex: index});
              }}
            />
          );
        })}
      </View>
    );
  };

  renderInputField = () => {
    return (
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: Metrics.baseMargin,
        }}>
        <Text
          style={{
            fontSize: 12 * this.props.auth.size,
            color: Colors.Blue,
          }}>
          ADD PROMO CODE?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: Metrics.ratio(10),
            }}>
            <Inputs
              value={this.state.promoCode}
              changeText={(val) => this.setState({promoCode: val})}
              placeholder="Enter promo code"
              clearWhenHaveValue
              clearText={() => this.setState({promoCode: ''})}
            />
          </View>
          <FastImage
            style={{
              width: Metrics.ratio(40),
              height: Metrics.ratio(40),
            }}
            resizeMode={FastImage.resizeMode.contain}
            source={Images.right}
          />
        </View>

        {/* {this.state.promo !== '' && this.state.promo?.length >= 3 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.setState({secure: !this.state.secure})}
            style={{
              flex: 1,
              position: 'absolute',
              right: Metrics.ratio(-40),
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: Metrics.ratio(40),
                height: Metrics.ratio(40),
              }}
              source={Images.right}
            />
          </TouchableOpacity>
        ) : null} */}
      </View>
    );
  };

  renderNextButton = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: Metrics.baseMarginTop,
          zIndex: 0,
        }}>
        <ThemedNextButton
          text="BISMILLAH"
          style={{width: '70%', marginHorizontal: Metrics.baseMargin}}
          onPress={() => {
            // const selectedPackage =
            //   purchasePackages[this.state.selectedPackageIndex];
            // if (selectedPackage) {
            //   // IAPHelper.requestSubscription(selectedPackage.packageId);
            //   IAPHelper.requestPurchase(selectedPackage.packageId);
            // }
            const auth = DataHelper.getAuthState();
            console.log('auth: ', auth);
            this.setState({modal: true});
            // if (auth?.user && !auth?.userSelected) {
            //   this.props.resetUser();
            // }
            // this.props.SneakPeakTheUser();
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
          marginTop: Metrics.ratio(10) * this.props.auth.size,
          zIndex: 0,
          // marginBottom: Metrics.ratio(20),
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
          // marginVertical: Metrics.baseMargin,
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

  renderFooter = () => {
    return (
      <>
        {this.renderNextButton()}
        {/* {this.renderAlreadySignin()} */}
        {this.renderContactus()}
      </>
      // <View
      //   style={{
      //     width: '70%',
      //     alignItems: 'center',
      //     marginTop: Metrics.baseMargin,
      //   }}>
      //   <ThemedNextButton
      //     text={'BISMILLAH'}
      //     onPress={() => this.props.navigation.navigate('Payment')}
      //   />

      //   <View
      //     style={{
      //       width: '90%',
      //       alignItems: 'center',
      //       marginTop: Metrics.smallMargin,
      //     }}>
      //     <View
      //       style={{
      //         width: '100%',
      //         borderRadius: Metrics.ratio(100),
      //         paddingVertical: 2 * this.props.auth.size,
      //         backgroundColor: Colors.Yellow,
      //         alignItems: 'center',
      //         flexDirection: 'row',
      //         justifyContent: 'center',
      //       }}>
      //       <TouchableOpacity
      //         activeOpacity={0.8}
      //         onPress={() => this.props.navigation.navigate('Login')}>
      //         <Text
      //           style={{
      //             fontSize: 10 * this.props.auth.size,

      //             textDecorationLine: 'underline',
      //             color: 'white',
      //           }}>
      //           Already have an account? Signin
      //         </Text>
      //       </TouchableOpacity>
      //     </View>
      //     <TouchableOpacity
      //       activeOpacity={0.8}
      //       style={{
      //         marginVertical: Metrics.baseMargin,
      //         height: Metrics.ratio(44),
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //       }}
      //       onPress={() => this.props.navigation.navigate('Login')}>
      //       <Text
      //         style={{
      //           fontSize: 11 * this.props.auth.size,
      //           textDecorationLine: 'underline',
      //           color: 'grey',
      //         }}>
      //         Need help ? Contact Us
      //       </Text>
      //     </TouchableOpacity>
      //   </View>
      // </View>
    );
  };

  rednerSwitch = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: Metrics.doubleBaseMargin,
          backgroundColor: Colors.Yellow,
        }}>
        <View
          style={{
            width: '75%',
            marginVertical: Metrics.baseMargin * 1.2,
          }}>
          <SwitchSelectorComponent
            onChange={(val) => this.setState({selectedPackageTypeIndex: val})}
          />
        </View>
      </View>
    );
  };

  renderBasic = () => {
    return (
      <View>
        <View
          style={{
            // flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: Colors.Blue,
              fontSize: 18,
              lineHeight: Metrics.ratio(20),
              textTransform: 'uppercase',
              paddingVertical: Metrics.smallMargin,
              textAlign: 'center',
            }}>
            This will have {'\n'} limited access to content
          </Text>
          <Text
            style={{
              color: Colors.black,
              fontSize: 12,
              // lineHeight: Metrics.ratio(20),
              // textTransform: 'uppercase',
              marginTop: Metrics.smallMargin,
              marginHorizontal: Metrics.ratio(60),
              textAlign: 'center',
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book.
          </Text>
        </View>
      </View>
    );
  };

  renderAddChildModal = () => {
    const {route, auth, navigation} = this.props;

    return (
      <AddChildModal
        doShowModal={this.state.modal}
        data={this.state.dataObject}
        authObject={auth}
        navigation={navigation}
        onSkip={() => {
          this.props.setSignupCompleted();
        }}
        onClose={() => {
          this.setState({modal: false});
        }}
        userType={this.state.selectedPackageTypeIndex}
      />
    );
  };

  render() {
    // const { name, gender, image, url } = this.props.route.params;

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

            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              style={{flex: 1}}>
              {this.renderHorizontalScroll()}

              {this.rednerSwitch()}

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: Metrics.baseMargin * 1.3,
                }}>
                {this.state.selectedPackageTypeIndex == 1 ? (
                  this.renderBasic()
                ) : (
                  <>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: Colors.Yellow,
                          fontSize: 18,
                          lineHeight: Metrics.ratio(20),
                          textTransform: 'uppercase',
                          paddingVertical: Metrics.smallMargin,
                        }}>
                        Get unlimited access {'\n'} on all your devices
                      </Text>
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          right: Metrics.ratio(-40),
                        }}>
                        <FastImage
                          style={{
                            width: Metrics.ratio(25),
                            height: Metrics.ratio(25),
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                          source={Images.help}
                        />
                      </TouchableOpacity>
                    </View>

                    {this.renderOptions()}

                    {this.renderInputField()}
                  </>
                )}

                {this.renderFooter()}

                {this.renderAddChildModal()}
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
        <ActivityLoader isLoading={this.props.general.isLoading} />
      </KeyboardAvoidingView>
    );

    return (
      <AuthTemplate
        navigation={this.props.navigation}
        scroll
        noHeading></AuthTemplate>
    );
  }
}

export default connect(MapSateToProps, {setSignupCompleted})(Package);
