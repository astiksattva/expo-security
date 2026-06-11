# Expo Limitations — Push Notifications

## Expo Go

- Push notifications work in Expo Go
- Limited to development pushes
- Cannot test push notification categories
- iOS simulator cannot receive push tokens

## Development Build

- Full push notification support
- Can test all notification features
- Custom notification sounds supported

## EAS Build

- Full push notification support
- Production-ready push service

## Native Prebuild Required

No — `expo-notifications` works without prebuild

## Known Limitations

- No built-in support for rich media notifications (images, video)
- No direct APNs/FCM configuration (handled by Expo)
- Expo push service has rate limits (30 req/s)
- Notification delivery is best-effort, not guaranteed
- No built-in support for notification grouping on Android
- iOS notification categories require native configuration
