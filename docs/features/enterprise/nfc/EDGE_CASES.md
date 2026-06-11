# Edge Cases — NFC

## iOS Variations

- NFC tag reading requires iOS 13+
- iOS limits to foreground tag reading only
- No background NFC tag reading
- iPhone 7+ only (iPhone 6s and earlier lack NFC)
- iOS does not support NDEF write via expo-nfc

## Android Variations

- NFC on Android 4.4+ (API 19+)
- Android supports foreground and background tag dispatch
- Different NFC chipset vendors (NXP, Broadcom, etc.)
- Some Android devices have NFC antenna in different locations
- Samsung devices may have additional NFC settings

## Offline Mode

- NFC tag reading works entirely offline
- No network required for tag detection or parsing
- Tag data is available immediately

## Permission Denied

- iOS: User can deny NFC permission in Settings
- Android: NFC is a hardware feature, not permission-based
- iOS: NFC permission prompt shows on first tag read

## Hardware Unsupported

- iPhone 6s and earlier: No NFC tag reading
- Entry-level Android phones: May lack NFC
- All simulators/emulators: No NFC hardware
- Web: No NFC support

## OS Version Limitations

- iOS 13+: Full NFC tag reading
- iOS 11-12: Limited NFC (Apple Pay only)
- Android 4.4+ (API 19+): Basic NDEF reading
- Android 10+ (API 29+): Improved NFC APIs

## Edge Cases

- Rapidly tapping multiple NFC tags
- Holding tag too briefly before removal
- Corrupted or unreadable NFC tags
- Tags with unsupported NDEF formats
- Tags with very large payloads
- Multiple tags in range simultaneously
