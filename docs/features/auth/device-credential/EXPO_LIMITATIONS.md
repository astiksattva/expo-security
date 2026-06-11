# Expo Limitations

## Expo Go Support

| Capability | Expo Go | Dev Build | EAS Build |
|------------|---------|-----------|-----------|
| Device Credential Auth | ✅ | ✅ | ✅ |

## Known Limitations

1. **No passcode policy enforcement** — Cannot require minimum passcode length
2. **No passcode change detection** — No callback when passcode changes
3. **No biometric/passcode preference** — System decides which to show first
4. **Limited control over dialog** — Cannot customize title or message
5. **No pattern lock customization** — Android pattern settings not configurable

## iOS-Specific

- Requires iOS 9.0+
- Cannot distinguish between passcode types (4-digit vs alphanumeric)
- Cannot check passcode complexity
- No Face ID + passcode combined flow

## Android-Specific

- Works on Android 6.0+ (API 23)
- Cannot detect if pattern is 3x3, 4x4, or 5x5
- OEM customizations may affect behavior
- Some Chinese devices may block `expo-local-authentication` altogether

## Configuration

```json
// app.json
{
  "ios": {
    "infoPlist": {
      "NSFaceIDUsageDescription": "Used to authenticate you"
    }
  },
  "android": {
    "permissions": ["USE_BIOMETRIC"]
  }
}
```

## Alternatives

- `react-native-keychain` for passcode-protected keychain access
- Native modules for advanced passcode policy enforcement
