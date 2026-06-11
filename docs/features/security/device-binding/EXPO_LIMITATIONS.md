# Device Binding Expo Limitations

## Expo Go
- Not supported for real device IDs
- expo-application requires dev build
- Demo mode uses in-memory simulated ID

## Expo Dev Builds
- Full support for expo-application
- getAndroidId and getIosIdForVendorAsync available

## EAS Build
- Full support
- Can integrate platform-specific device fingerprinting

## Limitations
- No truly persistent cross-platform unique identifier
- IDFV changes on app reinstall (iOS)
- AAID can be reset (Android)
- Web support not possible (no device concept)
