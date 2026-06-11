# Expo Limitations — Screenshot Detection

## Expo Go

❌ **Not supported**. `expo-screen-capture` requires native modules that are
not included in the Expo Go sandbox.

## Dev Build

✅ **Full support**. Run `npx expo run:ios` or `npx expo run:android` to
create a Dev Build.

## EAS Build

✅ **Full support**. The `expo-screen-capture` plugin is included by default.

## Web

❌ **Not supported**. The concept of "screenshot" does not translate to web
browsers. No equivalent API exists.

## Platform differences

| Aspect | iOS | Android |
|--------|-----|---------|
| Detection mechanism | `UIApplication.userDidTakeScreenshotNotification` | `ContentObserver` on media store |
| Simulator/Emulator | ❌ Does not fire | ✅ Fires |
| ADB screencap | N/A | ❌ Not detectable |
| Background detection | ✅ | ✅ |

## Native prebuild

`nativePrebuildRequired: true`. A native prebuild (`npx expo prebuild`) is
needed before running on device.

## Future

As of Expo SDK 56, there is no web polyfill. If web support is desired,
consider using a custom native module or a third-party library that provides
browser-level screenshot detection (none exist reliably).
