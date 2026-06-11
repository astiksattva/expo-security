# Troubleshooting

## Common Issues

### "Not Available" Despite Having Passcode
- `expo-local-authentication` may not detect credential on some devices
- **Fix:** Re-check using `hasHardwareAsync()` and `isEnrolledAsync()`
- **Android:** Some OEMs have custom lock screen implementations

### Dialog Shows Biometric Instead of Passcode
- System dialog may show fingerprint/Face ID as primary option
- **Fix:** This is expected behavior — passcode is fallback
- **Control:** Use `disableDeviceFallback` to control behavior

### Lockout After Failed Attempts
- iOS: Escalating delays (1m, 5m, 15m, 1h)
- Android: Device-dependent delays
- **Fix:** Wait before retrying. On iOS, offer "Try Later"

### Passcode Changed Externally
- Device passcode can be changed from settings
- **Fix:** Re-authenticate user after passcode change detection

## Platform-Specific

### iOS
- Settings app > Face ID & Passcode
- Passcode required for Apple Pay, iCloud Keychain
- MDM policies may enforce passcode requirements

### Android
- Settings > Security > Screen lock
- Enterprise devices may have additional PIN policies
- Some devices use biometrics-only (no backup passcode)

## Debugging

```typescript
// Check if device credential is available
const compatible = await LocalAuthentication.hasHardwareAsync()
const enrolled = await LocalAuthentication.isEnrolledAsync()
console.log('Compatible:', compatible, 'Enrolled:', enrolled)
```
