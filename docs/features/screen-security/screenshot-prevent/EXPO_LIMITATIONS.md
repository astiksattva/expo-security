# Expo Limitations — Screenshot Prevention

## Expo Go

❌ **Not supported**. `expo-screen-capture` native module unavailable.

## Dev Build

✅ **Full support**.

## EAS Build

✅ **Full support**.

## Web

❌ **Not supported**. Web browsers do not expose APIs to prevent screenshots.

## Platform differences

| Aspect | iOS | Android |
|--------|-----|---------|
| Mechanism | Secure UITextField overlay | `FLAG_SECURE` window flag |
| Persists across orientation | ✅ | ✅ |
| Blocks external display | ✅ | ❌ (separate flag needed) |
| Blocks ADB screencap | N/A | ✅ |

## iOS Keychain considerations

On iOS, the secure text field used internally by `expo-screen-capture` may
interact with the keychain access flow. Ensure keychain queries use the
correct accessibility settings.

## Android Window overlay

`FLAG_SECURE` only applies to the app window. System UI (status bar,
navigation bar) is not protected. Screenshots of the full screen via
System UI may still capture your app content on some manufacturer skins.

## Native prebuild

`nativePrebuildRequired: true`.

## Future

Apple may deprecate the secure text field approach in future iOS versions.
Monitor WWDC announcements for alternative screen capture prevention APIs.
