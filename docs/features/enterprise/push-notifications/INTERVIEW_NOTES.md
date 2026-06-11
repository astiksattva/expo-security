# Interview Notes — Push Notifications

## Concepts

- Push notification service architecture
- APNs (Apple Push Notification service)
- FCM (Firebase Cloud Messaging)
- Expo push service (abstraction over APNs/FCM)
- Local vs remote notifications
- Notification channels (Android)
- Notification categories (iOS)
- Badge numbers, sounds, and alerts

## Architecture

```
App → Expo Push API → Expo Push Service → APNs/FCM → Device
```

Expo abstracts both APNs and FCM behind a single API.

## Expo Limitations

- Cannot directly configure APNs/FCM certificates
- Expo push service is a dependency
- No fine-grained control over delivery
- Rich media requires native modules

## Native Alternatives

- React Native Push Notification (notifee)
- Firebase Cloud Messaging SDK
- Native APNs integration
- Azure Notification Hubs

## Interview Questions

1. How does Expo push notifications work?
2. What's the difference between local and remote notifications?
3. How do notification channels work on Android?
4. What are notification categories on iOS?
5. How would you handle notification delivery guarantees?
6. How do you test push notifications during development?
7. What are the security considerations for push notifications?
8. How do you handle deep links from notification taps?

## Best Practices

- Always check and request permissions
- Handle all permission states (granted, denied, undetermined)
- Set up notification handler early in app lifecycle
- Create Android notification channels on app start
- Store push tokens securely (SecureStore)
- Implement exponential backoff for failed delivery
- Support notification grouping and categorization
