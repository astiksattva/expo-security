# Implementation Details

## Architecture

1. **Service Layer** (`secureStorageService.ts`)
   - `secureWrite(key, value)` — Encrypt and store value
   - `secureRead(key)` — Read and decrypt value
   - `secureDelete(key)` — Delete stored value
   - `secureKeyExists(key)` — Check if key exists

2. **Hook Layer** (`useSecureStorage.ts`)
   - Manages entries array (key-value pairs in memory)
   - Exposes `saveItem`, `readItem`, `deleteItem` async actions
   - Updates local state to reflect storage changes

3. **Screen Layer** (`SecureStorageScreen.tsx`)
   - Provides UI to write, read, and delete items
   - Shows list of stored items
   - Displays success/error feedback

## Encryption

- **iOS:** Uses Keychain Services (hardware-backed encryption)
- **Android:** Uses EncryptedSharedPreferences or Android Keystore
- **Data encrypted at rest:** AES-256 encryption
- **Key material:** Stored in Secure Enclave (iOS) or TEE (Android)

## State Management

- Hook maintains an in-memory `entries` array
- After save/read, entry is added to local state
- After delete, entry is removed from local state
- State is ephemeral — entries persist in secure storage only

## Demo Mode

- Demo screen simulates secure storage operations
- Items stored in local state only (not persisted)
- Behaves identically to production for UI testing
