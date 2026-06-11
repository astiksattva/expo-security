# Interview Notes — Screenshot Detection

## Common questions

### How does Android screenshot detection work?

Android uses a `ContentObserver` that listens for changes to the media store
content URI. When a new image is captured (including screenshots), the
observer fires. This is the same mechanism used by the system's screenshot
notification.

### Why can't we detect ADB screenshots?

`adb shell screencap` writes directly to the file system without going through
the media content provider, so `ContentObserver` never fires. To block ADB
captures, you must use `FLAG_SECURE` on the window (screenshot prevention).

### What happens on iOS?

iOS posts a `UIApplication.userDidTakeScreenshotNotification` notification
when the user presses Power + Volume Up. `expo-screen-capture` bridges this
notification to JavaScript via the native module.

### Is this secure enough for banking apps?

**No**. Detection alone is not security — it's logging. Banking apps must use
**prevention** (`FLAG_SECURE` on Android, secure text field overlay on iOS)
combined with detection for audit trails.

### How would you test this without a physical device?

- iOS Simulator: cannot test — notification never fires.
- Android Emulator: can test — notification fires for emulator screenshots.
- CI/CD: automated testing requires physical device farms (Firebase Test Lab,
  BrowserStack, etc.).

### How would you extend this to a multi-listener pattern?

Currently the service returns a single `Subscription`. For multiple consumers,
implement a pub/sub pattern: maintain an internal list of callbacks, expose
`addListener(cb) → unsubscribe()`, and subscribe to `expo-screen-capture`
once internally.

### What are the performance implications?

Negligible. `addScreenshotListener` is callback-based — no polling, no
background threads. The hook only runs while mounted.
