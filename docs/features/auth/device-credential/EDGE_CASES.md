# Edge Cases

## No Passcode Set
- iOS: No passcode configured in Settings
- Android: No PIN/pattern/password set
- **Handling:** Show EmptyState directing user to set a screen lock

## Authentication Cancelled
- User presses cancel
- **Handling:** Return error with `AUTH_ERRORS.CANCELLED`

## Lockout
- Too many failed passcode attempts
- Device may wipe data (iOS after 10 attempts)
- **Handling:** Return error with `AUTH_ERRORS.LOCKOUT`

## Platform Unsupported
- Web
- **Handling:** Show EmptyState "Not Supported"

## Biometric Fallback Confusion
- System may show biometric option before passcode
- **Handling:** Use `disableDeviceFallback: false` to allow all options

## Android Pattern Lock
- Minimum 3x3 pattern required
- Pattern strength depends on device configuration

## iOS Passcode Change
- If passcode changed externally, next auth may fail
- **Handling:** Re-check availability after failure
