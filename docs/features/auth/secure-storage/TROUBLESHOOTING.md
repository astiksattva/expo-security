# Troubleshooting

## Common Issues

### "Storage Write Failed"
- Value exceeds size limit
- Keychain/keystore unavailable (device locked)
- **Fix:** Check value size (< 2048 bytes), ensure device is unlocked
- **Test:** Write a small value first

### "Storage Read Failed"
- Key not found (may have been deleted)
- Keychain access issue
- **Fix:** Verify key exists with `secureKeyExists()`
- **Test:** Write then immediately read

### Data Not Persisting After App Reinstall
- iOS: Keychain data survives app deletion
- Android: Data deleted with app
- **Fix:** Use iCloud Keychain on iOS for cross-install persistence

### Permission Denied
- Keychain access denied (iOS)
- **Fix:** Check Keychain access groups in entitlements
- **Expo:** Configure in `app.json`

## iOS-Specific

- Keychain items accessible only by same app
- Use Keychain access groups for sharing between apps
- Items may be inaccessible if device is locked
- Simulator keychain resets between runs

## Android-Specific

- EncryptedSharedPreferences requires API 23+
- Backup may expose data if not excluded
- Some OEMs modify Keystore implementation
- File-based encryption may affect performance

## Debugging

```typescript
// Test basic write/read cycle
await SecureStore.setItemAsync('test_key', 'test_value')
const value = await SecureStore.getItemAsync('test_key')
console.log('Read back:', value) // Should be 'test_value'
await SecureStore.deleteItemAsync('test_key')
```
