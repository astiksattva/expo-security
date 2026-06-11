# Interview Notes

## Key Talking Points

- Face ID uses Apple's `LocalAuthentication` framework with TrueDepth camera
- Attention awareness requires user to look at device (iOS 15+)
- Always include `NSFaceIDUsageDescription` — required by App Store
- On simulator, Face ID can be simulated for testing
- Differentiate between cancelled, locked out, and unavailable states

## Common Questions

### Q: How does Face ID differ from Android fingerprint?
A: Face ID uses 3D depth mapping (30,000 IR dots) vs 2D image, making it more secure than standard facial recognition. Android fingerprint is capacitive or ultrasonic.

### Q: Can Face ID be used with masks?
A: Yes, on iPhone 12+ running iOS 15.4+. Older devices fall back to passcode. This requires handling in the authentication logic.

### Q: What happens if user denies Face ID permission?
A: iOS shows the dialog once. If denied, `isEnrolledAsync()` may still return true but `authenticateAsync()` will fail. Check both hardware and permission status.

### Q: How do you test Face ID without a real device?
A: Use Xcode simulator with Hardware > Face ID > Enrolled. Toggle between matching and non-matching face.

## Architecture Decisions

- **Why `disableDeviceFallback: true` for Face ID?** Prevents fallback to passcode when specifically requesting biometric auth
- **Why separate service?** Isolates platform API calls for testability
- **Why demo screens?** Allow UI development and testing on devices without Face ID hardware
