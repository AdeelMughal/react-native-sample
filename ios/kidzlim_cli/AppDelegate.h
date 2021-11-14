#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

#define ADelegate    (AppDelegate*)[[UIApplication sharedApplication] delegate]

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

-(void)showToast:(NSString *)message;

@end
