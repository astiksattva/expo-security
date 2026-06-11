# Edge Cases — Screenshot Detection

## Multiple rapid screenshots

The listener fires for each screenshot. The hook overwrites the previous
timestamp with the latest. Consider a queue if all events need to be tracked.

## Listener already active

Calling `startListening()` while a listener exists unsubscribes the old and
creates a new one. No duplicated listeners.

## Device restarts

The listener does not persist across app restarts. The user must re-invoke
`startListening()` after cold start.

## App backgrounded

The listener continues to work while the app is in the background on both
iOS and Android. Screenshots taken while the app is backgrounded may or may
not trigger the callback depending on OS behavior.

## Screenshot via hardware buttons

Both iOS (Power + Volume Up) and Android (Power + Volume Down) button
combinations are detected by the OS-level notification that
`addScreenshotListener` observes.

## Screen capture via ADB

Android `adb shell screencap` does NOT trigger the screenshot listener because
it bypasses the media content observer. The service cannot detect ADB captures.

## iOS simulator

Simulator screenshots (File → Save Screen) do NOT trigger
`userDidTakeScreenshotNotification`. Testing requires a physical device.

## Android emulator

Emulator screenshots taken via the toolbar do trigger the content observer
in most cases.

## Multiple listeners

Only one subscription should exist at a time. The service does not expose a
multi-listener registration pattern.
