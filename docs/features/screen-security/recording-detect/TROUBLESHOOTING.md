# Troubleshooting — Screen Recording Detection

## Recording not detected on iOS

**Cause**: Running on simulator.
**Fix**: Test on physical iOS device.

**Cause**: `isCapturedAsync` not exported by `expo-screen-capture`.
**Fix**: Check the version of `expo-screen-capture`. Newer SDKs may have
deprecated this method. Consider using `UIScreen.capturedDidChangeNotification`
via a custom native module.

**Cause**: Polling not started.
**Fix**: Call `startPolling()` after component mounts.

## False detection on iOS

**Cause**: `UIScreen.isCaptured` returns `true` for both recording and casting.
**Fix**: Cannot distinguish. Accept that both scenarios require attention.

## Android shows "unavailable"

This is expected. Android does not expose screen recording state to
third-party apps. Document this and recommend screenshot prevention instead.

## App crashes on checkRecordingStatus

**Cause**: Native module not linked properly.
**Fix**:
1. Run `npx expo install expo-screen-capture`.
2. Clean rebuild: `npx expo run:ios --clean`.

## Polling uses too much battery

**Cause**: Interval too short.
**Fix**: Increase `POLL_INTERVAL` from 2000ms to 5000ms or more. Or only
enable polling when the screen is focused.
