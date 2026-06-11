# Session Management Edge Cases

## Token Expiry
- Token expires mid-API call → need refresh queue
- Token expires during refresh → force re-login
- Multiple simultaneous refresh attempts → debounce

## Storage Issues
- Secure store unavailable (simulator, permissions)
- Storage full → write fails
- Data corrupted → parse fails

## Race Conditions
- App backgrounded during refresh
- Two tabs refreshing simultaneously
- Network failure during refresh

## Token States
- No tokens stored (first launch)
- Only access token (incomplete state)
- Both tokens but expired
- Refresh token valid, access token expired
- Both tokens valid

## Platform Differences
- iOS Keychain vs Android EncryptedSharedPreferences
- iCloud Keychain sync (iOS)
- Backup/restore scenarios
