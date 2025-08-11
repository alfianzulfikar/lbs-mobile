import TrustKit
import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import Firebase

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "LBSUrunDana"
    self.dependencyProvider = RCTAppDependencyProvider()

    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]

    let trustKitConfig = [
      kTSKSwizzleNetworkDelegates: true,
      kTSKPinnedDomains: [
        "uda-api.lbs.id": [
          kTSKIncludeSubdomains: true,
          kTSKEnforcePinning: true,
          kTSKPublicKeyHashes: [
            "mQK88kSM/3W4WdnF0hJPvdfTF6N1+aLQJfD9O6hHh0o=",
            "bdrBhpj38ffhxpubzkINl0rG+UyossdhcBYj+Zx2fcc="
    ],]]] as [String : Any]

    TrustKit.initSharedInstance(withConfiguration:trustKitConfig)

    FirebaseApp.configure()

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }

  // MARK: - Deep Linking (URL Schemes)
  override func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return RCTLinkingManager.application(app, open: url, options: options)
  }

  // MARK: - Deep Linking (Universal Links)
  override func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    return RCTLinkingManager.application(application, continue: userActivity, restorationHandler: restorationHandler)
  }
}
