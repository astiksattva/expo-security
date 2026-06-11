# Security Considerations

## Threat Model

| Threat | Severity | Mitigation |
|--------|----------|------------|
| Spoofed fingerprint | Low | Modern sensors use liveness detection |
| Biometric data leakage | None | Data never leaves device |
| Replay attack | Low | Each auth generates unique challenge |
| Lockout bypass | Low | Device passcode fallback |

## Best Practices

1. **Never store raw biometric data** — The SDK only returns success/failure
2. **Use biometric auth as second factor** — Combine with password/device credential
3. **Handle lockout gracefully** — Fall back to device passcode
4. **Check enrollment before auth** — Avoid showing dialog if no fingerprint enrolled

## Platform Security

- **Android:** Fingerprint data stored in TEE (Trusted Execution Environment)
- **Fingerprint template never leaves device**
- Authentication results are signed by the biometric HAL

## Data Storage

- No biometric data is stored by this module
- Authentication results are ephemeral (React state only)
