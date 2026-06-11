# Auto Logout Security

## Attack Vectors
- **Session Hijacking**: Inactive session stolen
- **Timer Manipulation**: Device clock tampering
- **Monitor Bypass**: Killing the timer process
- **Infinite Session**: Preventing activity recording

## Mitigation Strategies
- Validate against server-side session timeouts
- Use monotonic clock (performance.now) where possible
- Re-check timeout on every app foreground
- Combine with session management expiry

## Best Practices
- Always log out server-side as well
- Use biometric re-authentication after timeout
- Clear all sensitive data on timeout
- Notify user before timeout
