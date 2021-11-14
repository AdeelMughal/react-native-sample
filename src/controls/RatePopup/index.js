import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {CustomizedPopup} from '..';
import {DataHelper} from '../../helpers';

const RatePopup = () => {
  const [type, setType] = useState('');
  const [showModal, toggleModal] = useState(false);

  useEffect(() => {
    let auth = DataHelper.getAuthState();
    if (auth?.rateTimestamp) {
      //if timestamp please check and popup modal
      let cTimeStamp = moment().toISOString();
      if (moment(cTimeStamp).isAfter(auth?.rateTimestamp)) {
        toggleModal(true);
      }
    } else {
      // set timestamp for after 10 minutes
      DataHelper.setUserRateStamp(moment().add(5, 'minutes').toISOString());
    }
  }, []);

  const handleFeedback = (_type) => {
    setType(_type);
    if (_type === 'close') {
      DataHelper.setUserRateStamp(moment().add(1, 'day').toISOString());
      toggleModal(false);
    }
    if (_type === 'sure' && type === 'feedback') {
      DataHelper.setUserRateStamp(moment().add(1, 'day').toISOString()); //temp settings till we have app deployment and in-app rate
      toggleModal(false);
    }

    if (_type === 'sure' && type === 'rate') {
      DataHelper.setUserRateStamp(moment().add(1, 'day').toISOString()); //temp settings till we have app deployment and in-app rate
      toggleModal(false);
    }
  };

  const getMsg = () => {
    switch (type) {
      case 'rate':
        return 'Please Rate us on store';
        break;
      case 'feedback':
        return 'Please provide your feedback';
        break;
      default:
        return 'Are you enjoying kidzlim?';
        break;
    }
  };

  return (
    <CustomizedPopup
      doShowModal={showModal}
      msg2={getMsg()}
      buttons={
        type
          ? [
              ['Sure', true, () => handleFeedback('sure')],
              ['Not Now', false, () => handleFeedback('close')],
            ]
          : [
              ['Yes, I Love It', true, () => handleFeedback('rate')],
              ['Its Ok', false, () => handleFeedback('feedback')],
              ['No', false, () => handleFeedback('feedback')],
            ]
      }
      onClose={() => handleFeedback('close')}
    />
  );
};

export default RatePopup;
