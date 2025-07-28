//
//  JailbreakDetector.m
//  LBSUrunDana
//
//  Created by LBS Urun Dana on 28/07/25.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(JailbreakDetector, NSObject)
RCT_EXTERN_METHOD(isJailbroken:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
@end
