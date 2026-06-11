# Security Considerations

## Threat Model

| Threat | Severity | Mitigation |
|--------|----------|------------|
| Brute force passcode | Medium | iOS enforces escalating delays, data wipe after 10 attempts |
| Shoulder surfing | Medium | Use biometrics as primary, fall back to passcode |
| Passcode reuse | Low | Out of app control |
| SIM swap bypass | Low | Use biometric + device binding |

## Best Practices

1. **Use as fallback, not primary** — Prefer biometric authentication
2. **Check availability** — Verify passcode is set before showing option
3. **Handle lockout gracefully** — Increasing delays on failure
4. **Combine with other factors** — 2FA for sensitive operations

## Platform Security

### iOS
- Passcode stored in Secure Enclave
- iOS escalates delay after failed attempts: 1m, 5m, 15m, 1h
- After 10 failed attempts, data wipe (configurable)

### Android
- PIN, pattern, or password stored in Gatekeeper
- Escalating delays on Android 9+
- Pattern lock has minimum 3x3 grid

## Compliance

- **PCI DSS:** Device credential alone not sufficient for payment auth
- **SOX:** Acceptable as authentication factor
- **GDPR:** Passcode itself not personal data, but access to data must be protected
