# Expo Limitations

## Expo Go Support

| Capability | Expo Go | Dev Build | EAS Build |
|------------|---------|-----------|-----------|
| Fingerprint Auth | ✅ | ✅ | ✅ |

## Known Limitations

1. **No fallback UI customization** — System dialog appearance cannot be customized
2. **No in-app enrollment** — Cannot programmatically enroll fingerprints
3. **No sensor type detection** — Cannot distinguish ultrasonic vs optical
4. **No multi-fingerprint support** — Cannot select which finger to authenticate
5. **Limited error details** — `expo-local-authentication` returns basic error strings

## Android-Specific

- Requires Android 6.0+ (API 23)
- Some Chinese OEM devices may have non-standard implementations
- `hasHardwareAsync()` may return `false` on devices with broken HAL

## Alternatives

For advanced biometric use cases, consider:
- `react-native-biometrics` (community package)
- `react-native-fingerprint-scanner` (deprecated)

## Workarounds

To check if Face ID vs Touch ID on iOS:
```typescript
const types = await LocalAuthentication.supportedAuthenticationTypesAsync()
const isFaceId = types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)
```
