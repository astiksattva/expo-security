# Device Binding Edge Cases

## Identifier Changes
- Android: AAID resets on factory reset
- iOS: IDFV changes when all apps from vendor uninstalled
- OS updates may change identifiers

## Multi-Device Scenarios
- User logs in on multiple devices
- Device transfer to another user
- Tablet vs phone sessions

## Privacy
- Users can reset advertising identifiers
- iOS App Tracking Transparency may affect IDFV
- Android ID permission changes (API 26+)

## Failure Modes
- Device ID unavailable (permission denied)
- Binding storage corrupted
- Time drift between boundAt and verification

## Platform Differences
- iOS simulator returns nil for IDFV
- Android emulator returns constant AAID
- Web not supported
