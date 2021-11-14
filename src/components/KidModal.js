import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '../theme';
const {width, height} = Dimensions.get('window');

export default class KidModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookLaterModal: false,
    };
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType="slide"
        transparent={true}>
        <View style={modalStyles.modalBackdrop}>
          <View
            style={{
              backgroundColor: '#f8f8f8',
              borderRadius: 20,
              // Setting the width of the modal
              width: width * 0.8,

              height: '40%',
              // For the children
              justifyContent: 'flex-start',
              alignItems: 'stretch',
            }}>
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 3,
                backgroundColor: 'rgb(69,206,238)',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  flex: 8,
                  textAlign: 'center',
                  left: 20,
                }}>
                MESSAGE
              </Text>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  left: 30,
                  bottom: 40,
                  backgroundColor: 'red',
                }}
                onPress={() => this.props.onClose()}>
                <Image
                  source={Images.asset15}
                  style={{width: 40, height: 40}}
                />
              </TouchableOpacity>
            </View>
            {/* Content */}
            <View
              style={{
                flex: 10,
                alignContent: 'center',
                paddingHorizontal: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'rgb(69,206,238)',
                  textAlign: 'center',
                }}>
                {props.alertText}
              </Text>
              <View
                style={{
                  borderWidth: 0.11,
                  // borderColor: 'rgba(0,0,0.2)',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  height: 40,
                  width: width * 0.7,
                  backgroundColor: 'rgb(254,206,0)',
                  borderRadius: 20,
                  marginBottom: 2,
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                  // onPress={() => this.props.onClose()}
                  onPress={() => {
                    this.props.firstButtonPress();
                  }}
                  // onPress={() => {Alert.alert('Hello')}}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      textAlign: 'center',
                    }}>
                    {this.props.firstButton}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderWidth: 0.1,
                  // borderColor: 'black',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  height: 40,
                  width: width * 0.7,
                  backgroundColor: 'rgb(69,206,238)',
                  borderRadius: 20,
                  marginBottom: 2,
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                  // onPress={() => this.props.onClose()}
                  onPress={() => {
                    this.props.secondButtonPress();
                  }}
                  // onPress={() => {Alert.alert('Hello')}}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      textAlign: 'center',
                    }}>
                    {this.props.secondButton}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export const modalStyles = StyleSheet.create({
  // This covers the entire screen and gives translucency.
  modalBackdrop: {
    height: height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // The color is 2a2a2a with an alpha of 5f.
    backgroundColor: 'rgba(77,77,77,0.75)',
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
