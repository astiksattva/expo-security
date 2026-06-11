# Developer Mode Detection — Expo Limitations

## Expo Go

- **Status:** Not Supported
- **Reason:** SettingsManager is a native module not available in Expo Go's runtime.
The detection relies on reading system settings that are sandboxed in Expo Go.

## Development Build

- **Status:** Supported
- **Reason:** Development builds include native modules (SettingsManager,
expo-intent-launcher) needed for detection.

## EAS Build

- **Status:** Supported
- **Reason:** Production builds have full native module access.

## Native Prebuild

- **Required:** Yes
- **Reason:** expo-intent-launcher and native modules require prebuild.

## Alternative Approaches

For Expo Go:
1. Use expo-device for limited device info
2. Server-side detection via device fingerprinting
3. Combine with emulator detection as weak proxy
