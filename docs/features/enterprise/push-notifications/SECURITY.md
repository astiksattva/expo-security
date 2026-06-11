# Security — Push Notifications

## Risks

- Push tokens can be used to send spam/abuse
- Notification payload may contain sensitive data
- Token interception via network sniffing

## Attack Vectors

- Token theft: Malicious code reading stored token
- Payload injection: Malformed notification payload
- Denial of service: Sending excessive notifications

## Platform Limitations

- iOS: Notification content is visible on lock screen by default
- Android: Notification priority can be set by sender
- Both platforms allow users to control notification settings

## Mitigation Strategy

- Store push tokens in SecureStore
- Require authentication for token-sensitive operations
- Validate notification payload before displaying
- Implement rate limiting on notification sending
- Use Expo's push service for production (secure by default)
- Never include sensitive data in notification payload
- Support notification categories for user control
