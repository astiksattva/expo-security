# Troubleshooting

## Common Issues

### "Hardware Unavailable"
- Device lacks fingerprint sensor
- **Fix:** Use device credential auth as fallback
- **Test:** Check `expo-local-authentication` `hasHardwareAsync()`

### "Not Enrolled"
- No fingerprints registered in device settings
- **Fix:** Direct user to Settings > Security > Fingerprint
- **Test:** Check `isEnrolledAsync()`

### Auth Dialog Doesn't Appear
- App may lack required permissions
- **Fix:** Ensure biometric permission in manifest
- **Android:** `USE_BIOMETRIC` permission

### Lockout After Failed Attempts
- Biometric auth is temporarily disabled
- **Fix:** Wait 30 seconds or use device passcode fallback
- **Avoid:** Do not retry immediately

## Android-Specific

- **Samsung devices:** Some models have ultrasonic vs optical sensors
- **Screen protector:** May interfere with sensor
- **Wet fingers:** Sensor may not work

## Debugging

```typescript
// Check supported authentication types
const types = await LocalAuthentication.supportedAuthenticationTypesAsync()
console.log('Supported types:', types)
```
