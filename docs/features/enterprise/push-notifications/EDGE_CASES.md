# Edge Cases — Push Notifications

## iOS Variations

- Simulator cannot receive push tokens — returns error
- iOS 12+: Provisional permission available
- iOS requires APNs entitlement
- Notification delivery not guaranteed on cellular data

## Android Variations

- Notification channels required for Android 8+ (API 26+)
- Different OEMs have different notification behavior
- Battery optimization may delay notifications
- Doze mode and App Standby affect delivery

## Offline Mode

- Local notifications work offline
- Push token delivery requires network
- Queued notifications delivered when online

## Permission Denied

- User can deny permission initially or revoke later
- App should handle gracefully with retry option
- Users can re-enable in system Settings

## Hardware Unsupported

- Not applicable — all iOS/Android devices support notifications
- Web does not support push notifications

## OS Version Limitations

- iOS 10+ required for user notifications framework
- Android 4.4+ (API 19+) for local notifications
- Android 8+ (API 26+) for notification channels

## Rate Limits

- Expo push service has rate limits (30 req/s per project)
- Consider batching or throttling in production
