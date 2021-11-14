// @flow

import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Image, View, ViewPropTypes} from 'react-native';
import MultipleImagePicker from 'react-native-image-crop-picker';
// import RNGRP from "react-native-get-real-path";
import ImageResizer from 'react-native-image-resizer';
import styles from './styles';
import ButtonView from '../ButtonView';
import async from 'async';
import ActionSheet from 'react-native-actionsheet';
import _ from 'lodash';
import RNFetchBlob from 'rn-fetch-blob';

import utils from '../../util';
import {Metrics} from '../../theme';

const widthLimit = 960;
const heightLimit = 1200;

const resizeImageHandling = (selectedData, callback) => {
  let calculatedHeight;
  let calculatedWidth;

  if (selectedData.width && selectedData.height) {
    if (selectedData.width < widthLimit) {
      calculatedWidth = selectedData.width;
      calculatedHeight = selectedData.height;
    } else {
      calculatedWidth = widthLimit;
      calculatedHeight =
        (selectedData.height / selectedData.width) * widthLimit;
    }
  } else {
    calculatedWidth = widthLimit;
    calculatedHeight = heightLimit;
  }

  ImageResizer.createResizedImage(
    selectedData.path || selectedData.uri,
    calculatedWidth,
    calculatedHeight,
    'JPEG',
    100,
  )
    .then((resizedImage) => {
      callback(resizedImage);
    })
    .catch((err) => {
      consoleLog(err);
      callback(null);
    });
};

// const getFilePath = (path, callback) => {
//   if (utils.isPlatformAndroid()) {
//     RNGRP.getRealPathFromURI(path.uri || path.path)
//       .then(filePath => {
//         callback(filePath);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   } else {
//     callback(path.path || path.uri);
//   }
// };

// const resizeVideoHandling = (selectedData, callback) => {
//   getFilePath(selectedData, filePath => {
//     selectedData.uri = filePath;
//     selectedData.path = filePath;
//     callback(selectedData);
//   });
// };

export default class ImagePicker extends Component {
  static propTypes = {
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
      .isRequired,
    onImagePicked: PropTypes.func.isRequired,
    imageStyle: PropTypes.oneOfType([PropTypes.object, ViewPropTypes.style]),
    containerStyle: PropTypes.oneOfType([
      PropTypes.array,
      ViewPropTypes.style,
      PropTypes.object,
    ]),
    isMultiple: PropTypes.bool,
    isCropping: PropTypes.bool,
    isCameraVideo: PropTypes.bool,
    openCameraIcon: PropTypes.string,
  };

  static defaultProps = {
    imageStyle: styles.image,
    containerStyle: styles.container,
    isMultiple: false,
    isCropping: false,
    isCameraVideo: false,
    openCameraIcon: undefined,
  };

  handlePressActionSheet = (i) => {
    const {isCameraVideo, onImagePicked, onVideoPicked} = this.props;

    if (isCameraVideo) {
      if (i === 0) {
        const a = new ImagePicker({
          mediaType: 'video',
          durationLimit: 10,
          // videoQuality: "low"
        });
        a.showCameraVideoPicker((selected) => {
          onVideoPicked({
            ...selected,
            mime: 'video',
          });
        });
      } else if (i === 1) {
        this.showCameraImagePicker();
      } else if (i === 2) {
        this.showImageGalleryPicker();
      }
      //  else if (i === 3) {
      //   this.showVideoGalleryPicker();
      // }
    } else {
      if (i === 0) {
        this.showCameraImagePicker();
      } else if (i === 1) {
        this.showImageGalleryPicker();
      }
    }
  };

  showCameraImagePicker = (thisCallback) => {
    const {onImagePicked, isCropping, ...rest} = this.props;
    const isVideo = this.props.mediaType && this.props.mediaType === 'video';

    MultipleImagePicker.openCamera({
      width: widthLimit,
      height: heightLimit,
      cropping: isCropping,
      mediaType: 'photo',
      ...rest,
    }).then(
      (selectedMedia) => {
        resizeImageHandling(selectedMedia, (resizedImage) => {
          if (thisCallback) {
            thisCallback(resizedImage);
          } else {
            onImagePicked(resizedImage);
          }
        });
      },
      function (error) {
        if (error && error.code === 'E_PERMISSION_MISSING') {
          utils.showSettingsPopup(
            'Alert',
            'AutoConnect requires access to Camera',
          );
        }
      },
    );
  };

  // showCameraVideoPicker = thisCallback => {
  //   const { onVideoPicked, ...rest } = this.props;

