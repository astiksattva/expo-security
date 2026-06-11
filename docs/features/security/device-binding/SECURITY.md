# Device Binding Security

## Attack Vectors
- **Device Spoofing**: Fake device ID reported
- **Binding Extraction**: Rooted device reads stored binding
- **ID Reset Attack**: Reset identifier to bypass binding
- **Session Migration**: Steal binding and session tokens

## Mitigation Strategies
- Combine device binding with server-side validation
- Use hardware-bound identifiers (Android SafetyNet)
- Encrypt binding data with device key
- Rate-limit binding attempts

## Limitations
- Device IDs are not cryptographic proofs
- Can be bypassed on jailbroken/rooted devices
- No cross-platform reliable unique ID
