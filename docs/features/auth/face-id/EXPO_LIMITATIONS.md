# Expo Limitations

## Expo Go Support

| Capability | Expo Go | Dev Build | EAS Build |
|------------|---------|-----------|-----------|
| Face ID Auth | ✅ | ✅ | ✅ |

## Known Limitations

1. **No attention awareness toggle** — Cannot disable `requireAttention` for Face ID
2. **No custom fallback title** — Localized cancel label only
3. **No in-app enrollment** — Cannot enroll Face ID programmatically
4. **Limited error differentiation** — Error strings are generic
5. **No biometry type check** — Must use `supportedAuthenticationTypesAsync()` to detect Face ID vs Touch ID

## iOS-Specific

- Requires iOS 11.0+
- `NSFaceIDUsageDescription` must be configured in `app.json`
- Face ID not available on iOS simulator by default (must be enabled)

## Configuration

```json
// app.json
{
  "ios": {
    "infoPlist": {
      "NSFaceIDUsageDescription": "Used to authenticate you securely"
    }
  }
}
```

## Alternatives

- `react-native-biometrics` for more granular Face ID control
- Native iOS code for advanced Face ID features (e.g., customized evaluation policy)
