# Secure Storage

## Overview

Secure Storage provides encrypted key-value storage using the platform's native keychain (iOS) or keystore (Android) APIs.

## Platform Support

| Platform | Support | Notes |
|----------|---------|-------|
| iOS | ✅ | Uses Keychain Services |
| Android | ✅ | Uses EncryptedSharedPreferences |
| Web | ❌ | No secure storage API |

## Quick Start

```typescript
import { useSecureStorage } from '../hooks/useSecureStorage'

function MyComponent() {
  const { saveItem, readItem, deleteItem, entries } = useSecureStorage()
  await saveItem('api_key', 'secret-value')
}
```

## Dependencies

- `expo-secure-store` (included in project)

## API

### `useSecureStorage()` hook

Returns:
- `entries: SecureStorageEntry[]` — List of stored key-value pairs
- `isLoading: boolean` — Loading state
- `error: string | null` — Error message
- `result: SecureStorageResult | null` — Operation result
- `saveItem(key, value)` — Store encrypted value
- `readItem(key)` — Read decrypted value
- `deleteItem(key)` — Delete stored item
- `clearItems()` — Clear all entries from state (not storage)
- `checkExists(key)` — Check if key exists in storage
