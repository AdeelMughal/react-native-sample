import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import {Yellow, Blue} from '../common/Theme';
import fonts from '../common/fonts';
import FastImage from 'react-native-fast-image';
import {Text} from '../components';

import {Images} from '../theme';

const {width, height} = Dimensions.get('window');

export default class QuizSuccessModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      visible: false,
    };
  }

  show = (data) => {
    this.setState((p) => {
      return {
        ...p,
        data,
        visible: true,
      };
    });
  };

  hide = () => {
    this.setState((p) => {
      return {
        ...p,
        visible: false,
      };
    });
    this.props.navigate();
  };

  render() {
    return (
      <Modal
        visible={this.state.visible}
        // visible={true}
        animationType="fade"
        transparent={true}
        style={{flex: 1, zIndex: 1000000}}>
        <TouchableOpacity style={modalStyles.backDrop}></TouchableOpacity>

        {this.state.data && (
          <View
            style={{
              width: '100%',
              borderRadius: 5,
              height: '100%',
              paddingTop: 100,
              overflow: 'hidden',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ImageBackground
              resizeMode={'contain'}
              style={{
                //    backgroundColor:'red',
                width: '100%',
                height: '100%',
              }}
              source={Images.quizAsset1}>
              <View
                style={{
                  bottom: 240,
                  position: 'absolute',
                  zIndex: 20,
                  left: 140,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#ece325',
                    fontFamily: fonts.CARTERONE,
                  }}>
                  Your Score
                </Text>
                <Text
                  style={{
                    fontSize: 50,
                    color: 'white',
                    fontFamily: fonts.CARTERONE,
                    marginTop: -15,
                  }}>
                  {Math.floor(this.state.data.pointsearned)}
                </Text>

                <Text
                  style={{
                    fontSize: 10,
                    color: 'white',
                    fontFamily: fonts.CARTERONE,
                    textTransform: 'uppercase',
                  }}>
                  You Correctly Answered
                </Text>
                <Text
                  style={{
                    fontSize: 26,
                    color: '#ece325',
                    fontWeight: 'bold',
                    fontFamily: fonts.CARTERONE,
                    marginTop: -10,
                  }}>
                  {this.state.data.AllAnswerStatus} out of{' '}
                  {this.state.data.totalQuestion}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: 'white',
                    fontFamily: fonts.CARTERONE,
                    textTransform: 'uppercase',
                    marginTop: -10,
                  }}>
                  Questions,
                  <Text style={{color: '#0a579a', fontSize: 12}}>
                    {' '}
                    MASHA ALLAH!
                  </Text>
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => this.hide()}
                style={{
                  width: '40%',
                  padding: 12,
                  bottom: 180,
                  position: 'absolute',
                  backgroundColor: '#F2E703',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 40,
                  left: 125,
                  justifyContent: 'space-around',
                }}
                activeOpacity={0.5}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Blue,
                    fontFamily: fonts.CARTERONE,
                  }}>
                  DONE
                </Text>
                <FastImage
                  style={{
                    width: 60,
                    height: 60,
                    margin: -25,
                    marginLeft: 0,
                  }}
                  source={Images.asset90}
                />
              </TouchableOpacity>
            </ImageBackground>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              // resizeMode={"contain"}
              style={{
                justifyContent: 'center',
                width: '80%',
                height: '40%',
                alignItems: 'center',
                bottom: 100,
              }}
              source={Images.quizAsset7}
            />
          </View>
        )}
      </Modal>
    );
  }
}

export const modalStyles = StyleSheet.create({
  // This covers the entire screen and gives translucency.
  modalBackdrop: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // The color is 2a2a2a with an alpha of 5f.
    // backgroundColor: "rgba(77,77,77,0.75)"
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backDrop: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    // padding: 5 * vw,
  },
  // This is the view that sits in the center of the screen
  // and houses the form header, content, and footer.
  modalContainer: {
    // Cosmetics
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    // Setting the width of the modal
    width: width * 0.8,
    // Inherits flex direction from
    // modalBackDrop, setting flex to 0.5
    // will set the height to half.
    height: '50%',
    // For the children
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  modalHeader: {
    // There are two children for the modal header
    // one is an icon, and the other is a heading.
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 18,
    backgroundColor: 'rgb(194,23,121)',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 5,
  },
  textInputs: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    fontSize: 14,
    height: height * 0.07,
  },
  modalBody: {
    flex: 70,
    alignContent: 'stretch',
  },
  bodyContainer: {
    alignItems: 'center',
  },
  bodyRow: {
    width: '90%',
  },
  bodyRowLabel: {
    color: '#000',
    fontSize: 11,
  },
  modalFooter: {
    flex: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    // borderBottomRightRadius: 20,
    // borderBottomLeftRadius: 20
  },
  footerButtonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
});
