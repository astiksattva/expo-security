# Session Management Troubleshooting

## Common Issues

### Session always invalid
- Token storage failed (check SecureStore availability)
- Expiry timestamp in past
- Config mismatch (tokenType)

### Session refresh not working
- Refresh token missing or expired
- Refresh function throws error
- Network issue during refresh

### Tokens lost on app restart
- SecureStore data cleared
- App data was wiped
- Keychain access issue on iOS

## Debugging Tips
- Check secure store keys exist
- Log expiry times for debugging
- Verify token format with backend team
- Test on both iOS simulator and Android emulator
