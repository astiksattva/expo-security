# Edge Cases

## Hardware Unavailable
- Device has no TrueDepth camera
- Device is iPhone SE or older model
- **Handling:** Show EmptyState with descriptive message

## No Face ID Enrolled
- User has not set up Face ID in Settings
- Face ID reset after device restore
- **Handling:** Show EmptyState directing user to Settings > Face ID & Passcode

## Authentication Cancelled
- User presses cancel
- Device moved away from face
- **Handling:** Return error with `AUTH_ERRORS.CANCELLED`

## Lockout
- Too many failed attempts (5+)
- Face ID requires passcode
- **Handling:** Return error with `AUTH_ERRORS.LOCKOUT`

## Platform Unsupported
- Android or Web
- **Handling:** Show EmptyState "Not Supported"

## Face ID Not Available on iPad
- Some iPad models lack TrueDepth camera
- **Handling:** Fall back to Touch ID if available

## First Launch After Restart
- Face ID requires passcode on first unlock
- **Handling:** Return appropriate error

## Mask Wearing (iOS 15.4+)
- Face ID with mask requires iPhone 12+ or newer
- Falls back to passcode on older devices
- **Handling:** Passcode fallback recommended
