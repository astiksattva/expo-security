# Expo Limitations

| Limitation | Detail |
|------------|--------|
| No gesture helper | Must compute threshold logic manually |
| No shake pattern recognition | Only magnitude-based; cannot detect specific patterns |
| iOS 14.5+ motion permission | Requires `NSMotionUsageDescription` in Info.plist; Expo includes by default |
| Web | Uses `DeviceMotionEvent` API; requires user gesture to enable |
| Background | Accelerometer continues but event delivery to JS may be delayed |
| No gyroscope fusion | Uses only accelerometer; gyroscope available separately via `Gyroscope` |
| Sampling rate | Controlled by `setUpdateInterval` but actual rate depends on hardware |
