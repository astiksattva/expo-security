# Interview Notes

## Key Talking Points

- Secure storage uses platform-native encryption (Keychain on iOS, EncryptedSharedPreferences on Android)
- AES-256 encryption with keys in Secure Enclave / TEE
- Data persists after app closure but can survive app deletion on iOS
- Always handle storage errors gracefully — storage can fail for many reasons
- Size limits apply (~2048 bytes on iOS)

## Common Questions

### Q: How does expo-secure-store encrypt data?
A: On iOS, it uses Keychain Services with AES-256-GCM encryption. On Android, it can use EncryptedSharedPreferences backed by Android Keystore (AES-256). The encryption key is stored in hardware-backed secure storage (Secure Enclave on iOS, TEE on Android).

### Q: When should you use secure storage vs AsyncStorage?
A: Secure storage for sensitive data (tokens, secrets, PII). AsyncStorage for non-sensitive data (preferences, cache). Never store auth tokens in AsyncStorage.

### Q: What happens to data when the app is deleted?
A: On iOS, Keychain data survives app deletion. On Android, data is deleted with the app. This has implications for logout flows — always clear sensitive data on logout.

### Q: Can you store objects in secure storage?
A: Only strings. Serialize objects with `JSON.stringify()`. Deserialize with `JSON.parse()`. Handle parsing errors gracefully.

### Q: How do you handle storage limits?
A: Catch write errors and check value size. For larger data, consider encrypting with `expo-crypto` and storing in AsyncStorage (with key managed in secure store).

## Architecture Decisions

- **Why wrap expo-secure-store in a service?** Allows centralized error handling, type safety, and easy mocking for tests
- **Why keep in-memory state alongside storage?** Reduces reads — UI re-renders from local state, not storage
- **Why separate secure storage from auth?** It's a general-purpose utility used by many features, not just auth
