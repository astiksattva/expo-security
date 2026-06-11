# Security — Screenshot Detection

## Risk assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Attacker takes screenshot and exfiltrates data | High | Prevention (see screenshot-prevent) is stronger |
| False sense of security | Medium | Detection alone cannot block screenshots |
| Listener fails silently | Low | Error state and try/catch in service layer |

## Attack vectors

1. **ADB screencap**: Not detected. Android `adb shell screencap` bypasses
   the media observer. Use screenshot prevention (`FLAG_SECURE`) if this is a
   concern.
2. **iOS Accessibility Shortcuts**: VoiceOver-based screenshot methods may not
   trigger the notification. Rare, but documented.
3. **Jailbroken/Rooted devices**: OS-level hooks can suppress the notification.
   Combine with device integrity checks (root/jailbreak detection) for
   defense in depth.

## Data classification

Screenshot detection events contain:
- `detected` boolean (public)
- `timestamp` number (public — epoch ms)

No PII or secrets are stored or transmitted.

## Recommendations

- Use detection for **logging and alerting** only.
- Pair with **Screenshot Prevention** for actual blocking.
- Log events server-side for audit trails in enterprise apps.
