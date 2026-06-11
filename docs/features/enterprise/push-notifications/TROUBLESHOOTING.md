# Troubleshooting — Push Notifications

## Common Issues

### Push token not received on iOS simulator
**Cause**: iOS simulator cannot register for push notifications
**Solution**: Test on a physical device or use a development build

### Permission dialog doesn't appear
**Cause**: Permission already determined (iOS remembers choice)
**Solution**: Reset permissions in Settings (iOS) or App Info (Android)

### Notifications not showing as alerts
**Cause**: Notification handler not set or configured incorrectly
**Solution**: Ensure `setNotificationHandler` is called before notification setup

### Android notification not showing
**Cause**: Notification channel not created
**Solution**: Call `setupAndroidChannel()` before sending notifications

### Expo push service returns 400
**Cause**: Invalid push token or malformed payload
**Solution**: Verify token format and payload structure

## Debug Methods

- Use `Notifications.getPermissionsAsync()` to check current permission status
- Monitor console logs for `[push-notifications]` tag
- Check Expo push service status at https://expo.dev/push-status
