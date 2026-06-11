# Security — Screen Recording Detection

## Risk assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Recording not detected due to platform limitation | High | Android has no API; use prevention instead |
| Delayed detection (polling) | Low | Acceptable for most use cases |
| False alarm (mirroring vs recording) | Low | Both indicate content may be exposed |

## Attack vectors

1. **Android screen recording**: Not detectable at the application level.
   Must rely on screenshot prevention (`FLAG_SECURE`).
2. **iOS jailbreak**: `UIScreen.isCaptured` may be hooked to return `false`.
3. **External capture hardware**: Hardware HDMI recorders cannot be detected.

## Response strategies

When recording is detected:
1. Alert the user (optional — may tip off malicious user).
2. Log the event server-side.
3. Enable screenshot prevention if not already active.
4. Obscure or blur sensitive content.
5. Lock the session or require re-authentication for high-sensitivity apps.

## Recommendations

- Use detection for **alerting**, not blocking.
- Pair with **Screenshot Prevention** for actual protection.
- Implement server-side alerting for compliance monitoring.
