# Interview Notes — Screen Recording Detection

## Common questions

### Why is this iOS-only?

Android does not expose a public API for apps to query whether the screen is
being recorded. The `DisplayManager` and `MediaProjection` APIs are for
creating recordings, not detecting them.

### How does UIScreen.isCaptured work?

`UIScreen.isCaptured` is a property on `UIScreen` that returns `true` when the
screen is being recorded, mirrored via AirPlay, or connected to an HDMI
capture device. It is a system-level property that cannot be overridden by
third-party apps.

### Why do you use polling instead of a callback?

iOS provides `UIScreen.capturedDidChangeNotification` as a callback-based API,
but `expo-screen-capture` does not bridge it. Polling is a workaround. A
production app should create a custom native module to bridge the notification.

### How would you implement a native module for this?

```swift
// ScreenCaptureModule.swift
import ExpoModulesCore

public class ScreenCaptureModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ScreenCapture")
    
    Events("onCapturedDidChange")
    
    OnStartObserving {
      NotificationCenter.default.addObserver(
        self,
        selector: #selector(capturedDidChange),
        name: UIScreen.capturedDidChangeNotification,
        object: nil
      )
    }
    
    @objc func capturedDidChange() {
      sendEvent("onCapturedDidChange", ["isCaptured": UIScreen.main.isCaptured])
    }
  }
}
```

### What's the delay between recording start and detection?

With 2-second polling, maximum delay is ~2 seconds. With
`capturedDidChangeNotification`, it's near-instant (~16ms).

### How would you handle this in a banking app?

1. Start polling when the app goes to foreground.
2. On recording detection: blur the screen, log event, notify server.
3. Require re-authentication when recording stops.
4. Combine with screenshot prevention and device integrity checks.
