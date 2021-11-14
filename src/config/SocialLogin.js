// @flow
// Facebook Settings
import utils from '../util';

export const FACEBOOK_APP_ID = '';
export const FACEBOOK_PERMISSIONS = ['email', 'public_profile'];
export const PROFILE_REQUEST_PARAMS = {
  fields: {
    string:
      'id, name, email, first_name, last_name, gender, verified, picture.type(large), birthday, hometown',
  },
};
export function profileRequestConfig(accessToken) {
  return {
    accessToken,
    parameters: PROFILE_REQUEST_PARAMS,
  };
}

export const googleProfileRequestConfig = {
  webClientId:
    '806896532286-ma134atdbg5a6mu68ikqijn3nuj13ffd.apps.googleusercontent.com',
  // '259095235460-ac7s0apj712fofn1cdjsefadihmsu0kc.apps.googleusercontent.com',
  // iOS
  clientID: utils.isPlatformAndroid()
    ? '806896532286-ma134atdbg5a6mu68ikqijn3nuj13ffd.apps.googleusercontent.com'
    : // ? '259095235460-j8hb700mt5lm690fggi3e4fs5up84otg.apps.googleusercontent.com'
      '806896532286-cnks9sbkq3jhoveupibdoek3bhhb5lm8.apps.googleusercontent.com',
  //: '259095235460-f35cmg3pvgpivu1vhk4rm7lso653u0d9.apps.googleusercontent.com',

  //OLD key for google in info.plist
  //com.googleusercontent.apps.693623381956-ic18glqqt52751rv71c47quqfcgobo0d

  //SHA 1 release
  //83:4F:8C:87:2C:52:FF:4D:DA:4F:C6:E7:74:B1:C7:5D:36:31:E9:A1

  //SHA 1 debug
  //5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25

  //IOS
  //259095235460-f35cmg3pvgpivu1vhk4rm7lso653u0d9.apps.googleusercontent.com

  //ANDROID
  //259095235460-j8hb700mt5lm690fggi3e4fs5up84otg.apps.googleusercontent.com

  //WEB
  //Clinet id
  //259095235460-ac7s0apj712fofn1cdjsefadihmsu0kc.apps.googleusercontent.com
  //client secret
  //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

  //OLD CLIENT ID
  //693623381956-0p6jeckf7tp8nvqhoo2vobk5bofp2e0i.apps.googleusercontent.com

  //OLD IDS ANDROID AND IOS
  // ? '693623381956-tqvhn0j4qvud0su8j5g5teu563rm7evb.apps.googleusercontent.com'
  // : '693623381956-ic18glqqt52751rv71c47quqfcgobo0d.apps.googleusercontent.com',

  // iOS, Android
  // https://developers.google.com/identity/protocols/googlescopes
  scopes: ['openid', 'email', 'profile'],
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'],

  // offlineAccess: true,
  // hostedDomain: '',
  // loginHint: '',
  // forceCodeForRefreshToken: true,

  // iOS, Android
  // Whether to request email and basic profile.
  // [Default: true]
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a06bf16b507496b126d25ea909d366ba4
  shouldFetchBasicProfile: true,

  // iOS
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a486c8df263ca799bea18ebe5430dbdf7
  // language: string,

  // iOS
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd
  // loginHint: string,

  // iOS, Android
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#ae214ed831bb93a06d8d9c3692d5b35f9
  // serverClientID: "yourServerClientID",

  // Android
  // Whether to request server auth code. Make sure to provide `serverClientID`.
  // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String, boolean)
  offlineAccess: false,

  // Android
  // Whether to force code for refresh token.
  // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String, boolean)
  forceCodeForRefreshToken: false,

  // iOS
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a211c074872cd542eda53f696c5eef871
  // openIDRealm: string,

  // Android
  // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#setAccountName(java.lang.String)
  // accountName: "yourServerAccountName",

  // iOS, Android
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a6d85d14588e8bf21a4fcf63e869e3be3
  // hostedDomain: "yourHostedDomain"
};

//https://stackoverflow.com/a/65809910
