# Root Detection — Expo Limitations

## Expo Go

- **Status:** Not Supported
- **Reason:** Expo Go's sandbox restricts file system access outside managed paths. The root detection service relies on checking arbitrary file paths (`/system/xbin/su`, `/sbin/su`, etc.) which are blocked in Expo Go.

## Development Build

- **Status:** Supported
- **Reason:** Development builds use the full native runtime. The Expo FileSystem API can access the device's root partitions when running natively.

## EAS Build

- **Status:** Supported
- **Reason:** Same as development build — full native capabilities.

## Native Prebuild

- **Required:** Yes
- **Reason:** The feature needs `expo-file-system` configured for the native project. `expo prebuild` generates the necessary native code.

## Alternative Approaches

For Expo Go, consider:
1. Using `expo-device` build properties as weak indicators
2. Server-side device fingerprinting
3. Detecting known root app package names (requires native module)