  //   RNImagePicker.launchCamera(
  //     {
  //       width: 720,
  //       height: 480,
  //       mediaType: "video",
  //       durationLimit: 10,
  //       ...rest
  //     },
  //     selectedMedia => {
  //       // Same code as in above section!
  //       if (selectedMedia.didCancel) {
  //         console.log("User cancelled image picker");
  //       } else if (selectedMedia.error) {
  //         if (
  //           selectedMedia.error &&
  //           (selectedMedia.error.code ===
  //             "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR" ||
  //             selectedMedia.error.code === "E_PERMISSION_MISSING")
  //         ) {
  //           utils.showSettingsPopup(
  //             "Alert",
  //             "AutoConnect requires access to Camera"
  //           );
  //         }
  //       } else {
  //         resizeVideoHandling(selectedMedia, correctedFilePath => {
  //           if (thisCallback) {
  //             thisCallback(correctedFilePath);
  //           } else {
  //             onVideoPicked(correctedFilePath);
  //           }
  //         });
  //       }
  //     }
  //   );
  // };

  showImageGalleryPicker = (thisCallback) => {
    const {isMultiple, isCropping, onImagePicked, ...rest} = this.props;

    MultipleImagePicker.openPicker({
      multiple: isMultiple,
      cropping: isCropping,
      maxFiles: 3,
      ...rest,
      mediaType: 'photo',
    }).then(
      (selectedMedia) => {
        if (isMultiple) {
          let editedArray = [];

          async.forEachSeries(
            selectedMedia,
            function (mediaFile, callback) {
              resizeImageHandling(mediaFile, (resizedImage) => {
                if (resizedImage) {
                  editedArray.push(resizedImage);
                }

                callback();
              });
            },
            function (err) {
              if (thisCallback) {
                thisCallback(editedArray);
              } else {
                onImagePicked(editedArray);
              }
            },
          );
        } else {
          resizeImageHandling(selectedMedia, (resizedImage) => {
            if (thisCallback) {
              thisCallback(resizedImage);
            } else {
              onImagePicked(resizedImage);
            }
          });
        }
      },
      function (error) {
        if (error && error.code === 'E_PERMISSION_MISSING') {
          utils.showSettingsPopup(
            'Alert',
            'AutoConnect requires access to Photo Gallery',
          );
        }
      },
    );
  };

  // showVideoGalleryPicker = thisCallback => {
  //   const { onVideoPicked, ...rest } = this.props;

  //   MultipleImagePicker.openPicker({
  //     ...rest,
  //     mediaType: "video"
  //   }).then(
  //     selectedMedia => {
  //       if (selectedMedia.mime.includes("video")) {
  //         resizeVideoHandling(selectedMedia, correctedFilePath => {
  //           if (thisCallback) {
  //             thisCallback(correctedFilePath);
  //           } else {
  //             onVideoPicked(correctedFilePath);
  //           }
  //         });
  //       }
  //     },
  //     function(error) {
  //       if (error && error.code === "E_PERMISSION_MISSING") {
  //         utils.showSettingsPopup(
  //           "Alert",
  //           "AutoConnect requires access to Photo Gallery"
  //         );
  //       }
  //     }
  //   );
  // };

  _showImagePicker = () => {
    this.ActionSheet.show();
  };

  _showImagePickerCameraVid = () => {
    this.ActionSheetCameraVid.show();
  };

  render() {
    const {isCameraVideo, openCameraIcon} = this.props;
    return (
      <View>
        <ButtonView
          style={this.props.containerStyle}
          onPress={() => {
            if (isCameraVideo) {
              this._showImagePickerCameraVid();
            } else {
              this._showImagePicker();
            }
          }}>
          {openCameraIcon && (
            <Image style={this.props.imageStyle} source={openCameraIcon} />
          )}
          {this.props.source && (
            <Image
              style={[
                this.props.imageStyle,
                {
                  position: 'absolute',
                  left: Metrics.ratio(5),
                  right: Metrics.ratio(5),
                  top: Metrics.ratio(5),
                  bottom: Metrics.ratio(5),

                  borderRadius: Metrics.ratio(55),
                  width: this.props.imageStyle.width - Metrics.ratio(12),
                  height: this.props.imageStyle.height - Metrics.ratio(12),
                },
              ]}
              source={this.props.source}
            />
          )}
        </ButtonView>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          // title={"Choose an option"}
          options={['Camera', 'Gallery', 'Cancel']}
          cancelButtonIndex={2}
          // destructiveButtonIndex={1}
          onPress={this.handlePressActionSheet}
        />
        <ActionSheet
          ref={(o) => (this.ActionSheetCameraVid = o)}
          // title={"Choose an option"}
          options={[
            'Record',
            'Capture',
            'Select Images',
            'Select Video',
            'Cancel',
          ]}
          cancelButtonIndex={4}
          // destructiveButtonIndex={1}
          onPress={this.handlePressActionSheet}
        />
      </View>
    );
  }
}
