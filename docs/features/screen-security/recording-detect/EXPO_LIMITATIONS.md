# Expo Limitations — Screen Recording Detection

## Expo Go

❌ **Not supported**. `expo-screen-capture` native module unavailable.

## Dev Build

✅ **Full support on iOS**. Android still unavailable.

## EAS Build

✅ **Full support on iOS**.

## Web

❌ **Not supported**.

## Platform differences

| Aspect | iOS | Android |
|--------|-----|---------|
| API | `UIScreen.isCaptured` / `isCapturedAsync` | No API exists |
| Detection method | Polling (2s) | N/A |
| Detection of mirroring | ✅ (same flag) | ❌ |
| Simulator support | ❌ | N/A |

## iOS limitation

`UIScreen.isCaptured` does not distinguish between:
- Screen recording via Control Center
- AirPlay mirroring
- HDMI out with recording

All three return `isCaptured = true`.

## SDK version

`isCapturedAsync` may be deprecated or removed in future Expo SDK versions.
Monitor `expo-screen-capture` changelog. If removed, a custom native module
will be required.

## Native prebuild

`nativePrebuildRequired: true`.

## Future

- Android may add screen recording detection in future OS versions.
- Apple may provide a more granular API in future iOS versions.
- If `isCapturedAsync` is removed from expo-screen-capture, fork and
  re-implement via `expo-modules-core` directly.
