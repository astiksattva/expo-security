# Security Considerations

## Threat Model

| Threat | Severity | Mitigation |
|--------|----------|------------|
| Data at rest theft | Low | AES-256 encryption via Keychain/Keystore |
| Memory dump | Medium | Data decrypted only when accessed |
| Backup exposure | Low | iOS: excluded from iCloud by default |
| Jailbroken/rooted device | High | Extra protection needed |

## Best Practices

1. **Never store raw secrets in source code** — Use environment variables
2. **Clear storage on logout** — Remove all sensitive data
3. **Use descriptive key names** — Avoid revealing data purpose
4. **Handle storage errors gracefully** — Show user-friendly errors
5. **Don't store large blobs** — Secure store is for secrets only

## Encryption Details

### iOS Keychain
- AES-256-GCM encryption
- Key material in Secure Enclave
- Accessible only by same app (Keychain access groups)
- Survives app deletion (delete on logout)

### Android Keystore
- AES-256 or RSA encryption
- Key material in TEE (Trusted Execution Environment)
- Bound to device and app signature
- Data encrypted with master key + per-item key

## Compliance

- **GDPR:** Encrypted storage satisfies data protection requirements
- **HIPAA:** Acceptable for PHI storage with proper access controls
- **PCI DSS:** Can store encrypted card data (tokenization recommended)
- **SOX:** Meets internal control requirements
