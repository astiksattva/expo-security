# Troubleshooting — Screenshot Detection

## Listener won't start

**Cause**: `expo-screen-capture` native module not linked.
**Fix**: Ensure you are using a Dev Build (`npx expo run:ios` / `npx expo run:android`).
Expo Go does not support this module.

## Screenshot not detected

**Cause**: Emulator or simulator — `userDidTakeScreenshotNotification` does not
fire on iOS Simulator.
**Fix**: Test on a physical device.

**Cause**: ADB screenshot on Android (`adb shell screencap`).
**Fix**: This is not detectable by design. Use screenshot prevention instead.

## Error: "Failed to subscribe to screenshot events"

**Cause**: Native module not available or permission issue.
**Fix**:
1. Run `npx expo install expo-screen-capture` to ensure it's installed.
2. Rebuild: `npx expo run:ios` or `npx expo run:android`.
3. Verify no conflicting native modules.

## Duplicate events

**Cause**: Multiple subscriptions created inadvertently.
**Fix**: The hook automatically cleans up previous subscriptions before
creating new ones. Check you're not calling `startListening` multiple times
from `useEffect`.

## Timestamp incorrect

**Cause**: Device clock is wrong or timezone is misconfigured.
**Fix**: `Date.now()` uses system clock. Ensure NTP sync is enabled on device.
