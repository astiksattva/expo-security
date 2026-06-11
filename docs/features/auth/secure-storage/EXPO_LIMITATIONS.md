# Expo Limitations

## Expo Go Support

| Capability | Expo Go | Dev Build | EAS Build |
|------------|---------|-----------|-----------|
| Secure Storage | ✅ | ✅ | ✅ |

## Known Limitations

1. **Value size limit** — ~2048 bytes on iOS
2. **No async fallback** — Synchronous alternatives not available
3. **No iCloud Keychain sync** — Data is local-only
4. **No authentication prompt** — Can't require biometrics for each read
5. **No keychain access groups** — Sharing between apps limited
6. **No encryption algorithm choice** — Platform default only

## iOS-Specific

- Keychain is not automatically accessible when device is locked
- `kSecAttrAccessible` options not configurable via Expo
- Items persist after app deletion (may be unwanted)
- No Touch ID/Face ID protection per item

## Android-Specific

- Uses EncryptedSharedPreferences (not Android Keystore directly)
- Backup may expose data — exclude from Auto Backup
- `getItemAsync` returns null, not undefined, on missing keys
- Requires API 23+ for Keystore support

## Configuration

```json
// app.json
{
  "ios": {
    "entitlements": {
      "keychain-access-groups": ["$(AppIdentifierPrefix)$(CFBundleIdentifier)"]
    }
  },
  "android": {
    "blockedPermissions": ["READ_EXTERNAL_STORAGE"]
  }
}
```

## Alternatives

- `react-native-keychain` — More configuration options
- `react-native-encrypted-storage` — Similar to expo-secure-store
- Custom native module for full control over Keychain/Keystore
- `expo-crypto` for application-layer encryption with AsyncStorage
