import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import {Text, ActivityLoader, Inputs} from '../../../components';
import FastImage from 'react-native-fast-image';
import {
  UserAvatarTickControl,
  ThemedButton,
  ThemedNextButton,
} from '../../../controls';
import HomeTemplate from '../../../containers/HomeTemplate';
import {styles} from './styles';
import {Colors, Images, Metrics} from '../../../theme';
import {getAllNotifications} from '../../../actions/NotificationActions';
import {sendFeedback} from '../../../actions/contentAction';
import {useDispatch, useSelector} from 'react-redux';
import {areEqual} from '../../../util/commonUtils';
import {DataHelper} from '../../../helpers';
import CustomizedPopup from '../../../controls/Modals/CustomizedPopup';

export default Feedback = React.memo((props) => {
  const [feedback, setFeedback] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const dispatch = useDispatch();

  const auth = useSelector((state) => state?.auth);
  const loader = useSelector((state) => state?.general?.isLoading);

  const renderBtn = (btnText, imgPrefix, onPress = undefined) => {
    return (
      <View style={styles.btnContainer}>
        <TouchableOpacity
          disabled={loader}
          onPress={onPress}
          style={styles.btn}
          activeOpacity={0.8}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.prefixBtn}
            source={Images[imgPrefix]}
          />
          <Text size="large" color={Colors.text.light}>
            {btnText}
          </Text>
          <FastImage
            style={styles.forwardBtn}
            resizeMode={FastImage.resizeMode.contain}
            source={Images.forwardBtn}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const onSubmit = async () => {
    if (!feedback) {
      return;
    }

    DataHelper.showLoader();

    let parentData = DataHelper.getParentData();

    if (parentData) {
      let data = {
        email: parentData?.email,
        name: auth?.user?.name,
        content: feedback,
      };
      const res = await dispatch(sendFeedback(data));
      DataHelper.hideLoader();
      console.log(res, 'res');
      if (res === 'success') {
        setFeedback('');
        toggleModal();
      }
    }
  };

  const toggleModal = () => setFeedbackSuccess(!feedbackSuccess);

  const renderLoader = () => (
    <View style={styles.loader}>
      <ActivityLoader isLoading={loader} />
    </View>
  );

  return (
    <HomeTemplate renderUser={true} style={styles.container} back>
      <ImageBackground
        style={{width: '100%', flex: 1}}
        source={Images.asset124}>
        <ScrollView>
          {renderLoader()}
          <View
            style={{
              marginTop: Metrics.doubleModerateBaseMargin * 1.5,
              alignItems: 'center',
            }}>
            {feedbackSuccess && (
              <CustomizedPopup
                onClose={toggleModal}
                doShowModal={feedbackSuccess}
                msg2="Feedback sent successfully"
                buttons={[['OK', true, toggleModal]]}
              />
            )}
            <Text color={Colors.text.Yellow} size="xLarge">
              HOW CAN WE HELP?
            </Text>
            <Inputs
              value={feedback}
              changeText={(val) => setFeedback(val)}
              placeholder="Write your message here"
              multiline
              numberOfLines={12}
              style={styles.feedbackForm}
            />
            {renderBtn('SEND', 'emailPlain', onSubmit)}
            {renderBtn(`READ FAQ's`, 'asset56', () =>
              DataHelper.urlRedirecter('https://kidzlim.co.uk/contact/'),
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </HomeTemplate>
  );
}, areEqual);
