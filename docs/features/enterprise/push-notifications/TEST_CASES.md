# Test Cases — Push Notifications

## Unit Tests

| Test | Description |
|------|-------------|
| Permission request granted | Mock permission as granted, verify success |
| Permission request denied | Mock permission as denied, verify failure |
| Token retrieval | Mock Expo push token, verify token returned |
| Send local notification | Verify notification scheduled |
| Notification listener | Simulate incoming notification, verify handler |
| Android channel setup | Verify channel created on Android |
| iOS channel setup | Verify no channel created on iOS |

## Integration Tests

| Test | Description |
|------|-------------|
| Full permission flow | Request → Grant → Get token → Success path |
| Deny then retry | Deny → Show error → Retry → Success |
| Notification lifecycle | Receive → Display → Tap → Response handler |

## Manual Test Cases

| Scenario | Steps |
|----------|-------|
| Request permissions | Open screen → Tap "Request Permission" → Grant → Verify token appears |
| Send local notification | Tap "Send Test Notification" → Verify notification appears |
| Receive while foreground | Send push → Verify notification listener fires |
| Receive while background | Send push → Open app → Verify notification response |
| Deny permissions | Deny permission → Verify error state → Tap Retry |
| iOS simulator | Verify token error is handled gracefully |
| Android channel | Verify channel is created (check app info) |
