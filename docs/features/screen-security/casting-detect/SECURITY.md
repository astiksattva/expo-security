# Security — Screen Casting Detection

## Risk assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Casting not detected (Android) | High | Requires native module |
| iOS conflates recording and casting | Medium | Alert on both |
| External display leaks sensitive data | High | Prevention + detection |

## Attack vectors

1. **HDMI capture**: Hardware recorder connected to HDMI output. iOS detects
   this via `isCaptured`. Android requires `DisplayManager`.
2. **AirPlay mirroring**: Streams the screen to Apple TV. Detectable on iOS.
3. **Chromecast tab casting**: Streams a browser tab, not the whole screen.
   Cannot be detected from a React Native app.
4. **Miracast**: Android wireless display. Detectable via `DisplayManager`.

## Response strategy

When casting is detected:
1. Log event with timestamp and platform info.
2. Enable screenshot prevention (if not already active).
3. Alert security team / server endpoint.
4. Consider obscuring sensitive content or locking session.

## Defense in depth

1. Detection for alerting (this feature).
2. Prevention for blocking (screenshot/recording prevention).
3. Device integrity checks.
4. Remote session invalidation.
