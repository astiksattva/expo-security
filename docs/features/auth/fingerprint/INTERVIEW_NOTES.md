# Interview Notes

## Key Talking Points

- Fingerprint auth uses `expo-local-authentication` which wraps Android BiometricPrompt
- Data never leaves the device — biometric matching is done in TEE
- Always check `hasHardwareAsync()` and `isEnrolledAsync()` before showing auth dialog
- Handle cancellation and lockout states gracefully
- iOS doesn't have fingerprint-only auth — iPhone uses Touch ID or Face ID

## Common Questions

### Q: How does expo-local-authentication work internally?
A: It wraps Android's `BiometricPrompt` API and iOS's `LocalAuthentication` framework. On Android, it uses the system biometric dialog. On iOS, it uses `LAContext` to evaluate device owner authentication.

### Q: Can you bypass fingerprint auth?
A: On Android, if `disableDeviceFallback` is false, the system may allow device PIN/pattern as fallback. This is a design choice, not a security flaw.

### Q: How do you handle devices without fingerprint?
A: Check `hasHardwareAsync()` first, then `isEnrolledAsync()`. Show appropriate empty states and offer fallback authentication methods.

### Q: What about security of fingerprint data?
A: Fingerprint templates are stored securely in the TEE (Trusted Execution Environment) on Android. The app only receives a boolean success/failure result.

## Architecture Decisions

- **Why separate service + hook?** Clean separation of platform API from React state
- **Why feature + demo screens?** Demo screens allow testing without real hardware
- **Why feature-based folders?** Keeps related code colocated for maintainability
