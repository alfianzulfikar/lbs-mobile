//
//  JailbreakDetector.swift
//  LBSUrunDana
//
//  Created by LBS Urun Dana on 28/07/25.
//

import Foundation
import UIKit
import React

@objc(JailbreakDetector)
class JailbreakDetector: NSObject {

  @objc static func requiresMainQueueSetup() -> Bool {
      return true
  }

  @objc
  func isJailbroken(_ resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
    if hasJailbreakIndicators() || canOpenSuspiciousURIs() {
      resolver(true)
    } else {
      resolver(false)
    }
  }

  // Check if any indicators of jailbreak are found
  private func hasJailbreakIndicators() -> Bool {
    return hasWritableSystemDirectory() ||
           hasSuspiciousPaths(jailbreakPaths) ||
           hasSuspiciousPaths(appPaths) ||
           hasSuspiciousPaths(fridaPaths)
  }

  // Check if the system directory is writable
  private func hasWritableSystemDirectory() -> Bool {
    let testString = "Jailbreak Test"
    let path = "/private/jailbreak.txt"
    do {
      try testString.write(toFile: path, atomically: true, encoding: .utf8)
      try FileManager.default.removeItem(atPath: path)
      return true
    } catch {
      return false
    }
  }

  // Check if any suspicious paths exist
  private func hasSuspiciousPaths(_ paths: [String]) -> Bool {
    for path in paths {
      if FileManager.default.fileExists(atPath: path) {
        return true
      }
    }
    return false
  }

  // Check if any suspicious URI schemes can be opened
  private func canOpenSuspiciousURIs() -> Bool {
    let uriSchemes = ["cydia://package/com.example.package", "cydia://", "undecimus://", "sileo://", "zebra://", "dopamine://"]
    for scheme in uriSchemes {
      if let url = URL(string: scheme), UIApplication.shared.canOpenURL(url) {
        return true
      }
    }
    return false
  }

  // Constants for commonly found jailbreak and reverse engineering paths
  private let jailbreakPaths = [
    "/bin/bash", "/usr/sbin/sshd", "/etc/apt", "/private/var/lib/apt/",
    "/Library/MobileSubstrate/DynamicLibraries", "/private/var/lib/cydia",
    "/var/cache/apt", "/var/lib/cydia", "/var/log/syslog", "/var/tmp/cydia.log",
    "/Applications/Icy.app", "/Applications/FakeCarrier.app", "/Applications/IntelliScreen.app",
    "/Applications/SBSettings.app", "/Applications/MxTube.app", "/Applications/RockApp.app"
  ]

  private let appPaths = [
    "/Applications/FakeCarrier.app", "/Applications/Icy.app", "/Applications/IntelliScreen.app",
    "/Applications/SBSettings.app", "/Applications/Dopamine.app", "/Applications/Cydia.app",
    "/Applications/Sileo.app", "/Applications/Zebra.app"
  ]

  private let fridaPaths = [
    "/data/local/tmp/frida-server", "/usr/lib/frida/frida-server", "/usr/lib/frida/frida-agent.dylib"
  ]
}
