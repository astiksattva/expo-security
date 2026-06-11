# Emulator Detection — Expo Limitations

## Expo Go

- **Status:** Supported
- **Reason:** expo-device is included in Expo Go and `Device.isDevice` is fully functional.

## Development Build

- **Status:** Supported
- **Reason:** Full native runtime with expo-device available.

## EAS Build

- **Status:** Supported
- **Reason:** Production builds include expo-device.

## Native Prebuild

- **Required:** No
- **Reason:** expo-device is a managed Expo package that works without prebuild.

## Why This Works in Expo Go

Unlike other Device Security features, emulator detection only uses `expo-device`'s
managed API. It does not require file system access, system settings, or other native
capabilities that are restricted in Expo Go.
