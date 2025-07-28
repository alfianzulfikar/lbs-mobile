import Clipboard from '@react-native-clipboard/clipboard';
import {Alert, BackHandler, NativeModules, Platform} from 'react-native';
import {isEmulator} from 'react-native-device-info';
import JailMonkey from 'jail-monkey';
import {useDispatch} from 'react-redux';
import {setShowNetworkError, setShowRootError} from '../slices/globalError';

const useSecurityCheck = () => {
  const dispatch = useDispatch();

  const {
    JailbreakDetector,
    RootCheckModule,
    FileCheckModule,
  } = NativeModules;

  const ROOT_DETECTION_PATH = [
    // Magisk and Zygisk-related paths
    '/data/adb/magisk',
    '/data/adb/zygisk',
    '/system/lib/libzygisk.so',
    '/system/lib64/libzygisk.so',
    '/sbin/.magisk/',
    '/dev/.magisk/',
    '/data/adb/magisk/',
    '/cache/magisk.log',
    '/system/app/Superuser.apk',

    // Common superuser binaries and SU paths
    '/sbin/su',
    '/system/bin/su',
    '/system/xbin/su',
    '/data/local/xbin/su',
    '/data/local/bin/su',
    '/system/sd/xbin/su',
    '/system/bin/failsafe/su',
    '/data/local/su',
    '/su/bin/su',

    // Common busybox binaries, often associated with rooted devices
    '/system/xbin/busybox',
    '/system/bin/busybox',
    '/system/sbin/busybox',
    '/vendor/bin/busybox',
    '/data/local/xbin/busybox',
    '/data/local/bin/busybox',

    // Frida-related paths (often used for reverse engineering)
    '/data/local/tmp/frida-server',
    '/data/local/tmp/re.frida.server',
    '/data/local/tmp/frida',
    '/data/local/tmp/frida-inject',
    '/data/local/tmp/frida-agent-32',
    '/data/local/tmp/frida-agent-64',
    '/system/lib/libfrida-gadget.so',
    '/system/lib64/libfrida-gadget.so',

    // Xposed Framework-related paths (another common rooting tool)
    '/system/framework/XposedBridge.jar',
    '/system/lib/libxposed_art.so',
    '/system/lib64/libxposed_art.so',
    '/system/xbin/daemonsu',
    '/system/xbin/supolicy',
    '/data/data/de.robv.android.xposed.installer',
    '/system/bin/daemonsu',
    '/data/app/de.robv.android.xposed.installer',

    // Substrate-related files (jailbreak library often used for injecting code)
    '/usr/libexec/substrate',
    '/Library/MobileSubstrate/MobileSubstrate.dylib',
    '/usr/lib/substitute-inserter.dylib',
    '/usr/lib/libhooker.dylib',

    // Other known files related to jailbreak/root detection
    '/etc/apt',
    '/bin/bash',
    '/usr/sbin/sshd',
    '/private/var/lib/apt/',
    '/Applications/Cydia.app',
    '/Applications/FakeCarrier.app',
    '/Applications/Icy.app',
    '/Applications/IntelliScreen.app',
    '/Applications/SBSettings.app',
    '/Applications/RockApp.app',
  ];

  const checkForZygiskFiles = async () => {
    try {
      const results = await Promise.all(
        ROOT_DETECTION_PATH.map(path => FileCheckModule.doesFileExist(path)),
      );
      return results.some(result => result === true);
    } catch (error) {
      console.error('Error checking for Zygisk files:', error);
      return false;
    }
  };

  const checkDeviceSecurity = async () => {
    try {
      // Platform-specific root/jailbreak detection
      const isCustomJailBroken =
        Platform.OS === 'ios'
          ? await JailbreakDetector.isJailbroken()
          : await RootCheckModule.isDeviceRooted();

      // Cross-platform JailMonkey checks
      const isDebuggedMode = await JailMonkey.isDebuggedMode();
      const isJailBroken =
        JailMonkey.isOnExternalStorage() || // Check if app is on external storage
        JailMonkey.isJailBroken() || // JailMonkey general jailbreak/root check
        JailMonkey.trustFall() || // Trust fall detection
        isDebuggedMode || // Check if device is in debug mode
        JailMonkey.canMockLocation() || // Check if mock location is allowed
        isCustomJailBroken; // Platform-specific jailbreak/root check

      // Additional Zygisk detection (Android only)
      const zygiskDetected =
        Platform.OS === 'android' ? await checkForZygiskFiles() : false;

      const emulatorCheck = await isEmulator();

      // Final security check combining all methods
      const deviceCompromised = isJailBroken || zygiskDetected || emulatorCheck;
      const message = `Device Compromised: ${deviceCompromised}\nIs JailBroken: ${isJailBroken}\nZygisk Detected: ${zygiskDetected}\nIs Debugged Mode: ${isDebuggedMode}\nCan Mock Location: ${JailMonkey.canMockLocation()}\nTrust Fall: ${JailMonkey.trustFall()}\nIs JailBroken (JailMonkey): ${JailMonkey.isJailBroken()}\nIs On External Storage: ${JailMonkey.isOnExternalStorage()}\nNative Module Jailbreak: ${isCustomJailBroken}\nIs Emulator: ${emulatorCheck}`;
      // alert(message);
      // console.log(message, __DEV__)

      if (!__DEV__ && deviceCompromised) {
        dispatch(setShowRootError({showRootError: true}));
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error('Error in security check:', error);
    }
  };

  return {checkDeviceSecurity, ROOT_DETECTION_PATH};
};

export default useSecurityCheck;
