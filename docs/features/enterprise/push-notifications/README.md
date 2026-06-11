# Push Notifications

Send and receive push notifications using `expo-notifications`.

## Features

- Request notification permissions
- Get Expo push token
- Send local notifications
- Listen for incoming notifications
- Handle notification responses
- Android notification channels
- iOS notification categories

## Expo Compatibility

| Environment | Support |
|-------------|---------|
| Expo Go | Yes |
| Development Build | Yes |
| EAS Build | Yes |
| Native Prebuild Required | No |

## Platform Support

| Platform | Support |
|----------|---------|
| iOS | Yes |
| Android | Yes |
| Web | No |

## API

### Services

- `requestNotificationPermission()` — Request notification permissions
- `getPushToken()` — Get Expo push token
- `sendLocalNotification(data)` — Send local notification
- `addNotificationListener(handler)` — Listen for received notifications
- `addNotificationResponseListener(handler)` — Listen for notification taps
- `setupAndroidChannel()` — Set up Android notification channel

### Hooks

- `usePushNotifications()` — Full push notification state management

### Types

- `NotificationPermission`
- `PushToken`
- `NotificationData`
