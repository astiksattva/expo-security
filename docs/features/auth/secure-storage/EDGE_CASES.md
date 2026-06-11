# Edge Cases

## Key Not Found
- Reading a key that doesn't exist
- **Handling:** Returns `success: true` with `value: undefined`

## Empty Key or Value
- Empty string key or value
- **Handling:** `expo-secure-store` allows empty strings

## Special Characters
- Keys or values with Unicode, emoji, or control characters
- **Handling:** Stored as-is (UTF-8 encoded)

## Large Values
- `expo-secure-store` has size limits (~2048 bytes on iOS)
- **Handling:** Error returned for oversized values

## Concurrent Access
- Multiple writes to same key simultaneously
- **Handling:** Last write wins (no built-in locking)

## Storage Full
- Keychain/keystore may reach capacity
- **Handling:** Error returned with write failure

## Platform Unsupported
- Web platform
- **Handling:** Return error with `NOT_SUPPORTED_ON_PLATFORM`

## Device Backup
- iOS: Keychain items excluded from iCloud backup by default
- **Handling:** Acceptable for sensitive data

## App Deletion
- Keychain data persists after app deletion (iOS)
- **Handling:** Clear sensitive data on logout
