import {
  purchaseErrorListener,
  purchaseUpdatedListener,
  type ProductPurchase,
  type PurchaseError,
} from 'react-native-iap';

import * as RNIap from 'react-native-iap';

import {Alert, Platform} from 'react-native';

import {DataHelper} from '../helpers';
import utils from '../util';
import {postIap} from '../actions/InAppPurchaseActions';

const subsPackages = Platform.select({
  ios: [
    {
      displayTitle: 'MONTHLY',
      price: '$9.99 / month',
      packageId: 'com.kidzlim.monthly.renewable',
    },
    {
      displayTitle: 'YEARLY',
      price: '$7 / month',
      saveRate: '20%',
      packageId: 'com.kidzlim.yearly.renewable',
    },
  ],
  android: [
    {
      displayTitle: 'MONTHLY',
      price: '$9.99 / month',
      packageId: 'com.kidzlim.monthly.renewable',
    },
    {
      displayTitle: 'YEARLY',
      price: '$7 / month',
      saveRate: '20%',
      packageId: 'com.kidzlim.yearly.renewable',
    },
  ],
});

const productPackages = Platform.select({
  ios: [
    {
      displayTitle: 'MONTHLY',
      price: '$9.99 / month',
      packageId: 'com.kidzlim.monthly',
    },
    {
      displayTitle: 'YEARLY',
      price: '$7 / month',
      saveRate: '20%',
      packageId: 'com.kidzlim.yearly',
    },
  ],
  android: [
    {
      displayTitle: 'MONTHLY',
      price: '$9.99 / month',
      packageId: 'com.kidzlim.monthly',
    },
    {
      displayTitle: 'YEARLY',
      price: '$7 / month',
      saveRate: '20%',
      packageId: 'com.kidzlim.yearly',
    },
  ],
});

class IAPHelper {
  purchaseUpdateSubscription = null;
  purchaseErrorSubscription = null;

  onMount = async () => {
    try {
      const result = await RNIap.initConnection();

      await this.getItems();

      // const subscriptions = await RNIap.getSubscriptions(itemSkus);
      // consoleLog("subscriptions", subscriptions);

      // const products = await RNIap.getSubscriptions(itemSkus);

      // console.log('subscriptions', products);
    } catch (e) {
      console.log('Error handling in Upsell componentDidMount', e);
    }

    this.purchaseSubscription();
  };

  getItems = async () => {
    try {
      itemSkus = subsPackages.map((thisEl) => {
        return thisEl.packageId;
      });

      const subscriptions = await RNIap.getSubscriptions(itemSkus);

      console.log('productList', subscriptions);
    } catch (err) {
      console.log('getItems || purchase error => ', err);
    }
  };

  onUnMount = () => {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  };

  purchaseSubscription = async () => {
    this.purchaseUpdateSubscription = purchaseUpdatedListener(
      (purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase) => {
        const receipt = purchase.transactionReceipt;

        console.log('======================');
        console.log(receipt, 'recipt');
        console.log('======================');
        // return;
        if (receipt) {
          let receiptObj = {};
          if (typeof receipt == 'string' && utils.isPlatformAndroid()) {
            receiptObj = JSON.parse(receipt);
          } else {
            receiptObj = {
              'receipt-data': receipt,
              password: 'ab48bc922ef0433bbc2e81087257ce24',
              'exclude-old-transactions': true,
            };
          }

          if (Object.keys(receiptObj).length > 0) {
            DataHelper.hideLoader();

            const iapData = {
              profileid: DataHelper.getParentData().id,
            };

            if (utils.isPlatformAndroid()) {
              iapData.receipttype = 'playstore';
              iapData.playstoreobject = receiptObj;
            } else {
              iapData.receipttype = 'appstore';
              iapData.iosobject = receiptObj;
            }

            DataHelper.getStore().dispatch(
              postIap(iapData, () => {
                RNIap.finishTransaction(purchase, false);
              }),
            );
          }
        } else {
          DataHelper.hideLoader();

          console.log('receipt not found');
        }
      },
    );

    this.purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        DataHelper.hideLoader();
        console.warn('purchaseErrorListener', error);
      },
    );
  };

  requestPurchase = async (sku: string) => {
    DataHelper.showLoader();

    try {
      await RNIap.requestPurchase(sku, false);
    } catch (err) {
      console.warn(err.code, err.message);

      DataHelper.hideLoader();
    }
  };

  requestSubscription = async (sku: string) => {
    try {
      await RNIap.requestSubscription(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  getProductsItems = () => {
    return subsPackages;
  };
}

export default new IAPHelper();
