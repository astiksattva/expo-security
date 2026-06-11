# Interview Notes — Screen Casting Detection

## Common questions

### How does iOS detect screen casting?

iOS uses `UIScreen.isCaptured`. This property returns `true` when:
- The screen is being recorded (Control Center)
- The screen is being mirrored (AirPlay)
- An HDMI capture device is connected

There is no way to distinguish these three scenarios at the app level.

### How would you detect casting on Android?

Android requires monitoring `DisplayManager` for non-default displays.

```kotlin
val displayManager = context.getSystemService(DISPLAY_SERVICE) as DisplayManager
displayManager.registerDisplayListener(object : DisplayManager.DisplayListener {
    override fun onDisplayAdded(displayId: Int) {
        if (displayId != Display.DEFAULT_DISPLAY) {
            // Casting detected
        }
    }
    override fun onDisplayRemoved(displayId: Int) {}
    override fun onDisplayChanged(displayId: Int) {}
}, null)
```

This would need to be wrapped in an Expo native module.

### Why isn't this in expo-screen-capture?

Expo focuses on cross-platform APIs. Casting detection is highly
platform-specific and varies by Android manufacturer. It's left to
developers to implement via custom native modules.

### Can you detect Chromecast?

Chromecast typically streams media content (like Netflix), not the entire
screen. If the app uses Google Cast SDK for media streaming, you can detect
the Cast session. Generic screen mirroring via Chromecast (Android's Cast
screen feature) can be detected via DisplayManager on Android.

### What's the practical difference between recording and casting?

| Aspect | Recording | Casting |
|--------|-----------|---------|
| Purpose | Local capture | External display |
| Detection | iOS native | iOS native |
| Prevention | Same API | Same API |
| Risk | Data exfiltration | Visual leak |

Both should trigger the same defensive response: content protection +
alerting.

### How would you extend this to be production-ready?

1. Implement a custom native module for Android (DisplayManager).
2. Route both iOS and Android events through a unified `useCastingDetect` hook.
3. Add event-driven (non-polling) detection via `DisplayListener` and
   `capturedDidChangeNotification`.
4. Add a global listener in the app provider for app-wide awareness.
5. Integrate with session management to auto-lock sessions on casting.
