# Session Management Expo Limitations

## Expo Go
- Full support - expo-secure-store works in Expo Go
- Keychain/Keystore access available
- Both iOS and Android supported

## Expo Dev Builds
- Full support with all secure store features
- Can add custom native token handling

## EAS Build
- Full support
- Can integrate platform-specific token storage

## Limitations
- No automatic token refresh interceptor (must be manual)
- No built-in network request queue for refresh
- SecureStore has size limits (varies by platform)
