//
//  NativeLoader.m
//  app
//
//  Created by DD on 4/23/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "NativeIOSToastModule.h"
#import <React/RCTLog.h>
#import "AppDelegate.h"

@implementation NativeIOSToastModule

RCT_EXPORT_MODULE(RNNativeIOSToast);

//- (NSArray<NSString *> *)supportedEvents
//{
//  return @[@"NativeLoaderModuleEvent"];
//}

RCT_EXPORT_METHOD(showToast:(NSString*)msg)
{
   dispatch_sync(dispatch_get_main_queue(), ^{
  [ADelegate showToast:msg];});
}

@end
