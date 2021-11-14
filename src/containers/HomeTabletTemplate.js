import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Yellow, Blue} from '../common/Theme';
import {connect} from 'react-redux';
import {MapSateToProps} from '../common/MapDisptacher';
import {Images} from '../theme';

class HomeTemplate extends Component {
  render() {
    return (
      <View
        style={{width: '100%', flex: 1, backgroundColor: Yellow, zIndex: 0}}>
        {this.props.noScroll ? (
          <View
            style={{
              width: '100%',
              flex: 1,
            }}>
            {this.props.back ? (
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  position: 'absolute',
                  zIndex: 1,
                }}>
                <View
                  style={{
                    width: Dimensions.get('window').width - 100,
                    padding: 5,
                    borderRadius: 60,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.props.navigation.goBack()}>
                    <Image
                      style={{width: 120, height: 120}}
                      source={Images.asset19}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {this.props.settings ? (
                      <TouchableOpacity activeOpacity={0.8}>
                        <Image
                          style={{width: 60, height: 60}}
                          source={Images.asset25}
                        />
                      </TouchableOpacity>
                    ) : (
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity>
                          <Image
                            style={{width: 60, height: 60}}
                            source={Images.asset43}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Image
                            style={{width: 150, height: 80}}
                            source={Images.asset44}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ) : null}
            <View style={{width: '100%', flexDirection: 'row', height: '100%'}}>
              {this.props.noTabs ? null : (
                <ScrollView
                  style={{
                    maxWidth: 100,
                    width: 100,
                    height: '100%',
                    backgroundColor: Yellow,
                    //   flexDirection: "row",
                  }}
                  showsVerticalScrollIndicator={false}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 100,
                      height: 200,
                      zIndex: 1,
                      transform: [{rotate: '90deg'}],
                    }}
                    source={Images.logo}
                  />
                  <Image
                    resizeMode="contain"
                    style={{width: 100, height: 100, marginBottom: 30}}
                    source={Images.male70}
                  />
                  <View
                    style={{
                      width: 100,
                      height: 80,
                      backgroundColor: this.props.home ? Blue : Yellow,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margintTop: 30,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 40, height: 60}}
                      source={Images.asset80}
                    />
                  </View>
                  <View
                    style={{
                      width: 100,
                      height: 80,
                      backgroundColor: this.props.explore ? Blue : Yellow,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margintTop: 30,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 50, height: 55}}
                      source={Images.asset76}
                    />
                  </View>
                  <View
                    style={{
                      width: 100,
                      height: 80,
                      backgroundColor: this.props.rewards ? Blue : Yellow,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margintTop: 30,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 50, height: 45}}
                      source={Images.asset79}
                    />
                  </View>
                  <View
                    style={{
                      width: 100,
                      height: 80,
                      backgroundColor: this.props.activities ? Blue : Yellow,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margintTop: 30,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 55, height: 50}}
                      source={Images.asset81}
                    />
                  </View>
                  <View
                    style={{
                      width: 100,
                      height: 80,
                      backgroundColor: this.props.settings ? Blue : Yellow,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margintTop: 30,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 40, height: 50}}
                      source={Images.asset80}
                    />
                  </View>
                </ScrollView>
              )}
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  zIndex: 1,
                  flexGrow: 1,
                }}>
                {this.props.children}
              </View>
            </View>
          </View>
        ) : (
          <ScrollView
            style={{
              width: '100%',
              height: Dimensions.get('window').height,
            }}
            showsVerticalScrollIndicator={false}>
            {this.props.back ? (
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  position: 'absolute',
                  zIndex: 1,
                }}>
                <View
                  style={{
                    width: Dimensions.get('window').width - 100,
                    padding: 5,
                    borderRadius: 60,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.props.navigation.goBack()}>
                    <Image
                      style={{width: 120, height: 120}}
                      source={Images.asset19}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {this.props.settings ? (
                      <TouchableOpacity activeOpacity={0.8}>
                        <Image
                          style={{width: 60, height: 60}}
                          source={Images.asset25}
                        />
                      </TouchableOpacity>
                    ) : (
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity>
                          <Image
                            style={{width: 60, height: 60}}
                            source={Images.asset43}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Image
                            style={{width: 150, height: 80}}
                            source={Images.asset44}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ) : null}
            <View style={{width: '100%', flexDirection: 'row', height: '100%'}}>
              {this.props.noTabs ? null : (
                <View
                  style={{
                    width: 100,
                    height: '100%',
                    backgroundColor: Yellow,
                    //   flexDirection: "row",
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 100,
                      height: 200,
                      zIndex: 1,
                      transform: [{rotate: '90deg'}],
                    }}
                    source={Images.logo}
                  />
                  <Image
                    resizeMode="contain"
                    style={{width: 100, height: 100, marginBottom: 30}}
                    source={Images.male70}
                  />
                  <View
                    style={{
                      width: 100,
                      height: 80,
                      backgroundColor: this.props.home ? Blue : Yellow,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margintTop: 30,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 40, height: 60}}
                      source={Images.asset80}
                    />
                  </View>
                  <View
                    style={{
                      width: 100,
                      height: 80,
                      backgroundColor: this.props.explore ? Blue : Yellow,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margintTop: 30,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 50, height: 55}}
                      source={Images.asset76}
                    />
                  </View>
                  <View
                    style={{
                      width: 100,
                      height: 80,
                      backgroundColor: this.props.rewards ? Blue : Yellow,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margintTop: 30,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 50, height: 45}}
                      source={Images.asset79}
                    />
                  </View>
                  <View
                    style={{
                      width: 100,
                      height: 80,
                      backgroundColor: this.props.activities ? Blue : Yellow,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margintTop: 30,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 55, height: 50}}
                      source={Images.asset81}
                    />
                  </View>
                  <View
                    style={{
                      width: 100,
                      height: 80,
                      backgroundColor: this.props.settings ? Blue : Yellow,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margintTop: 30,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 40, height: 50}}
                      source={Images.asset80}
                    />
                  </View>
                </View>
              )}
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  zIndex: 1,
                  flexGrow: 1,
                }}>
                {this.props.children}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

export default connect(MapSateToProps)(HomeTemplate);
