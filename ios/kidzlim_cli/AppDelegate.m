#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <RNGoogleSignin/RNGoogleSignin.h>

#import "Orientation.h"

#import "MBProgressHUD.h"

@import UIKit;
@import Firebase;

#ifdef FB_SONARKIT_ENABLED
//#import <FlipperKit/FlipperClient.h>
//#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
//#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
//#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
//#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
//#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

//static void InitializeFlipper(UIApplication *application) {
//  FlipperClient *client = [FlipperClient sharedClient];
//  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
//  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
//  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
//  [client addPlugin:[FlipperKitReactPlugin new]];
//  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
//  [client start];
//}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
//  InitializeFlipper(application);
#endif

  [[FBSDKApplicationDelegate sharedInstance] application:application
  didFinishLaunchingWithOptions:launchOptions];
  [FIRApp configure];
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"kidzlim_cli"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
//  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
//    return YES;
//  }
  
  return [[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options] || [RNGoogleSignin application:app openURL:url options:options];

//  if ([RCTLinkingManager application:app openURL:url options:options]) {
//    return YES;
//  }

//  return NO;
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

-(void)showToast:(NSString *)message{
  MBProgressHUD *hud = [MBProgressHUD showHUDAddedTo:self.window.rootViewController.view animated:YES];
  
  hud.mode = MBProgressHUDModeText;
  hud.label.text = message;
  [hud.label adjustsFontSizeToFitWidth];
  hud.label.numberOfLines=0;
  hud.offset = CGPointMake(0.f, MBProgressMaxOffset);
  
  dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, 2 * NSEC_PER_SEC);
  dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
    // Do something...
//    [MBProgressHUD hideHUDForView:self.window.rootViewController.view animated:YES];
    [hud hideAnimated:YES];
  });
}

+(AppDelegate*)getInstance{
  return (AppDelegate*)[[UIApplication sharedApplication] delegate];
}

@end
