# Mock Location Detection — Expo Limitations

## Expo Go

- **Status:** Not Supported
- **Reason:** SettingsManager and ContentResolver are native modules unavailable in
Expo Go. expo-location's `getProviderStatusAsync()` may work but the mock location
provider detection is unreliable in Expo Go's sandbox.

## Development Build

- **Status:** Supported
- **Reason:** Development builds have full native module access. SettingsManager and
ContentResolver are available.

## EAS Build

- **Status:** Supported
- **Reason:** Production builds have full native capabilities.

## Native Prebuild

- **Required:** Yes
- **Reason:** expo-location requires native module configuration. SettingsManager is
a React Native core native module that requires native build.

## Alternative Approaches

For Expo Go:
1. Cannot reliably detect mock location
2. Use server-side location verification as fallback
3. Consider this a limitation of the Expo Go managed workflow
