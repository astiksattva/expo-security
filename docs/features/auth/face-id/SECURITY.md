# Security Considerations

## Threat Model

| Threat | Severity | Mitigation |
|--------|----------|------------|
| Photo spoofing | Low | TrueDepth uses 30,000 IR dots for depth mapping |
| Twin/sibling match | Low | Statistical probability ~1:1,000,000 |
| Biometric data leakage | None | Data stored in Secure Enclave |
| Lockout bypass | Low | Device passcode required after 5 failures |

## Best Practices

1. **Always set `NSFaceIDUsageDescription`** — Required for App Store submission
2. **Don't disable passcode fallback** — Allows recovery after lockout
3. **Check enrollment status** — Avoid dialog if Face ID not set up
4. **Handle mask wearing gracefully** — Offer alternative on older devices

## Platform Security

- **iOS:** Face ID data stored in Secure Enclave
- **TrueDepth camera:** Projects 30,000 infrared dots for 3D mapping
- **Attention awareness:** Requires user to look at device (iOS 15+)
- **Matching is done on-device only**

## Compliance

- **GDPR:** Biometric data not collected by app
- **CCPA:** No biometric data stored or shared
- **HIPAA:** Acceptable for healthcare with proper handling
