# Device Binding Implementation

## Architecture

- Android: Uses `Application.getAndroidId()` (AAID)
- iOS: Uses `Application.getIosIdForVendorAsync()` (IDFV)
- Binding info stored in SecureStore as JSON
- Device ID cached in memory for quick access
- Verify on launch or on-demand

## Flow

1. User authenticates → getDeviceId()
2. bindDevice(token) → store { deviceId, boundAt, lastVerified }
3. On session check → verifyBinding() → compare current ID with stored
4. Match → session valid; Mismatch → force re-authentication
5. unbindDevice() → clear stored binding

## Key Decisions

- Encrypted storage for binding information
- Time-based verification tracking
- Configurable require-on-launch behavior
- Memory caching for performance
