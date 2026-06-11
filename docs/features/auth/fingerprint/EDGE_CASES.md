# Edge Cases

## Hardware Unavailable
- Device has no fingerprint sensor
- Sensor is broken or malfunctioning
- **Handling:** Show EmptyState with descriptive message

## No Fingerprints Enrolled
- User has not added fingerprints in Settings
- All fingerprints removed
- **Handling:** Show EmptyState directing user to enroll

## Authentication Cancelled
- User presses cancel in biometric dialog
- **Handling:** Return error with `AUTH_ERRORS.CANCELLED`

## Lockout
- Too many failed attempts
- Biometric auth temporarily disabled
- **Handling:** Return error with `AUTH_ERRORS.LOCKOUT`

## Platform Unsupported
- iOS or Web — fingerprint not available
- **Handling:** Show EmptyState "Not Supported"

## Permission Denied
- Biometric permission revoked
- **Handling:** Fall back to error state with retry

## Device Rotated During Auth
- System dialog may be dismissed
- **Handling:** Return cancelled error

## App Backgrounded During Auth
- Dialog automatically dismissed
- **Handling:** Return cancelled error
