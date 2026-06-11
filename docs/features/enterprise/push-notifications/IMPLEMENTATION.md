# Implementation — Push Notifications

## Architecture

```
Screen → usePushNotifications() hook → Service layer → expo-notifications
```

The hook manages all state (permission, token, notifications) and exposes callbacks.

## Setup

```bash
npx expo install expo-notifications
```

### iOS

Add the following to `ios/{project}/Info.plist`:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>remote-notification</string>
</array>
```

### Android

Notification channel is created programmatically in `setupAndroidChannel()`.

## Key Implementation Details

1. **Permission Flow**: Check existing → request if needed → return status
2. **Token Retrieval**: Called automatically after permission granted
3. **Notification Handler**: Set globally to control alert/sound/badge behavior
4. **Listeners**: Attached on mount, removed on unmount
5. **Android Channels**: Required for Android 8+; set up once at app start

## Error Handling

- Permission denied: Show retry button
- Token failure: Log error, display error state
- Send failure: Show error message

## Testing

- Unit tests for permission logic
- Integration tests for notification sending
- Manual testing with `expo send` or physical device
